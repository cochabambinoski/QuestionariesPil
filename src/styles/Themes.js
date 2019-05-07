import { createMuiTheme } from '@material-ui/core/styles';

export const themePrimary = createMuiTheme({
    palette: {
        primary: {
            light: '#64d9ff',
            main: '#03a8e4',
            dark: '#0079b2',
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#fff',
        },
        dangerButton: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#fff',
        },
        primaryButton: {
            main: '#03A8E4'
        },
        backgroundDrawer: {
            main: '#424242'
        }
    },
    typography: {
        useNextVariants: true,
    },
});

