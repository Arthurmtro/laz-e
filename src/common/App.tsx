import { useEffect, useState } from "react"

// Utils
import { parseProfileData } from "../utils"
import { IProfile } from "../type/profile"

// Material ui
import { ThemeProvider, Grid, Box } from "@material-ui/core"
import theme from "../theme"

// Components
import Layout from "./components/Layout"
import ProfileBox from "./components/ProfileBox"
import AddProfile from "./components/AddProfile"
import MenuButton from "./components/MenuButton"

const App = () => {
    const [configs, setConfigs] = useState<IProfile[]>([])

    useEffect(() => {
        parseProfileData(setConfigs)
    }, [])

    console.log(configs)

    return (
        <ThemeProvider theme={theme}>
            <Layout>
                <Grid container spacing={3}>
                    {configs.length >= 1 &&
                        configs.map((config, idx) => (
                            <Grid key={idx} item xs={6} md={4} xl={3}>
                                <Box mb={2}>
                                    <ProfileBox id={idx} config={config} setConfigs={setConfigs} />
                                </Box>
                            </Grid>
                        ))}
                    <AddProfile setConfigs={setConfigs} />
                </Grid>
                <MenuButton />
            </Layout>
        </ThemeProvider>
    )
}

export default App
