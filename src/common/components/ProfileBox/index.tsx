import { FC } from "react"

// Material ui
import { makeStyles, Box, Typography, Card, alpha, Grid, Badge, Theme } from "@material-ui/core"
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile"

// utils
import { IProfile, IShortcut } from "../../../type/profile"
import Edit from "./Edit"
import Delete from "./Delete"
import Run from "./Run"

interface styleProps {
    selectMode: boolean
}

const useProfileBoxStyle = makeStyles<Theme, styleProps>((theme: Theme) => ({
    badge: {
        display: "block",

        "& .MuiBadge-badge": {
            marginTop: theme.spacing(-4),
            marginRight: theme.spacing(-4),
            backgroundColor: "transparent",
        },
    },
    root: ({ selectMode }) => ({
        backgroundColor: alpha(theme.palette.secondary.main, 0.3),
        padding: theme.spacing(2),
        minHeight: theme.spacing(35),
        maxHeight: theme.spacing(35),
        minWidth: theme.spacing(35),
        boxShadow: theme.shadows[13],
        borderRadius: "20px",
        filter: selectMode ? "brightness(65%) blur(1px)" : "",
        webkitFilter: selectMode ? "brightness(50%)" : "",
        mozFilter: selectMode ? "brightness(50%)" : "",
        oFilter: selectMode ? "brightness(50%)" : "",
        msFilter: selectMode ? "brightness(50%)" : "",

        "&:hover": {
            boxShadow: theme.shadows[10],
        },
    }),
    actionBtn: {
        backgroundColor: theme.palette.secondary.light,
    },
    gridIcons: {
        padding: theme.spacing(2, 3, 5, 3),
        overflow: "hidden",
        maxHeight: theme.spacing(20),
        height: theme.spacing(20),
        webkitTouchCallout: "none",
        webkitUserSelect: "none",
        khtmlUserSelect: "none",
        mozUserSelect: "none",
        msUserSelect: "none",
        userSelect: "none",

        "& .MuiSvgIcon-root": {
            height: "32px",
            width: "32px",
        },
    },
    title: {
        fontWeight: theme.typography.fontWeightBold,
        fontSize: theme.typography.h2.fontSize,
    },
    actionButtons: {
        width: theme.spacing(8),

        "& .MuiIconButton-label": {
            color: theme.palette.secondary.light,
        },
    },
    shape: {
        border: `1px solid ${theme.palette.common.white}`,
        backgroundColor: theme.palette.primary.light,
        width: 40,
        height: 40,
    },
    shapeCircle: {
        borderRadius: "50%",
    },
}))

interface IProfileBox {
    id: number
    config: IProfile
    setConfigs: any
    selectMode: boolean
}

const ProfileBox: FC<IProfileBox> = ({ id, config, setConfigs, selectMode }) => {
    const classes = useProfileBoxStyle({ selectMode })

    return (
        <Badge
            className={classes.badge}
            color="secondary"
            overlap="circular"
            badgeContent={selectMode ? <div className={`${classes.shape} ${classes.shapeCircle}`} /> : ""}>
            <Card className={classes.root}>
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <Typography className={classes.title}>{config?.title}</Typography>

                        <Grid container spacing={2} className={classes.gridIcons}>
                            {config.shortcuts.map((shortcut: IShortcut, idx: number) => (
                                <Grid key={idx} item>
                                    <Box display="flex" alignItems="center">
                                        {shortcut.icon ? <img src={shortcut.icon} alt={shortcut.title} /> : <InsertDriveFileIcon />}
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                    <Box display="flex" flexDirection="column" className={classes.actionButtons}>
                        <Edit id={id} config={config} setConfigs={setConfigs} />
                        <Box my={0.3} />
                        <Delete id={id} config={config} setConfigs={setConfigs} />
                        <Box my={0.3} />
                        <Run config={config} />
                    </Box>
                </Box>
            </Card>
        </Badge>
    )
}

export default ProfileBox
