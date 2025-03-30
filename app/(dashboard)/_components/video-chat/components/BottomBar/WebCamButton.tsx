import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { OutlinedButton } from "../OutlinedButton";
import WebcamOnIcon from "../../icons/Bottombar/WebcamOnIcon";
import WebcamOffIcon from "../../icons/Bottombar/WebcamOffIcon";
import { IconButton, Tooltip, Popover, MenuList, MenuItem, makeStyles, useTheme } from "@material-ui/core";
import { ArrowDropDown as ArrowDropDownIcon } from "@material-ui/icons";

interface WebCamButtonProps {
    selectWebcamDeviceId: string | null;
    setSelectWebcamDeviceId: (id: string | null) => void;
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
    menuItemGutters: {
        padding: "6px 12px",
    },
});

export const WebCamButton: React.FC<WebCamButtonProps> = ({
    selectWebcamDeviceId,
    setSelectWebcamDeviceId,
    tollTipEl,
    isMobile,
    isTab
}) => {
    const mMeeting = useMeeting();
    const [webcams, setWebcams] = useState<{ deviceId: string; label: string }[]>([]);
    const [webcamDownArrow, setDownArrowWebCam] = useState<null | HTMLElement>(null);
    const localWebcamOn = mMeeting?.localWebcamOn ?? false;
    const changeWebcam = mMeeting?.changeWebcam ?? (() => { });
    const classes = useStyles();
    const theme = useTheme();

    const getWebcams = async (mGetWebcams: () => Promise<{ deviceId: string; label: string }[]>) => {
        const webcams = await mGetWebcams();
        webcams && webcams?.length && setWebcams(webcams);
    };

    const handleClickWebCam = (event: React.MouseEvent<HTMLElement>) => {
        setDownArrowWebCam(event.currentTarget);
    };

    const handleCloseWebCam = () => {
        setDownArrowWebCam(null);
    };

    return (
        <>
            <OutlinedButton
                Icon={localWebcamOn ? WebcamOnIcon : WebcamOffIcon}
                onClick={() => {
                    mMeeting?.toggleWebcam?.();
                }}
                bgColor={localWebcamOn ? "bg-gray-750" : "bg-white"}
                borderColor={localWebcamOn ? "#ffffff33" : undefined}
                isFocused={localWebcamOn}
                focusIconColor={localWebcamOn ? "white" : undefined}
                tooltip={"Toggle Webcam"}
                renderRightComponent={() => {
                    return (
                        <Tooltip placement="bottom" title={"Change webcam"}>
                            <IconButton
                                onClick={(e) => {
                                    mMeeting?.getWebcams && getWebcams(mMeeting.getWebcams);
                                    handleClickWebCam(e);
                                }}
                                size={"small"}
                            >
                                <ArrowDropDownIcon
                                    fontSize={"small"}
                                    style={{
                                        color: localWebcamOn ? "white" : "black",
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    );
                }}
                badge={""}
                lottieOption={null}
                disabledOpacity={1}
                disabled={false}
                large={false}
                btnID={"WebCamBTN"}
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
                open={Boolean(webcamDownArrow)}
                onClose={handleCloseWebCam}
            >
                <MenuList
                    style={{
                        backgroundColor: theme.palette.darkTheme.slightLighter,
                        color: theme.palette.common.white,
                    }}
                >
                    {webcams.map(({ deviceId, label }, index) => (
                        <MenuItem
                            key={`output_webcams_${deviceId}`}
                            selected={deviceId === selectWebcamDeviceId}
                            onClick={() => {
                                handleCloseWebCam();
                                setSelectWebcamDeviceId(deviceId);
                                changeWebcam(deviceId);
                            }}
                            classes={{
                                root: classes.popoverHoverDark,
                            }}
                        >
                            {label || `Webcam ${index + 1}`}
                        </MenuItem>
                    ))}
                </MenuList>
            </Popover>
        </>
    );
};

export default WebCamButton;
