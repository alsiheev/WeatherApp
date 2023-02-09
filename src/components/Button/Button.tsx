import { View, TouchableNativeFeedback, StyleSheet, Text } from 'react-native';
import useThemedStyles from '../../hooks/useThemedStyles';
import { h, w } from '../../utils/adaptive';
import { IThemeContext } from '../../utils/ThemeProvider';

interface Props {
    onPress: () => void;
    title: string;
}

const Button = (props: Props) => {
    const styles = useThemedStyles(style);

    return (
        <TouchableNativeFeedback onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.title}>
                    {'<'}
                    {props.title}
                </Text>
            </View>
        </TouchableNativeFeedback>
    );
};

const style = (theme: IThemeContext) =>
    StyleSheet.create({
        button: {
            justifyContent: 'center',
            backgroundColor: theme.colors.btnlight,
            paddingHorizontal: w(20),
            paddingVertical: h(20),
            marginHorizontal: w(10),
            marginVertical: h(10),
            width: w(150),
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
        title: {
            color: theme.colors.font,
            fontFamily: theme.font.bold,
        },
    });

export default Button;
