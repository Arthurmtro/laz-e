import React, { ReactElement, FC } from "react"

// Material UI
import { makeStyles, Box, Typography } from "@material-ui/core"

interface ContainerProps {}

const useContainerStyle = makeStyles((theme) => ({}))

const Container: React.FC<ContainerProps> = (): ReactElement => {
    const classes = useContainerStyle()

    return (
        <Box>
            <Typography></Typography>
        </Box>
    )
}

export default Container
