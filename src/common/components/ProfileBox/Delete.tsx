import { FC, useState } from "react"

// Material ui
import { makeStyles, Button, Box, Typography, IconButton, Dialog } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"

// utils
import { deleteProfileData } from "../../../utils"

const useDeleteStyle = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "20px",
        // height: theme.spacing(18),
        // width: theme.spacing(5),
    },
    deletionDialog: {
        "& .MuiDialog-paper": {
            margin: 0,
            backgroundColor: theme.palette.primary.main,
            padding: theme.spacing(3, 4),
            borderRadius: "15px",
        },
    },
    cancelButton: {
        backgroundColor: "none",
        borderRadius: "5px",

        "&:hover": {
            backgroundColor: "none !important",
        },
    },
    deleteButton: {
        backgroundColor: theme.palette.error.light,
        borderRadius: "10px",
        transform: "scale(1.3)",

        "&:hover": {
            backgroundColor: theme.palette.error.main,
        },
    },
}))

const Delete: FC<any> = ({ config, setConfigs }) => {
    const classes = useDeleteStyle()
    const [deleteMode, setDeleteMode] = useState<boolean>(false)

    const confirmDeletion = () => {
        deleteProfileData(config?.title, setConfigs)
        setDeleteMode(false)
    }

    return (
        <>
            <IconButton className={classes.button} onClick={() => setDeleteMode((prevState) => !prevState)}>
                <DeleteIcon />
            </IconButton>
            <Dialog className={classes.deletionDialog} open={deleteMode} onClose={() => setDeleteMode(false)}>
                <Typography variant="h2">Delete {config?.title} ?</Typography>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                    <Box mt={1} />
                    <Typography variant="body2">
                        Are you sure you want to delete {config?.title} ? <br />
                        this action is irreversible
                    </Typography>
                    <Box ml={15} pt={4} display="flex" justifyContent="flex-end" alignItems="flex-end">
                        <Button color="secondary" onClick={() => setDeleteMode(false)} className={classes.cancelButton}>
                            Cancel
                        </Button>
                        <Box mx={1} />
                        <Button onClick={() => confirmDeletion()} className={classes.deleteButton}>
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Dialog>
        </>
    )
}

export default Delete
