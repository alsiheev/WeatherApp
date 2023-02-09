import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import useThemeContext from '../hooks/useThemeContext';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen/CalendarScreen';
import DayForecastScreen from '../screens/DayForecastScreen/DayForecastScreen';
import { ForecastWeek } from '../types';
import HomeSVG from '../assets/svg/HomeSVG';
import CalendarSVG from '../assets/svg/CalendarSVG';

const Tab = createBottomTabNavigator<RootTabParamList>();
const CalendarStack = createNativeStackNavigator();

const CalendarStackScreen = () => {
    return (
        <CalendarStack.Navigator
            screenOptions={{ headerShown: false, animation: 'fade' }}
        >
            <CalendarStack.Screen name="Calendar" component={CalendarScreen} />
            <CalendarStack.Screen
                name="DayForecast"
                component={DayForecastScreen}
            />
        </CalendarStack.Navigator>
    );
};

const MainRouter = () => {
    const theme = useThemeContext();

    return (
        <NavigationContainer>
            <StatusBar
                barStyle={theme.dark ? 'light-content' : 'dark-content'}
                backgroundColor={theme.colors.bgdark}
            />

            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: {
                        position: 'absolute',
                        backgroundColor: 'transparent',
                        borderTopWidth: 0,
                        borderRadius: 25,
                        shadowColor: 'transparent',
                        elevation: 0,
                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <HomeSVG
                                color={
                                    focused
                                        ? theme.colors.btndark
                                        : theme.colors.font
                                }
                            />
                        ),
                        tabBarShowLabel: false,
                    }}
                />
                <Tab.Screen
                    name="CalendarStack"
                    component={CalendarStackScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <CalendarSVG
                                color={
                                    focused
                                        ? theme.colors.btndark
                                        : theme.colors.font
                                }
                            />
                        ),
                        tabBarShowLabel: false,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

export type RootTabParamList = {
    Home: undefined;
    CalendarStack: undefined;
};

export type CalendarStackParamList = {
    Calendar: undefined;
    DayForecast: { forecast: ForecastWeek[] | undefined; day: number };
};

export default MainRouter;
