import { ReactElement, useState, useEffect, FC } from "react"

// Utils
import { addProfileData, getFileIcon, isTitleValid, editProfileData } from "../../utils"
import { IProfile, IShortcut } from "../../type/profile"

// Material UI
import { Button, Input, makeStyles, Dialog, DialogTitle, DialogActions, DialogContent, Typography, Box, IconButton } from "@material-ui/core"

// Icons
import CancelIcon from "@material-ui/icons/Cancel"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import CloseIcon from "@material-ui/icons/Close"

const useProfileDialogStyle = makeStyles((theme) => ({
    dialog: {
        "& .MuiDialog-paper": {
            margin: 0,
            backgroundColor: theme.palette.primary.main,
            padding: theme.spacing(3, 7),
            minWidth: "10%",
            maxWidth: "calc(75% - 30px)",
            height: "100%",
            borderRadius: "15px",
        },
    },
    shortcut: {
        "& .MuiTypography-root": {
            maxWidth: "95%",
            whiteSpace: "nowrap",
        },
    },
    shortcutPath: {
        fontWeight: theme.typography.fontWeightLight,
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    shortcutTitle: {
        fontWeight: theme.typography.fontWeightBold,
        minWidth: "75px",
        overflow: "hidden",
    },
    closeIcon: {
        height: theme.spacing(8),
        width: theme.spacing(8),
        "& svg": {
            height: theme.spacing(5),
            width: theme.spacing(5),
        },
    },
}))

interface IProfileDialog {
    open: boolean
    setOpen: any
    setConfigs: any
    profileInfos?: IProfile
    profileID?: number
}

const INITIAL_STATE: IProfile = {
    title: "",
    shortcuts: [],
}

const ProfileDialog: FC<IProfileDialog> = ({ open, setOpen, setConfigs, profileInfos = undefined, profileID = undefined }): ReactElement => {
    const classes = useProfileDialogStyle()
    const [emptyFields, setEmptyFields] = useState<boolean>(true)
    const [validTitle, setValidTitle] = useState<boolean>(true)
    const [newProfile, setNewProfile] = useState<IProfile>(profileInfos || INITIAL_STATE)

    useEffect(() => {
        if (newProfile.title !== profileInfos?.title) {
            isTitleValid(newProfile.title.trim(), setValidTitle)
        }
        setEmptyFields([newProfile.title].some((title) => title.trim() === "") || !(newProfile.shortcuts.length >= 1))
    }, [newProfile])

    const submitForm = () => {
        setNewProfile((profile: IProfile) => ({
            ...profile,
            title: profile.title.trim(),
        }))
        if (profileInfos === undefined) {
            addProfileData(newProfile, setConfigs)
            setNewProfile(INITIAL_STATE)
        } else {
            editProfileData(profileID, newProfile, setConfigs)
        }
        setOpen(false)
    }

    return (
        <>
            <Dialog
                open={open}
                onClose={() => {
                    setOpen(false)
                    if (profileInfos === undefined) {
                        setNewProfile(INITIAL_STATE)
                    } else {
                        setNewProfile(profileInfos)
                    }
                }}
                className={classes.dialog}>
                <Box display="flex" justifyContent="space-between">
                    <Box />
                    <DialogTitle disableTypography={true}>
                        <Typography variant="h2" align="center">
                            {profileInfos !== undefined ? "Edit Profile" : "Add New Profile"}
                        </Typography>
                    </DialogTitle>
                    <IconButton
                        className={classes.closeIcon}
                        onClick={() => {
                            setOpen(false)
                            if (profileInfos === undefined) {
                                setNewProfile(INITIAL_STATE)
                            } else {
                                setNewProfile(profileInfos)
                            }
                        }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Box mb={2} />
                <DialogContent>
                    <Input
                        placeholder="Title (max. 15)"
                        inputProps={{ maxLength: 15 }}
                        value={newProfile.title}
                        onChange={(e) => {
                            setNewProfile((prevState: IProfile) => ({
                                ...prevState,
                                title: e.target.value.trimStart(),
                            }))
                        }}
                    />
                    <Box mb={3} />
                    <Button onClick={() => document.getElementById("shortcutInput")?.click()} variant="outlined">
                        <AttachFileIcon />
                        <Box mr={2} />
                        <Typography>Add new shortcut</Typography>
                    </Button>
                    <Box mb={3} />
                    {newProfile.shortcuts.map((shortcut: IShortcut, idx) => (
                        <Box mb={1} key={idx} display="flex" justifyContent="flex-between" alignItems="center" className={classes.shortcut}>
                            {shortcut.icon && (
                                <>
                                    <img src={shortcut.icon} alt={shortcut.title} />
                                    <Box mr={0.5} />{" "}
                                </>
                            )}
                            <Typography className={classes.shortcutTitle}>{shortcut.title}</Typography>
                            <Box mr={0.5} />
                            <Typography>:</Typography>
                            <Box mr={1} />
                            <Typography className={classes.shortcutPath}>{shortcut.path}</Typography>
                            <IconButton
                                onClick={() =>
                                    setNewProfile((prevState: IProfile) => ({
                                        ...prevState,
                                        shortcuts: prevState.shortcuts.filter((s: IShortcut) => s.title !== shortcut.title),
                                    }))
                                }>
                                <CancelIcon />
                            </IconButton>
                        </Box>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button disabled={emptyFields || !validTitle} variant="outlined" onClick={() => submitForm()}>
                        {profileInfos !== undefined ? "Save" : "Publish"}
                    </Button>
                </DialogActions>
                <input
                    multiple
                    hidden={true}
                    type="file"
                    accept=".exe"
                    id="shortcutInput"
                    onChange={(e: any) => {
                        for (const file of e.target.files) {
                            Promise.resolve(getFileIcon(file.path)).then((iconImg) => {
                                setNewProfile((prevState: IProfile) => ({
                                    ...prevState,
                                    shortcuts: prevState.shortcuts.concat({ title: file.name, path: file.path, icon: iconImg }),
                                }))
                            })
                        }
                    }}
                />
            </Dialog>
        </>
    )
}

export default ProfileDialog
