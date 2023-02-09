import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import MainRouter from './src/routes/MainRouter';
import store from './src/store';
import ThemeProvider from './src/utils/ThemeProvider';

const App = (): JSX.Element => {
    return (
        <Provider store={store}>
            <ThemeProvider>
                <GestureHandlerRootView style={styles.container}>
                    <SafeAreaView style={styles.container}>
                        <MainRouter />
                    </SafeAreaView>
                </GestureHandlerRootView>
            </ThemeProvider>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
