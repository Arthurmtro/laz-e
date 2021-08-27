import { ReactElement, useState, useEffect } from "react"

// Utils
import { parseProfileData, writeProfileData } from "../../utils"

// Material UI
import { Box, Button, Input, makeStyles, Dialog, IconButton } from "@material-ui/core"
import AddCircleIcon from "@material-ui/icons/AddCircle"

const useAddProfileStyle = makeStyles((theme) => ({}))

const AddProfile = (): ReactElement => {
    const classes = useAddProfileStyle()
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false)
    const [newProfile, setNewProfile] = useState<any>({})
    const [configs, setConfigs] = useState([])

    useEffect(() => {
        parseProfileData(setConfigs)
    }, [])

    useEffect(() => {
        console.log(`newProfile`, newProfile)
    }, [newProfile])

    const submitNewProfile = () => {
        setNewProfile((profile: any) => ({
            ...profile,
            apps: [{ appTitle: "Notion", path: "C:\\Users\\arthu\\AppData\\Local\\Programs\\Notion\\Notion.exe" }],
        }))
        writeProfileData(configs.length, newProfile, setConfigs)
        setNewProfile({})
    }

    return (
        <>
            <IconButton onClick={() => setOpenAddDialog(true)}>
                <AddCircleIcon />
            </IconButton>
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <Box px={10} py={6}>
                    <Input
                        value={newProfile?.title}
                        onChange={(e) => {
                            setNewProfile((prevState: any) => ({
                                ...prevState,
                                title: e.target.value,
                            }))
                        }}
                    />
                    <Button variant="outlined" onClick={() => submitNewProfile()}>
                        publish
                    </Button>
                </Box>
            </Dialog>
        </>
    )
}

export default AddProfile
