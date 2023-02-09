import { call, takeEvery, put, all, fork } from 'redux-saga/effects';
import {
    updateForecastDay,
    updateForecastWeekArray,
    setIsLoading,
    setError,
} from './weatherSlice';
import { weatherActions } from './weatherActions';
import Config from 'react-native-config';

const API = 'https://api.openweathermap.org/data/2.5';
const city = 'Kyiv';

export function* weatherUpdateDaySaga() {
    try {
        yield put(setIsLoading());
        const api = `${API}/weather?q=${city}&units=metric&appid=${Config.API_KEY}`;
        // @ts-ignore
        let result = yield call(() => fetch(api, {}).then(res => res.json()));

        yield put(updateForecastDay(result));
    } catch (error) {
        yield put(setError(error));
        console.error(error);
    }
}

export function* weathersUpdateWeekWatcherSaga() {
    yield takeEvery(weatherActions.GET_FORECAST_WEEK, weatherUpdateDaySaga);
}

export function* weatherUpdateWeekSaga() {
    try {
        yield put(setIsLoading());
        const api = `${API}/forecast?q=${city}&units=metric&appid=${Config.API_KEY}`;
        // @ts-ignore
        let result = yield call(() => fetch(api, {}).then(res => res.json()));

        yield put(updateForecastWeekArray(result));
    } catch (error) {
        yield put(setError(error));
        console.error(error);
    }
}

export function* weatherUpdateWeekWatcherSaga() {
    yield takeEvery(weatherActions.GET_FORECAST_WEEK, weatherUpdateWeekSaga);
}

function* weatherWatchAll() {
    yield all([
        fork(weathersUpdateWeekWatcherSaga),
        fork(weatherUpdateWeekWatcherSaga),
    ]);
}

export default weatherWatchAll;
