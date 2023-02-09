export const weatherActions = {
    GET_FORECAST_NOW: 'GET_FORECAST_NOW',
    GET_FORECAST_WEEK: 'GET_FORECAST_WEEK',
};

export const getForecastNow = () => ({
    type: weatherActions.GET_FORECAST_NOW,
});

export const getForecastWeek = () => ({
    type: weatherActions.GET_FORECAST_WEEK,
});
