import { Suspense, useEffect } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BottomSheetComponent from '../../components/BottomSheetComponent/BottomSheetComponent';
import Weather from '../../components/Weather/Weather';
import useThemeContext from '../../hooks/useThemeContext';
import useThemedStyles from '../../hooks/useThemedStyles';
import { RootState } from '../../store';
import {
    getForecastNow,
    getForecastWeek,
} from '../../store/weather/weatherActions';
import { fontScale, h } from '../../utils/adaptive';
import { IThemeContext } from '../../utils/ThemeProvider';

const HomeScreen = () => {
    const theme = useThemeContext();
    const styles = useThemedStyles(style);

    const bg = theme.dark
        ? require('./../../assets/img/nightbg.png')
        : require('./../../assets/img/daybg.png');

    const forecast = useSelector(
        (state: RootState) => state.weather.forecastNow,
    );
    const isLoading = useSelector(
        (state: RootState) => state.weather.isLoading,
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getForecastNow());
        dispatch(getForecastWeek());
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <ImageBackground style={styles.bgImg} source={bg}>
                {isLoading ? (
                    <Suspense />
                ) : (
                    <>
                        <View style={styles.mainInfo}>
                            <Text
                                style={[styles.mainInfoFont, styles.cityText]}
                            >
                                {forecast?.name}
                            </Text>
                            <Text
                                style={[
                                    styles.mainInfoFont,
                                    styles.temperatureText,
                                ]}
                            >
                                {forecast?.main.temp
                                    ? Math.round(forecast?.main.temp) + '°'
                                    : '-'}
                            </Text>
                        </View>

                        <BottomSheetComponent>
                            <Weather />
                        </BottomSheetComponent>
                    </>
                )}
            </ImageBackground>
        </View>
    );
};

const style = (theme: IThemeContext) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        bgImg: {
            height: '100%',
        },
        mainInfo: {
            paddingTop: h(70),
            alignItems: 'center',
        },
        mainInfoFont: {
            color: theme.colors.font,
        },
        cityText: {
            fontFamily: theme.font.regular,
            fontSize: fontScale(24),
        },
        temperatureText: {
            fontFamily: theme.font.thin,
            fontSize: fontScale(72),
        },
    });

export default HomeScreen;
