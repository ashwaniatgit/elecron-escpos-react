import { createTheme } from '@material-ui/core/styles';

const lato = ['Lato', '"Helvetica Neue"', 'Arial', 'sans-serif'].join(',');

const ebgaramond = ['EB Garamond', 'serif'].join(',');

// A custom theme for this app
const theme = createTheme({
  typography: {
    fontFamily: lato,

    h1: {
      fontFamily: ebgaramond,
      fontStyle: 'normal',
      fontWeight: 100,
      fontSize: 80,
      lineHeight: 88 / 80,
    },
    h2: {
      fontFamily: ebgaramond,
      fontStyle: 'normal',
      fontWeight: 100,
      fontSize: 48,
      lineHeight: 64 / 56,
    },
    h3: {
      fontFamily: ebgaramond,
      fontStyle: 'normal',
      fontWeight: 100,
      fontSize: 40,
      lineHeight: 56 / 48,
    },
    h4: {
      fontFamily: ebgaramond,
      fontStyle: 'normal',
      fontWeight: 100,
      fontSize: 32,
      lineHeight: 48 / 40,
    },
  },

  palette: {
    primary: {
      main: '#FFFFFF',
    },
    secondary: {
      main: '#014836',
    },
    error: {
      main: '#c0392b',
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#014836',
    },
  },
  rectButton: {
    width: 80,
    height: 79,
    borderRadius: 4,
  },
  overrides: {
    // MuiPaper: {
    //   root: {
    //     backgroundColor: '#014836',
    //     color: '#FFFFFF'
    //   }
    // }
    MuiListItem: {
      gutters: {
        paddingLeft: 8,
        paddingRight: 8,
      },
    },
  },
});

export default theme;
