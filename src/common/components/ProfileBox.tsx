import { FC, useState } from "react"

// Material ui
import { makeStyles, Button, Box, Input, Typography, IconButton, Card, Dialog } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"

// utils
import { openApp, writeProfileData } from "../../utils"

const useProfileBoxStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: "#00000040",
        padding: theme.spacing(2),
        height: theme.spacing(25),
    },
}))

const ProfileBox: FC<any> = ({ id, config, setConfigs }) => {
    const classes = useProfileBoxStyle()
    const [localConfig, setLocalConfig] = useState(config)
    const [editMode, setEditMode] = useState(false)

    return (
        <>
            <Card className={classes.root}>
                <Box display="flex" justifyContent="space-between" flexDirection="column">
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h2">{config.title}</Typography>
                        <IconButton onClick={() => setEditMode((prevState) => !prevState)}>
                            <EditIcon />
                        </IconButton>
                    </Box>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (localConfig.apps === (undefined || null)) return
                            localConfig.apps.forEach(({ path }: any) => openApp(path))
                        }}>
                        Run Profile
                    </Button>
                </Box>
            </Card>
            <Dialog open={editMode} onClose={() => setEditMode(false)}>
                <Box px={10} py={6}>
                    <Input
                        value={localConfig.title}
                        onChange={(e) => {
                            setLocalConfig((prevState: any) => ({
                                ...prevState,
                                title: e.target.value,
                            }))
                        }}
                    />
                    <Button variant="outlined" onClick={() => writeProfileData(id, localConfig, setConfigs)}>
                        Save changes
                    </Button>
                </Box>
            </Dialog>
        </>
    )
}

export default ProfileBox
