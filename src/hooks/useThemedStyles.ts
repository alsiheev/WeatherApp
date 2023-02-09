import { StyleSheet } from 'react-native/types';
import { IThemeContext } from '../utils/ThemeProvider';
import useThemeContext from './useThemeContext';

const useThemedStyles = (
    styles: (
        theme: IThemeContext,
        styleProps?: any,
    ) => StyleSheet.NamedStyles<any>,
    styleProps?: any,
) => {
    const theme = useThemeContext();
    return styles(theme, styleProps);
};

export default useThemedStyles;
