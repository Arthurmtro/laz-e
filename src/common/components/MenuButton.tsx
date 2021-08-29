import React, { ReactElement, FC } from "react"

// Material UI
import { makeStyles, Box, Button } from "@material-ui/core"

interface MenuButtonProps {}

const useMenuButtonStyle = makeStyles((theme) => ({
    footerButton: {
        backgroundColor: theme.palette.common.white,
        position: "absolute",
        bottom: theme.spacing(5),
        zIndex: theme.spacing(2),
    },
}))

const MenuButton: React.FC<MenuButtonProps> = (): ReactElement => {
    const classes = useMenuButtonStyle()

    return <Button className={classes.footerButton} variant="contained" />
}

export default MenuButton
