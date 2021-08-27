import { useEffect, useState } from "react"

// Utils
import { parseProfileData } from "../utils"

// Material ui
import { ThemeProvider } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import theme from "../theme"

// Components
import Layout from "./components/Layout"
import ProfileBox from "./components/ProfileBox"
import AddProfile from "./components/AddProfile"

const App = () => {
    const [configs, setConfigs] = useState([])

    useEffect(() => {
        parseProfileData(setConfigs)
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Grid container spacing={3}>
                    {configs.length >= 1 &&
                        configs.map((config, idx) => (
                            <Grid key={idx} item xs={6} md={4} xl={3}>
                                <ProfileBox id={idx} config={config} setConfigs={setConfigs} />
                            </Grid>
                        ))}
                </Grid>
                <AddProfile />
            </Layout>
        </ThemeProvider>
    )
}

export default App
