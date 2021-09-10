import { FC, useState } from "react"

//Type
import { IProfile } from "../../../type/profile"

// Material ui
import { makeStyles, IconButton } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"

// Components
import ProfileDialog from "../ProfileDialog"

const useEditStyle = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "20px",
        // height: theme.spacing(18),
        // width: theme.spacing(5),
    },
}))

interface IEdit {
    id: number
    config: IProfile
    setConfigs: any
}

const Edit: FC<IEdit> = ({ id, config, setConfigs }) => {
    const classes = useEditStyle()
    const [editMode, setEditMode] = useState<boolean>(false)

    return (
        <>
            <IconButton className={classes.button} onClick={() => setEditMode((prevState) => !prevState)}>
                <EditIcon />
            </IconButton>
            <ProfileDialog open={editMode} setOpen={setEditMode} setConfigs={setConfigs} profileInfos={config} profileID={id} />
        </>
    )
}

export default Edit
