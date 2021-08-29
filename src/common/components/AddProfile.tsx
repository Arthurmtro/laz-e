import { ReactElement, useState, useEffect, FC } from "react"

// Utils
import { addProfileData, isTitleValid } from "../../utils"
import { IProfile } from "../../type/profile"

// Material UI
import { Box, Button, Input, makeStyles, Dialog, Grid, Card } from "@material-ui/core"
import AddCircleIcon from "@material-ui/icons/AddCircle"

const useAddProfileStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: "#00000040",
        padding: theme.spacing(2),
        height: theme.spacing(25),
        boxShadow: theme.shadows[10],
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
    icon: {
        height: theme.spacing(8),
        width: theme.spacing(8),
    },
}))

interface IAddProfile {
    setConfigs: any
}

const INITIAL_STATE: IProfile = {
    title: "",
    shortcuts: [
        {
            title: "Notion",
            path: "C:\\Users\\arthu\\AppData\\Local\\Programs\\Notion\\Notion.exe",
        },
    ],
}

const AddProfile: FC<IAddProfile> = ({ setConfigs }): ReactElement => {
    const classes = useAddProfileStyle()
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)
    const [emptyFields, setEmptyFields] = useState<boolean>(true)
    const [validTitle, setValidTitle] = useState<boolean>(true)
    const [newProfile, setNewProfile] = useState<IProfile>(INITIAL_STATE)

    useEffect(() => {
        isTitleValid(newProfile.title.trim(), setValidTitle)
        setEmptyFields([newProfile.title].some((title) => title.trim() === ""))
    }, [newProfile])

    const submitNewProfile = () => {
        setNewProfile((profile: IProfile) => ({
            ...profile,
            title: profile.title.trim(),
        }))
        setOpenAddDialog(false)
        setNewProfile(INITIAL_STATE)
        console.log(newProfile)
        addProfileData(newProfile, setConfigs)
    }

    return (
        <>
            <Grid item xs={6} md={4} xl={3}>
                <Card className={classes.root} onClick={() => setOpenAddDialog(true)}>
                    <AddCircleIcon className={classes.icon} />
                </Card>
            </Grid>
            <Dialog
                open={openAddDialog}
                onClose={() => {
                    setOpenAddDialog(false)
                    setNewProfile(INITIAL_STATE)
                }}>
                <Box px={10} py={6}>
                    <Input
                        inputProps={{ maxLength: 15 }}
                        value={newProfile.title}
                        onChange={(e) => {
                            setNewProfile((prevState: IProfile) => ({
                                ...prevState,
                                title: e.target.value.trimStart(),
                            }))
                        }}
                    />
                    <Input
                        type="file"
                        onChange={(e) => {
                            console.log(e.target.value)
                        }}
                    />
                    <Button disabled={emptyFields || !validTitle} variant="outlined" onClick={() => submitNewProfile()}>
                        publish
                    </Button>
                </Box>
            </Dialog>
        </>
    )
}

export default AddProfile
