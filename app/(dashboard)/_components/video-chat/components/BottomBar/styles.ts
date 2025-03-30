import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
    popoverHoverDark: {
        "&:hover": {
            backgroundColor: "#2B303499",
        },
    },

    menuItemDark: {
        "&:hover": {
            backgroundColor: "transparent",
        },
    },
    menuItemGutters: {
        padding: "6px 12px",
    },
});