import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { OutlinedButton } from "../OutlinedButton";
import MicOnIcon from "../../icons/Bottombar/MicOnIcon";
import MicOffIcon from "../../icons/Bottombar/MicOffIcon";
import { IconButton, Tooltip, Popover, Box, Typography, MenuList, MenuItem, makeStyles, useTheme } from "@material-ui/core";
import { ArrowDropDown as ArrowDropDownIcon } from "@material-ui/icons";

interface MediaDevice {
    deviceId: string;
    label: string;
}

interface SingleMicMenuProps {
    micArr: MediaDevice[];
    label: string;
    classes: Record<string, string>;
    changeMic: (deviceId: string) => void;
    handleClose: () => void;
    selectMicDeviceId: string | null;
    setSelectMicDeviceId: (id: string | null) => void;
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

const SingleMicMenu = ({
    micArr,
    label,
    classes,
    changeMic,
    handleClose,
    selectMicDeviceId,
    setSelectMicDeviceId
}: SingleMicMenuProps) => {
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
                        color: theme.palette.darkTheme?.contrastText,
                    }}
                >
                    {label}
                </Typography>
            </Box>
            <MenuList
                style={{
                    backgroundColor: theme.palette.darkTheme?.slightLighter,
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

interface MicMenuProps {
    localMicOn: boolean;
    downArrow: Element | null;
    mics: MediaDevice[];
    classes: Record<string, string>;
    handleClose: () => void;
    tollTipEl: React.RefObject<HTMLDivElement>;
    changeMic: (deviceId: string) => void;
    selectMicDeviceId: string | null;
    setSelectMicDeviceId: (id: string | null) => void;
    isMobile: boolean;
    isTab: boolean;
}

const MicMenu = ({
    localMicOn,
    downArrow,
    mics,
    classes,
    handleClose,
    tollTipEl,
    changeMic,
    selectMicDeviceId,
    setSelectMicDeviceId,
    isMobile,
    isTab
}: MicMenuProps) => {
    const theme = useTheme();

    return (
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
            anchorEl={downArrow}
            open={Boolean(downArrow)}
            onClose={handleClose}
        >
            <Box
                style={{
                    backgroundColor: theme.palette.darkTheme?.slightLighter,
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
    );
};

interface MicBTNProps {
    selectMicDeviceId: string | null;
    setSelectMicDeviceId: (id: string | null) => void;
    tollTipEl: React.RefObject<HTMLDivElement>;
    isMobile: boolean;
    isTab: boolean;
}

export const MicBTN = ({
    selectMicDeviceId,
    setSelectMicDeviceId,
    tollTipEl,
    isMobile,
    isTab
}: MicBTNProps) => {
    const mMeeting = useMeeting();
    const [mics, setMics] = useState<MediaDevice[]>([]);
    const [downArrow, setDownArrow] = useState<Element | null>(null);
    const localMicOn = mMeeting?.localMicOn;
    const changeMic = mMeeting?.changeMic;
    const classes = useStyles();

    const getMics = async (mGetMics: () => Promise<MediaDevice[] | undefined>) => {
        const micsData = await mGetMics();
        micsData && micsData?.length && setMics(micsData);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setDownArrow(event.currentTarget);
    };

    const handleClose = () => {
        setDownArrow(null);
    };

    return (
        <>
            <OutlinedButton
                Icon={localMicOn ? MicOnIcon : MicOffIcon}
                onClick={() => mMeeting.toggleMic()}
                bgColor={localMicOn ? "bg-gray-750" : "bg-white"}
                borderColor={localMicOn ? "#ffffff33" : undefined}
                isFocused={!localMicOn}
                focusIconColor={localMicOn ? "white" : undefined}
                tooltip={localMicOn ? "Turn off mic" : "Turn on mic"}
                renderRightComponent={() => (
                    <Tooltip placement="bottom" title="Change microphone">
                        <IconButton
                            onClick={(e) => {
                                getMics(mMeeting.getMics);
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
            <MicMenu
                localMicOn={mMeeting.localMicOn}
                downArrow={downArrow}
                tollTipEl={tollTipEl}
                changeMic={changeMic}
                mics={mics}
                classes={classes}
                handleClose={handleClose}
                selectMicDeviceId={selectMicDeviceId}
                setSelectMicDeviceId={setSelectMicDeviceId}
                isMobile={isMobile}
                isTab={isTab}
            />
        </>
    );
};