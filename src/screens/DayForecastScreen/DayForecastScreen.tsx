import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradientSVG from '../../assets/svg/LinearGradientSVG';
import Button from '../../components/Button/Button';
import useThemeContext from '../../hooks/useThemeContext';
import useThemedStyles from '../../hooks/useThemedStyles';
import { CalendarStackParamList } from '../../routes/MainRouter';
import { h, w } from '../../utils/adaptive';
import { IThemeContext } from '../../utils/ThemeProvider';
import DayForecastItem from './DayForecastItem/DayForecastItem';

interface Props
    extends NativeStackScreenProps<CalendarStackParamList, 'DayForecast'> {}

export const weekday = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const DayForecastScreen = (props: Props) => {
    const theme = useThemeContext();
    const styles = useThemedStyles(style);

    const tabBarHeight = useBottomTabBarHeight();

    const { forecast, day } = props.route.params;
    const handleBackButton = () => {
        props.navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Button onPress={handleBackButton} title="Back" />
                <View style={styles.headerTextContainer}>
                    <Text style={styles.font}>
                        {weekday[new Date(day).getDay() || 0]},{' '}
                        {new Date(day).getDate()}
                    </Text>
                </View>
            </View>
            <ScrollView
                contentContainerStyle={styles.scrollViewContainer}
                style={{
                    marginBottom: tabBarHeight,
                }}
            >
                {forecast?.map((item, index) => (
                    <DayForecastItem
                        key={item.dt}
                        forecast={item}
                        withBorder={!!index}
                    />
                ))}
            </ScrollView>
            <LinearGradientSVG
                colorTop={theme.colors.bgdark}
                colorBottom={theme.colors.bglight}
            />
        </View>
    );
};

const style = (theme: IThemeContext) =>
    StyleSheet.create({
        container: {
            flex: 1,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        headerTextContainer: {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.colors.btndark,
            paddingHorizontal: w(20),
            paddingVertical: h(20),
            marginHorizontal: w(10),
            marginVertical: h(10),
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
        scrollViewContainer: {
            minHeight: '100%',
            alignItems: 'center',
        },
        font: {
            fontFamily: theme.font.semibold,
            color: theme.colors.font,
        },
    });

export default DayForecastScreen;
