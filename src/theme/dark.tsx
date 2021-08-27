// @ts-nocheck
import { responsiveFontSizes, createTheme, Theme } from "@material-ui/core/styles"

import NunitoLight from "../common/assets/fonts/Nunito-Light.ttf"
import NunitoMedium from "../common/assets/fonts/Nunito-Regular.ttf"
import NunitoHeavy from "../common/assets/fonts/Nunito-Bold.ttf"

const nunitoLight = {
    fontFamily: "'Nunito'",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 350,
    src: `
      url(${NunitoLight}) format('ttf')
    `,
}
const nunitoMedium = {
    fontFamily: "'Nunito'",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 650,
    src: `
      url(${NunitoMedium}) format('ttf')
    `,
}

const nunitoHeavy = {
    fontFamily: "'Nunito'",
    fontStyle: "normal",
    fontDisplay: "swap",
    fontWeight: 850,
    src: `
      url(${NunitoHeavy}) format('ttf')
    `,
}

const themeDark: Theme = createTheme({
    breakpoints: {
        keys: ["xs", "sm", "md", "lg", "xl"],
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1280,
            xl: 1920,
        },
    },
    direction: "ltr",
    mixins: {
        toolbar: {
            minHeight: `${13 / 3}rem`,
            "@media (min-width:600px)": {
                minHeight: `${15.25 / 3}rem`,
            },
            "@media (min-width:960px)": {
                minHeight: `${16.75 / 3}rem`,
            },
            "@media (min-width:1280px)": {
                minHeight: `${17.5 / 3}rem`,
            },
        },
    },
    overrides: {
        MuiCssBaseline: {
            "@global": {
                "@font-face": [nunitoLight, nunitoMedium, nunitoHeavy],
            },
        },
        MuiToolbar: {
            root: {
                backgroundColor: "#101010 !important",
            },
        },
        MuiPickersToolbarButton: {
            toolbarBtn: {
                backgroundColor: "transparent",
            },
        },
        MuiDialogActions: {
            root: {
                "& .MuiButton-root": {
                    backgroundColor: "transparent",
                },
            },
        },
        MuiOutlinedInput: {
            root: {
                borderRadius: 30,
                paddingLeft: 15,
            },
            input: {
                "&:autofill": {
                    "-webkit-box-shadow": "none",
                    "-webkit-text-fill-color": "none",
                },
            },
            multiline: {
                borderRadius: 15,
            },
        },
        MuiInputLabel: {
            root: {
                fontSize: "1.5rem",
            },
            outlined: {
                marginLeft: 15,
            },
        },
        PrivateNotchedOutline: {
            legendLabelled: {
                marginLeft: 15,
            },
            legendNotched: {
                "& span": {
                    fontSize: "1.1rem", // Important for border not to overlay text (because text MuiInputLabel.fontSize is changed)
                },
            },
        },
        MuiButton: {
            root: {
                borderRadius: 30,
                color: "#101010",
                backgroundColor: "#00FFB0",
                height: "48px",
                paddingRight: "2rem !important",
                paddingLeft: "2rem !important",
                "&:hover": {
                    backgroundColor: "rgb(51, 255, 191)",
                },
            },
            outlined: {
                color: "#FFFFFF",
                borderColor: "#FFFFFF",
                backgroundColor: "transparent",
                "&:hover": {
                    backgroundColor: "rgba(225,225,225, 0.24)",
                },
            },
            contained: {
                backgroundColor: "#24252D",
                color: "#FFFFFF",
            },
            text: {
                color: "#FFFFFF",
                borderRadius: 30,
                backgroundColor: "transparent",
            },
        },
        MuiTab: {
            root: {
                fontSize: `${7 / 6}rem`,
                fontWeight: 550,
            },
        },
        MuiSwitch: {
            switchBase: {
                color: "#FFFFFF",
            },
        },
    },
    palette: {
        common: {
            black: "#000",
            white: "#FFFFFF",
        },
        type: "dark",
        primary: {
            main: "#00FFB0",
            contrastText: "#101010",
            light: "rgb(51, 255, 191)",
            dark: "rgb(0, 178, 123)",
        },
        secondary: {
            main: "#009A2B",
            light: "rgb(51, 174, 85)",
            dark: "rgb(0, 107, 30)",
            contrastText: "#fff",
        },
        error: {
            main: "#ff5d60",
            light: "rgb(255, 81, 79)",
            dark: "rgb(178, 26, 24)",
            contrastText: "#fff",
        },
        warning: {
            main: "#FF9800",
            contrastText: "#101010",
            light: "rgb(255, 172, 51)",
            dark: "rgb(178, 106, 0)",
        },
        info: {
            main: "#2196F3",
            light: "rgb(77, 171, 245)",
            dark: "rgb(23, 105, 170)",
            contrastText: "#fff",
        },
        success: {
            main: "#4CAF50",
            contrastText: "#101010",
            light: "rgb(111, 191, 115)",
            dark: "rgb(53, 122, 56)",
        },
        grey: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            400: "#bdbdbd",
            500: "#9B9FB5",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#24252D",
            A100: "#d5d5d5",
            A200: "#aaaaaa",
            A400: "#303030",
            A700: "#616161",
            main: "#24252D",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
        text: {
            primary: "#FFFFFF",
            secondary: "#9B9FB5",
            disabled: "#9B9FB5",
            hint: "rgba(255, 255, 255, 0.5)",
            // icon: "rgba(255, 255, 255, 0.5)"
        },
        divider: "#9B9FB5",
        background: {
            paper: "#101010",
            default: "#101010",
        },
        action: {
            active: "#FFFFFF",
            hover: "rgba(255, 255, 255, 0.08)",
            hoverOpacity: 0.08,
            selected: "rgba(255, 255, 255, 0.16)",
            selectedOpacity: 0.16,
            disabled: "#9E9E9E",
            disabledBackground: "#24252D",
            disabledOpacity: 0.38,
            focus: "rgba(255, 255, 255, 0.12)",
            focusOpacity: 0.12,
            activatedOpacity: 0.24,
        },
    },
    props: {
        MuiTypography: {
            variantMapping: {
                h1: "h1",
                h2: "h2",
                /* H3 to H6 should not be used */
                h3: "h2",
                h4: "h2",
                h5: "h2",
                h6: "h2",
                /* H3 to H6 should not be used */
                subtitle1: "subtitle1",
                subtitle2: "subtitle2",
                body1: "body1",
                body2: "body2",
                caption: "caption",
            },
        },
    },
    shadows: [
        "none",
        "0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)",
        "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
        "0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)",
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)",
        "0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)",
        "0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)",
        "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
        "0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)",
        "0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)",
        "0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)",
        "0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)",
        "0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)",
        "0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)",
        "0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)",
        "0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)",
        "0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)",
        "0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)",
        "0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)",
        "0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)",
        "0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)",
        "0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)",
    ],
    typography: {
        htmlFontSize: 16,
        fontFamily: ["'Nunito'"].join(","),
        fontSize: 14,
        color: "#FFFFFF",
        fontWeightLight: 350,
        fontWeightRegular: 550,
        fontWeightMedium: 850,
        fontWeightBold: 950,
        h1: {
            fontFamily: "'Nunito'",
            fontWeight: 950,
            fontSize: `${9}rem`,
            lineHeight: 1.5,
        },
        h2: {
            fontFamily: "'Nunito'",
            fontWeight: 850,
            fontSize: `${5}rem`,
            lineHeight: 1.5,
        },
        /* H3 to H6 should not be used */
        h3: {
            fontFamily: "'Nunito'",
            fontWeight: 500,
            fontSize: `${3}rem`,
            lineHeight: 1.167,
        },
        h4: {
            fontFamily: "'Nunito'",
            fontWeight: 500,
            fontSize: `${2.125}rem`,
            lineHeight: 1.235,
        },
        h5: {
            fontFamily: "'Nunito'",
            fontWeight: 500,
            fontSize: `${1.5}rem`,
            lineHeight: 1.334,
        },
        h6: {
            fontFamily: "'Nunito'",
            fontWeight: 800,
            fontSize: `${1.25}rem`,
            lineHeight: 1.6,
        },
        /* H3 to H6 should not be used */
        subtitle1: {
            fontFamily: "'Nunito'",
            fontWeight: 850,
            fontSize: `${11 / 3}rem`,
            lineHeight: 1.5,
        },
        subtitle2: {
            fontFamily: "'Nunito'",
            fontWeight: 550,
            fontSize: `${1}rem`,
            lineHeight: 1.33,
        },
        body1: {
            fontFamily: "'Nunito'",
            fontWeight: 550,
            fontSize: `${7 / 3}rem`,
            lineHeight: 1.38,
        },
        body2: {
            fontFamily: "'Nunito'",
            fontWeight: 550,
            fontSize: `${5 / 3}rem`,
            lineHeight: 1.35,
        },
        button: {
            fontFamily: "'Nunito'",
            fontWeight: 850,
            fontSize: `${7 / 3}rem`,
            lineHeight: 1.75,
            textTransform: "none",
        },
        caption: {
            fontFamily: "'Nunito'",
            fontWeight: 550,
            fontSize: `${0.75}rem`,
            lineHeight: 1.3,
        },
        overline: {
            fontFamily: "'Nunito'",
            fontWeight: 500,
            fontSize: `${0.75}rem`,
            lineHeight: 2.66,
            textTransform: "uppercase",
        },
    },
    shape: {
        borderRadius: 4,
    },
    transitions: {
        easing: {
            easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
            easeIn: "cubic-bezier(0.4, 0, 1, 1)",
            sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
        },
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            standard: 300,
            complex: 375,
            enteringScreen: 225,
            leavingScreen: 195,
        },
    },
    zIndex: {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
    },
})

export default responsiveFontSizes(themeDark)
