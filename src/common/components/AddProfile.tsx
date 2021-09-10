import { ReactElement, useState, FC } from "react"

// Material UI
import { makeStyles, Grid, Card, alpha } from "@material-ui/core"

// Icons
import AddCircleIcon from "@material-ui/icons/AddCircle"
import ProfileDialog from "./ProfileDialog"

const useAddProfileStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: alpha(theme.palette.secondary.dark, 0.3),
        padding: theme.spacing(2),
        minHeight: theme.spacing(35),
        maxHeight: theme.spacing(35),
        minWidth: theme.spacing(35),
        boxShadow: theme.shadows[10],
        borderRadius: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
    },
    icon: {
        color: theme.palette.secondary.main,
        height: theme.spacing(8),
        width: theme.spacing(8),
    },
}))

interface IAddProfile {
    setConfigs: any
}

const AddProfile: FC<IAddProfile> = ({ setConfigs }): ReactElement => {
    const classes = useAddProfileStyle()
    const [openDialog, setOpenDialog] = useState<boolean>(false)

    return (
        <>
            <Grid item xs={6} md={4} xl={3}>
                <Card className={classes.root} onClick={() => setOpenDialog(true)}>
                    <AddCircleIcon className={classes.icon} />
                </Card>
            </Grid>
            <ProfileDialog open={openDialog} setOpen={setOpenDialog} setConfigs={setConfigs} />
        </>
    )
}

export default AddProfile
