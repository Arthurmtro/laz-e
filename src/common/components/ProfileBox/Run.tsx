import React, { ReactElement, FC } from "react"

//Type
import { IProfile } from "../../../type/profile"

// utils
import { openApp } from "../../../utils"

// Material UI
import { makeStyles, IconButton } from "@material-ui/core"
import FlashOnIcon from "@material-ui/icons/FlashOn"

interface RunProps {
    config: IProfile
}

const useRunStyle = makeStyles((theme) => ({
    button: {
        backgroundColor: theme.palette.secondary.main,
        borderRadius: "20px",
        height: theme.spacing(18),
    },
}))

const Run: FC<RunProps> = ({ config }): ReactElement => {
    const classes = useRunStyle()

    return (
        <IconButton
            className={classes.button}
            onClick={() => {
                if (config.shortcuts === (undefined || null)) return
                config.shortcuts.forEach(({ path }: any) => openApp(path))
            }}>
            <FlashOnIcon />
        </IconButton>
        // <Button
        //     className={classes.button}
        //     variant="contained"
        //     color="secondary"
        //     onClick={() => {
        //         if (config.shortcuts === (undefined || null)) return
        //         config.shortcuts.forEach(({ path }: any) => openApp(path))
        //     }}>
        //     Run Profile
        // </Button>
    )
}

export default Run
