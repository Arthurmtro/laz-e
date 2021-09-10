import { ReactElement, FC, useState } from "react"

// Material UI
import { makeStyles, Box, Button, Collapse, Paper, ClickAwayListener, alpha, IconButton, Typography } from "@material-ui/core"
import SettingsIcon from "@material-ui/icons/Settings"
import SelectAllIcon from "@material-ui/icons/SelectAll"
import AddIcon from "@material-ui/icons/Add"
import CloseIcon from "@material-ui/icons/Close"

// Icons
import MenuBtn from "../assets/Icons/MenuBtn"
import ProfileDialog from "./ProfileDialog"

interface MenuButtonProps {
    setConfigs: any
    setSelectMode: any
}

const useMenuButtonStyle = makeStyles((theme) => ({
    footerButton: {
        position: "absolute",
        bottom: theme.spacing(3),
        zIndex: theme.spacing(2),
        width: 0,

        "& .MuiButton-root": {
            padding: "0 !important",
            margin: "0 !important",
            backgroundColor: "transparent",

            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    },
    footerMenu: {
        position: "absolute",
        bottom: theme.spacing(0),
        zIndex: theme.spacing(5),
    },
    paperMenu: {
        minHeight: theme.spacing(35),
        backgroundColor: alpha(theme.palette.secondary.main, 0.6),
        border: "1px solid #CBCBCB",
        borderRadius: "34px 34px 0px 0px",
        opacity: 1,
        backdropFilter: "blur(5px)",
        webkitBackdropFilter: "blur(5px)",
        padding: theme.spacing(3, 2, 1, 2),

        "& .MuiButton-root": {
            paddingLeft: "0 !important",
            margin: 0,
        },

        "& .MuiButton-root:hover": {
            backgroundColor: theme.palette.secondary.main,
        },

        "& .MuiButton-label": {
            justifyContent: "flex-start",
        },
    },
    button: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "100%",
        marginRight: theme.spacing(1),
        width: theme.spacing(6),
        height: theme.spacing(6),

        "& svg": {
            width: theme.spacing(4),
            height: theme.spacing(4),
        },

        "& .MuiIconButton-label": {
            color: theme.palette.secondary.light,
        },
    },
    closeButton: {
        color: theme.palette.common.black,
        width: theme.spacing(6),
        height: theme.spacing(6),

        "& svg": {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    },
}))

const MenuButton: FC<MenuButtonProps> = ({ setConfigs, setSelectMode }): ReactElement => {
    const classes = useMenuButtonStyle()
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    return (
        <>
            <Box className={classes.footerButton} ml={2}>
                <Button onClick={() => setShowMenu((prev) => !prev)}>
                    <MenuBtn />
                </Button>
            </Box>

            {/* Menu Dialog */}

            <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={() => setShowMenu(false)}>
                <Collapse in={showMenu} className={classes.footerMenu}>
                    <Paper className={classes.paperMenu}>
                        <Box display="flex" flexDirection="column">
                            <Button
                                onClick={() => {
                                    setOpenDialog(true)
                                    setShowMenu(false)
                                }}>
                                <IconButton className={classes.button}>
                                    <AddIcon />
                                </IconButton>
                                <Typography>Add new profile</Typography>
                            </Button>
                            <Box my={2} />
                            <Button onClick={() => setSelectMode((prevState: boolean) => !prevState)}>
                                <IconButton className={classes.button}>
                                    <SelectAllIcon />
                                </IconButton>
                                <Typography>Select profiles</Typography>
                            </Button>
                            <Box my={2} />
                            <Button>
                                <IconButton className={classes.button}>
                                    <SettingsIcon />
                                </IconButton>
                                <Typography>Options</Typography>
                            </Button>
                            <Box my={1} />
                            <IconButton onClick={() => setShowMenu(false)} className={classes.closeButton}>
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                </Collapse>
            </ClickAwayListener>
            <ProfileDialog open={openDialog} setOpen={setOpenDialog} setConfigs={setConfigs} />
        </>
    )
}

export default MenuButton
