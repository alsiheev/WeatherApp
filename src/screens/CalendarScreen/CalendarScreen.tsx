import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import LinearGradientSVG from '../../assets/svg/LinearGradientSVG';
import useThemeContext from '../../hooks/useThemeContext';
import useThemedStyles from '../../hooks/useThemedStyles';
import { IThemeContext } from '../../utils/ThemeProvider';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CalendarStackParamList } from '../../routes/MainRouter';
import { RootState } from '../../store';
import { getForecastWeek } from '../../store/weather/weatherActions';

interface Props {
    navigation: NativeStackNavigationProp<CalendarStackParamList, 'Calendar'>;
}

const CalendarScreen = (props: Props) => {
    const theme = useThemeContext();
    const styles = useThemedStyles(style);

    const forecast = useSelector(
        (state: RootState) => state.weather.forecastsWeek,
    );
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            if (forecast.length === 0) {
                dispatch(getForecastWeek());
            }
        }, [dispatch, forecast]),
    );

    const getDate = (offsetDate = 0) => {
        let date = new Date();
        date.setDate(date.getDate() + offsetDate);
        date.toISOString().split('T')[0];
        const offset = date.getTimezoneOffset();
        date = new Date(date.getTime() - offset * 60 * 1000);
        return date.toISOString().split('T')[0];
    };

    return (
        <>
            <View style={styles.container}>
                <Calendar
                    onDayPress={day => {
                        props.navigation.navigate('DayForecast', {
                            forecast: forecast.filter(item => {
                                return (
                                    new Date(item.dt * 1000).setHours(
                                        0,
                                        0,
                                        0,
                                        0,
                                    ) ===
                                    new Date(day.timestamp).setHours(0, 0, 0, 0)
                                );
                            }),
                            day: day.timestamp,
                        });
                    }}
                    minDate={getDate()}
                    maxDate={getDate(4)}
                    style={styles.calendarContainer}
                    theme={{
                        calendarBackground: theme.colors.btnlight,
                        textSectionTitleColor: theme.colors.font,
                        todayTextColor: theme.colors.btndark,
                        dayTextColor: theme.colors.font,
                        textDisabledColor: theme.colors.disabled,
                        arrowColor: 'orange',
                        monthTextColor: theme.colors.font,
                        textDayFontFamily: theme.font.regular,
                        textMonthFontFamily: theme.font.bold,
                        textDayHeaderFontFamily: theme.font.regular,
                    }}
                />
            </View>
            <LinearGradientSVG
                colorTop={theme.colors.bgdark}
                colorBottom={theme.colors.bglight}
            />
        </>
    );
};

const style = (theme: IThemeContext) =>
    StyleSheet.create({
        container: {
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        calendarContainer: {
            minWidth: '90%',
            minHeight: '75%',
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
    });

export default CalendarScreen;
