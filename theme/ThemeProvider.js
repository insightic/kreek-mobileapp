import React, {createContext, useEffect, useState} from 'react';
import {lightColor, darkColor} from './colors.js';
import {useColorScheme} from 'react-native'

export const ThemeContext = createContext({
    dark: false,
    colors: lightColor,
    setScheme: () => {},
});

const ThemeProvider = props => {
    const colorScheme = useColorScheme();
    const [isDark, setIsDark] = useState(colorScheme == 'dark');
    useEffect(() => {
        setIsDark(colorScheme == 'dark')
    }, [colorScheme])

    const defaultTheme = {
        dark: isDark,
        colors: isDark ? darkColor : lightColor,
        setScheme: (scheme) => setIsDark(scheme == 'dark'),
    }

    return (
        <ThemeContext.Provider value={defaultTheme}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export const useTheme = () => useContext(ThemeContext)

