import { ForecastWeek, ForecastNow } from './../../types/index';
import { createSlice } from '@reduxjs/toolkit';

interface WeatherState {
    forecastNow: ForecastNow | null;
    forecastsWeek: ForecastWeek[];
    isLoading: boolean;
    error: string;
}

const initialState: WeatherState = {
    forecastNow: null,
    forecastsWeek: [],
    isLoading: true,
    error: '',
};

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        updateForecastDay: (state, action) => {
            state.forecastNow = action.payload;
            state.isLoading = false;
        },
        updateForecastWeekArray: (state, action) => {
            state.forecastsWeek.push(...action.payload?.list);
            state.isLoading = false;
        },
        setIsLoading: state => {
            state.isLoading = true;
        },
        setError: (state, action) => {
            state.isLoading = false;
            state.error = action.payload || 'Unknown error, try again later.';
        },
    },
});

export const {
    updateForecastDay,
    updateForecastWeekArray,
    setIsLoading,
    setError,
} = weatherSlice.actions;

export default weatherSlice.reducer;
