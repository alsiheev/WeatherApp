import { StyleSheet, Text, View } from 'react-native';
import useThemedStyles from '../../../hooks/useThemedStyles';
import { IThemeContext } from '../../../utils/ThemeProvider';

interface Props {
    temperature: number;
    day: string;
    isFirst?: boolean;
    offset?: number;
    time: number;
}

const WeatherItem = (props: Props) => {
    const styles = useThemedStyles(style);

    return (
        <View
            style={[
                styles.container,
                {
                    marginBottom: props.isFirst ? props.offset : 0,
                },
            ]}
        >
            <Text style={styles.font}>{props.day}</Text>
            <Text style={styles.font}>
                {props.time < 10 ? '0' + props.time : props.time}
                :00
            </Text>
            <Text style={styles.font}>{props.temperature}°</Text>
        </View>
    );
};

const style = (theme: IThemeContext) =>
    StyleSheet.create({
        container: {
            backgroundColor: theme.colors.btndark,
            margin: 10,
            flexGrow: 1,
            flexBasis: 0,
            height: '100%',
            borderRadius: 20,
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
        font: {
            fontFamily: theme.font.semibold,
            color: theme.colors.font,
        },
    });

export default WeatherItem;
