import { createTheme, responsiveFontSizes, Theme } from "@material-ui/core/styles"
import themeDark from "./dark"

const theme = createTheme({
    palette: {
        primary: {
            main: "#870CC3",
        },
        secondary: {
            main: "#FF6666", // todo : à définir plus tard
            contrastText: "#FFFFFF",
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        fontFamily: ['"Poppins"', "Open Sans"].join(","),
        fontSize: 18.6,
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: "bold",
        },
        h6: {
            fontWeight: "bold",
        },
        button: {
            // fontSize: 21.3,
            textTransform: "inherit",
        },
    },
})

theme.overrides = {
    MuiButton: {
        root: {
            height: 45,
            borderRadius: 45 / 2,
            padding: "0 30px",
        },
        outlined: {
            padding: "0 30px",
            "&:hover:not($outlinedPrimary):not($outlinedSecondary)": {
                background: `${theme.palette.grey[500]}!important`,
                color: theme.palette.common.white,
            },
        },
        outlinedPrimary: {
            "&:hover": {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
            },
        },
        outlinedSecondary: {
            "&:hover": {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.common.white,
            },
        },
    },
    MuiSwitch: {
        root: {
            width: 42,
            height: 26,
            padding: 0,
            margin: theme.spacing(1),
        },
        switchBase: {
            padding: 1,
            "&$checked": {
                transform: "translateX(16px)",
                color: theme.palette.common.white,
                "& + $track": {
                    backgroundColor: theme.palette.success.main,
                    opacity: 1,
                    border: "none",
                },
            },
            "&$focusVisible $thumb": {
                color: theme.palette.success.main,
                border: "6px solid #fff",
            },
        },
        colorSecondary: {
            "&$checked": {
                color: theme.palette.common.white,
            },
        },
        colorPrimary: {
            "&$checked": {
                color: theme.palette.common.white,
            },
        },
        disabled: {
            "&$colorPrimary, &$colorSecondary, &$switchBase": {
                "& + $track": {
                    backgroundColor: theme.palette.grey[300],
                    border: "none",
                    opacity: 1,
                },
            },
        },
        thumb: {
            width: 24,
            height: 24,
        },
        track: {
            borderRadius: 26 / 2,
            border: `1px solid ${theme.palette.grey[400]}`,
            backgroundColor: theme.palette.grey[50],
            opacity: 1,
            transition: theme.transitions.create(["background-color", "border"]),
        },
        checked: {},
    },
    MuiAppBar: {
        root: {
            boxShadow: "none",
        },
    },
    MuiAvatar: {
        // root: {
        //   border: '3px solid white',
        //   boxShadow: theme.shadows[1]
        // },
        rounded: {
            borderRadius: 7,
        },
    },
    MuiPaper: {
        rounded: {
            borderRadius: 12,
        },
    },
    MuiCheckbox: {
        root: {
            width: "48px",
            height: "48px",
        },
    },
}

export default responsiveFontSizes(themeDark)
