import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { lightGreen } from '@material-ui/core/colors';
import * as React from 'react';

const Theme = ({ children }) => {
    const theme = createMuiTheme({
        palette: {
            primary: lightGreen,
            secondary: lightGreen
        },
    });
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
