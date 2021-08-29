import { FC, useState } from "react"

// Material ui
import { makeStyles, Button, Box, Input, Typography, IconButton, Card, Dialog } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import DeleteIcon from "@material-ui/icons/Delete"

// utils
import { openApp, editProfileData, deleteProfileData } from "../../utils"
import { IProfile } from "../../type/profile"

const useProfileBoxStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: "#00000022",
        padding: theme.spacing(2),
        height: theme.spacing(25),
        boxShadow: theme.shadows[13],
        borderRadius: "20px",

        "&:hover": {
            boxShadow: theme.shadows[15],
            // transform: "scale(1.01)",
        },
    },
}))

const ProfileBox: FC<any> = ({ id, config, setConfigs }) => {
    const classes = useProfileBoxStyle()
    const [localConfig, setLocalConfig] = useState<IProfile>(config)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [deleteMode, setDeleteMode] = useState<boolean>(false)

    const submitEditedProfile = () => {
        setLocalConfig((profile: any) => ({
            ...profile,
            title: profile.title.trim(),
        }))
        editProfileData(id, localConfig, setConfigs)
        setEditMode(false)
    }

    const confirmDeletion = () => {
        deleteProfileData(config?.title, setConfigs)
        setDeleteMode(false)
    }

    return (
        <>
            <Card className={classes.root}>
                <Box display="flex" justifyContent="space-between" flexDirection="column">
                    <Box display="flex" justifyContent="space-between">
                        <Typography variant="h2">{config?.title}</Typography>
                        <Box display="flex" flexDirection="column">
                            <IconButton onClick={() => setEditMode((prevState) => !prevState)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => setDeleteMode((prevState) => !prevState)}>
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Box>

                    <Button
                        variant="outlined"
                        onClick={() => {
                            if (localConfig.shortcuts === (undefined || null)) return
                            localConfig.shortcuts.forEach(({ path }: any) => openApp(path))
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
                    <Button variant="outlined" onClick={() => submitEditedProfile()}>
                        Save changes
                    </Button>
                </Box>
            </Dialog>
            <Dialog open={deleteMode} onClose={() => setDeleteMode(false)}>
                <Box px={8} py={5} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Typography>Are you sure about deletion ?</Typography>
                    <Box pt={2} display="flex" justifyContent="center" alignItems="center">
                        <Button variant="outlined" onClick={() => setDeleteMode(false)}>
                            Cancel
                        </Button>
                        <Box mx={2} />
                        <Button variant="outlined" onClick={() => confirmDeletion()}>
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default ProfileBox
