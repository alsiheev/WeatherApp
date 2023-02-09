import { BottomSheetSectionList } from '@gorhom/bottom-sheet';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import useThemedStyles from '../../hooks/useThemedStyles';
import { weekday } from '../../screens/DayForecastScreen/DayForecastScreen';
import { RootState } from '../../store';
import { ForecastWeek } from '../../types';
import { fontScale } from '../../utils/adaptive';
import { IThemeContext } from '../../utils/ThemeProvider';
import WeatherItem from './WeatherItem/WeatherItem';

const Weather = () => {
    const styles = useThemedStyles(style);
    const tabBarHeight = useBottomTabBarHeight();
    const screenHeight = Dimensions.get('window').height;

    const [headerHeight, setHeaderHeight] = useState(0);

    const forecast = useSelector(
        (state: RootState) => state.weather.forecastsWeek,
    );

    const separateIntoSections = useCallback(() => {
        const forecastWithSections: { title: string; data: ForecastWeek[] }[] =
            [
                { title: 'First Week', data: [] },
                { title: 'Second Week', data: [] },
            ];
        const firstDay = new Date(
            forecast && forecast[0] ? forecast[0].dt : 0 * 1000,
        ).getDay();

        forecast.forEach(item => {
            const newDay = new Date(item.dt * 1000).getDay();
            if (newDay < firstDay) {
                forecastWithSections[1].data.push(item);
            } else {
                forecastWithSections[0].data.push(item);
            }
        });

        return forecastWithSections;
    }, [forecast]);

    return (
        <View
            style={[
                styles.container,
                {
                    height: screenHeight - 2 * tabBarHeight,
                },
            ]}
        >
            <BottomSheetSectionList
                sections={separateIntoSections()}
                keyExtractor={(item, index) => (item.dt + index).toString()}
                renderItem={({ item, index }) => {
                    const hours = new Date(item.dt_txt).getHours();
                    return (
                        <WeatherItem
                            temperature={Math.round(item.main.temp)}
                            day={
                                weekday[new Date(item.dt * 1000).getDay() || 0]
                            }
                            isFirst={index === 0}
                            offset={tabBarHeight + headerHeight}
                            time={hours}
                        />
                    );
                }}
                renderSectionHeader={({ section }) => {
                    return (
                        <View
                            style={styles.sectionHeader}
                            onLayout={event => {
                                const { _x, _y, _width, height } =
                                    event.nativeEvent.layout;
                                setHeaderHeight(height);
                            }}
                        >
                            <Text style={styles.sectionHeaderText}>
                                {section.title}
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const style = (theme: IThemeContext) =>
    StyleSheet.create({
        container: {
            width: '100%',
        },
        sectionHeader: {
            alignItems: 'center',
        },
        sectionHeaderText: {
            color: theme.colors.font,
            fontFamily: theme.font.bold,
            fontSize: fontScale(24),
        },
    });

export default Weather;
