import { FC } from "react"

// Components
import Titlebar from "./TitleBar"

// Material ui
import CssBaseline from "@material-ui/core/CssBaseline"
import { makeStyles, Container, Box } from "@material-ui/core"

const useLayoutStyle = makeStyles((theme) => ({
    root: {
        minHeight: "100vh",
        backgroundColor: theme.palette.primary.dark,
        // backgroundImage: " linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)",
    },
    container: {
        padding: theme.spacing(0, 3),
    },
}))

const Layout: FC<any> = ({ children }) => {
    const classes = useLayoutStyle()

    return (
        <Box pt={4} className={classes.root}>
            <CssBaseline />
            <Titlebar />
            <Box mb={2} />
            <Container maxWidth="xl" className={classes.container}>
                {children}
            </Container>
        </Box>
    )
}

export default Layout
