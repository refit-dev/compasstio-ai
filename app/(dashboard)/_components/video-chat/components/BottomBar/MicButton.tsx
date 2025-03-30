import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { IconButton, Tooltip, Popover, Box, Typography, MenuList, MenuItem, makeStyles, useTheme } from "@material-ui/core";
import { ArrowDropDown as ArrowDropDownIcon } from "@material-ui/icons";
import MicOnIcon from "../../icons/Bottombar/MicOnIcon";
import MicOffIcon from "../../icons/Bottombar/MicOffIcon";
import { OutlinedButton } from "../OutlinedButton";

interface MicButtonProps {
    selectMicDeviceId: string | null;
    setSelectMicDeviceId: (id: string | null) => void;
    tollTipEl: React.RefObject<HTMLDivElement>;
    isMobile: boolean;
    isTab: boolean;
}

const useStyles = makeStyles({
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

interface SingleMicMenuProps {
    micArr: { deviceId: string; label: string }[];
    label: string;
    classes: any;
    changeMic: (deviceId: string) => void;
    handleClose: () => void;
    selectMicDeviceId: string | null;
    setSelectMicDeviceId: (id: string | null) => void;
}

const SingleMicMenu: React.FC<SingleMicMenuProps> = ({
    micArr,
    label,
    classes,
    changeMic,
    handleClose,
    selectMicDeviceId,
    setSelectMicDeviceId,
}) => {
    const theme = useTheme();

    return (
        <Box>
            <Box
                style={{
                    display: "flex",
                    alignItems: "center",
                    padding: 12,
                    paddingBottom: 0,
                }}
            >
                <Typography
                    style={{
                        marginLeft: 12,
                        fontSize: 14,
                        color: theme.palette.darkTheme.contrastText,
                    }}
                >
                    {label}
                </Typography>
            </Box>
            <MenuList
                style={{
                    backgroundColor: theme.palette.darkTheme.slightLighter,
                    color: theme.palette.common.white,
                }}
            >
                {micArr.map(({ deviceId, label }, index) => (
                    <Box
                        key={`mic_${index}`}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            paddingLeft: 12,
                            paddingRight: 12,
                            backgroundColor: deviceId === selectMicDeviceId ? "#3F4046" : undefined,
                        }}
                        className={classes.popoverHoverDark}
                    >
                        {deviceId === selectMicDeviceId && (
                            <Box
                                style={{
                                    width: 15,
                                    height: 15,
                                    borderRadius: "50%",
                                    backgroundColor: "green",
                                    marginRight: 8,
                                }}
                            />
                        )}
                        <MenuItem
                            disableRipple
                            style={{
                                display: "flex",
                                flex: 1,
                                backgroundColor: deviceId === selectMicDeviceId ? "#3F4046" : undefined,
                            }}
                            key={`mics_${deviceId}`}
                            selected={deviceId === selectMicDeviceId}
                            onClick={() => {
                                handleClose();
                                setSelectMicDeviceId(deviceId);
                                changeMic(deviceId);
                            }}
                            classes={{
                                root: classes.menuItemDark,
                                gutters: classes.menuItemGutters,
                            }}
                        >
                            {label || `Mic ${index + 1}`}
                        </MenuItem>
                    </Box>
                ))}
            </MenuList>
        </Box>
    );
};

export const MicButton: React.FC<MicButtonProps> = ({
    selectMicDeviceId,
    setSelectMicDeviceId,
    tollTipEl,
    isMobile,
    isTab,
}) => {
    const mMeeting = useMeeting();
    const [mics, setMics] = useState<{ deviceId: string; label: string }[]>([]);
    const [downArrow, setDownArrow] = useState<null | HTMLElement>(null);
    const localMicOn = mMeeting?.localMicOn ?? false;
    const changeMic = mMeeting?.changeMic ?? (() => { });
    const classes = useStyles();
    const theme = useTheme();

    const getMics = async (mGetMics: () => Promise<{ deviceId: string; label: string }[]>) => {
        if (!mGetMics) return;
        const mics = await mGetMics();
        mics && mics?.length && setMics(mics);
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setDownArrow(event.currentTarget);
    };

    const handleClose = () => {
        setDownArrow(null);
    };

    return (
        <>
            <OutlinedButton
                Icon={localMicOn ? MicOnIcon : MicOffIcon}
                onClick={() => mMeeting?.toggleMic?.()}
                bgColor={localMicOn ? "bg-gray-750" : "bg-white"}
                borderColor={localMicOn ? "#ffffff33" : undefined}
                isFocused={localMicOn}
                focusIconColor={localMicOn ? "white" : undefined}
                tooltip={"Toggle Mic"}
                renderRightComponent={() => (
                    <Tooltip placement="bottom" title="Change microphone">
                        <IconButton
                            onClick={(e) => {
                                getMics(mMeeting?.getMics);
                                handleClick(e);
                            }}
                            size="small"
                        >
                            <ArrowDropDownIcon
                                fontSize="small"
                                style={{ color: localMicOn ? "white" : "black" }}
                            />
                        </IconButton>
                    </Tooltip>
                )}
                badge={""}
                lottieOption={null}
                disabledOpacity={1}
                disabled={false}
                large={false}
                btnID={"MicBTN"}
                color={""}
                isRequestProcessing={false}
            />
            <Popover
                container={tollTipEl.current}
                anchorOrigin={{
                    vertical: isMobile || isTab ? "bottom" : "top",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: isMobile || isTab ? "top" : "bottom",
                    horizontal: "center",
                }}
                anchorEl={tollTipEl.current}
                open={Boolean(downArrow)}
                onClose={handleClose}
            >
                <Box
                    style={{
                        backgroundColor: theme.palette.darkTheme.slightLighter,
                    }}
                >
                    <SingleMicMenu
                        micArr={mics}
                        label={"MICROPHONE"}
                        changeMic={changeMic}
                        classes={classes}
                        handleClose={handleClose}
                        selectMicDeviceId={selectMicDeviceId}
                        setSelectMicDeviceId={setSelectMicDeviceId}
                    />
                </Box>
            </Popover>
        </>
    );
};

export default MicButton;
