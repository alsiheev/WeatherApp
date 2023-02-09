import { useContext } from 'react';
import { ThemeContext } from '../utils/ThemeProvider';

const useThemeContext = () => {
    return useContext(ThemeContext);
};

export default useThemeContext;
