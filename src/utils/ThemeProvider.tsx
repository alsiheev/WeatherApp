import React from 'react';
import { lightTheme, darkTheme, font } from './styles';

interface Props {
    children: React.ReactNode;
}

export interface IThemeContext {
    dark: boolean;
    colors: typeof lightTheme;
    font: typeof font;
}

export const ThemeContext = React.createContext<IThemeContext>({
    dark: false,
    colors: lightTheme,
    font,
});

const ThemeProvider: React.FC<Props> = ({ children }) => {
    const hours = new Date().getHours();
    const isNightTime = hours < 6 || hours > 20;

    const theme = {
        dark: isNightTime,
        colors: isNightTime ? darkTheme : lightTheme,
        font,
    };

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

export default ThemeProvider;
