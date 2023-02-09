import { all, fork } from 'redux-saga/effects';
import weatherWatchAll from './weather/weatherSagas';

function* rootSaga() {
    yield all([fork(weatherWatchAll)]);
}

export default rootSaga;
