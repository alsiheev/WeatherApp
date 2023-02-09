import { StyleSheet, View, Text } from 'react-native';
import { ForecastWeek } from '../../../types';
import useThemedStyles from '../../../hooks/useThemedStyles';
import { IThemeContext } from '../../../utils/ThemeProvider';
import { fontScale, h, w } from '../../../utils/adaptive';

interface Props {
    forecast: ForecastWeek;
    withBorder?: boolean;
}

const DayForecastItem = (props: Props) => {
    const styles = useThemedStyles(style);
    const { forecast, withBorder } = props;
    const hours = new Date(forecast.dt_txt).getHours();
    return (
        <View
            style={[styles.container, withBorder && styles.containerWithBorder]}
        >
            <View style={[styles.containerItem, styles.hoursContainer]}>
                <Text style={styles.fontItem}>
                    {hours < 10 ? '0' + hours : hours}
                    :00
                </Text>
            </View>
            <View style={styles.info}>
                <View style={styles.containerItem}>
                    <Text style={styles.fontItem}>
                        Temp: {Math.round(forecast.main.temp)}°
                    </Text>
                </View>
                <View style={styles.containerItem}>
                    <Text style={styles.fontItem}>
                        Feels like: {Math.round(forecast.main.feels_like)}°
                    </Text>
                </View>
            </View>
        </View>
    );
};

const style = (theme: IThemeContext) =>
    StyleSheet.create({
        container: {
            flexDirection: 'row',
            paddingVertical: h(10),
        },
        containerWithBorder: {
            borderTopColor: theme.colors.btndark,
            borderTopWidth: 2,
        },
        containerItem: {
            backgroundColor: theme.colors.btndark,
            marginHorizontal: w(10),
            marginVertical: w(10),
            paddingHorizontal: w(10),
            paddingVertical: h(10),
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
        },
        info: {
            flexGrow: 3,
        },
        hoursContainer: {
            flexGrow: 1,
            minWidth: 100,
        },
        fontItem: {
            color: theme.colors.font,
            fontFamily: theme.font.bold,
            fontSize: fontScale(24),
        },
    });

export default DayForecastItem;
