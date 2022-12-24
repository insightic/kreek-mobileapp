import {DefaultTheme} from '@react-navigation/native';

export const lightColor = {
    primary: 'red',
    background: '#F5F5F5',
    card: 'blue',
    text: '#000000',
    textFade: '#00000060',
    underline: '#FF6F00',
    borderBottom: '#00000080',
    border: 'blue',
    notification: 'blue',
};

export const darkColor = {
    primary: 'red',
    background: '#222222',
    card: 'blue',
    text: '#ffffff',
    textFade: '#ffffff60',
    underline: '#FFFF00',
    borderBottom: '#ffffff80',
    border: 'blue',
    notification: 'blue',
};

export const lightTheme = {
    dark: false,
    colors: lightColor
};

export const darkTheme = {
    dark: true,
    colors: darkColor
};