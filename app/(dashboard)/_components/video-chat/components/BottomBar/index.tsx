import React, { useMemo, useRef, useState } from "react";
import { sideBarModes } from "../MeetingContainer/MeetingContainer";
import {
  Grid,
  SwipeableDrawer,
  makeStyles,
} from "@material-ui/core";
import { MoreHoriz as MoreHorizIcon } from "@material-ui/icons";
import useIsTab from "@/utils/useIsTab";
import useIsMobile from "@/utils/useIsMobile";
import { useMeeting } from "@videosdk.live/react-sdk";
import { OutlinedButton } from "../OutlinedButton";

// Import button components from local directory
import { RaiseHandButton } from "./RaiseHandButton";
import { MicButton } from "./MicButton";
import { WebCamButton } from "./WebCamButton";
import { ScreenShareButton } from "./ScreenShareButton";
import { LeaveButton } from "./LeaveButton";
import { ChatButton } from "./ChatButton";
import { ParticipantsButton } from "./ParticipantsButton";
import { MeetingIdCopyButton } from "./MeetingIdCopyButton";
import { RecordingButton } from "./RecordingButton";

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

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    darkTheme: {
      contrastText: string;
      slightLighter: string;
    };
  }
}

interface BottomBarProps {
  bottomBarHeight: number;
  sideBarMode: string | null;
  setSideBarMode: (mode: string | null | ((prevMode: string | null) => string | null)) => void;
  // setIsMeetingLeft is removed
  selectWebcamDeviceId: string | null;
  setSelectWebcamDeviceId: (id: string | null) => void;
  selectMicDeviceId: string | null;
  setSelectMicDeviceId: (id: string | null) => void;
  controlsVisible: boolean;
}

export function BottomBar({
  bottomBarHeight,
  sideBarMode,
  setSideBarMode,
  // setIsMeetingLeft is removed
  selectWebcamDeviceId,
  setSelectWebcamDeviceId,
  selectMicDeviceId,
  setSelectMicDeviceId,
  controlsVisible,
}: BottomBarProps) {
  const tollTipEl = useRef<HTMLDivElement>(null);
  const { leave } = useMeeting(); // Get leave function

  const isMobile = useIsMobile();
  const isTab = useIsTab();

  const [open, setOpen] = useState(false);

  const handleClickFAB = () => {
    setOpen(true);
  };

  const handleCloseFAB = () => {
    setOpen(false);
  };

  const BottomBarButtonTypes = useMemo(
    () => ({
      END_CALL: "END_CALL",
      CHAT: "CHAT",
      PARTICIPANTS: "PARTICIPANTS",
      SCREEN_SHARE: "SCREEN_SHARE",
      WEBCAM: "WEBCAM",
      MIC: "MIC",
      RAISE_HAND: "RAISE_HAND",
      RECORDING: "RECORDING",
      MEETING_ID_COPY: "MEETING_ID_COPY",
    }),
    []
  );

  const otherFeatures = [
    { icon: BottomBarButtonTypes.RAISE_HAND },
    { icon: BottomBarButtonTypes.SCREEN_SHARE },
    { icon: BottomBarButtonTypes.CHAT },
    { icon: BottomBarButtonTypes.PARTICIPANTS },
    { icon: BottomBarButtonTypes.MEETING_ID_COPY },
  ];

  return isMobile || isTab ? (
    <div
      className="flex items-center justify-center"
      style={{ height: bottomBarHeight }}
    >
      <LeaveButton />
      <MicButton
        selectMicDeviceId={selectMicDeviceId}
        setSelectMicDeviceId={setSelectMicDeviceId}
        tollTipEl={tollTipEl}
        isMobile={isMobile}
        isTab={isTab}
      />
      <WebCamButton
        selectWebcamDeviceId={selectWebcamDeviceId}
        setSelectWebcamDeviceId={setSelectWebcamDeviceId}
        tollTipEl={tollTipEl}
        isMobile={isMobile}
        isTab={isTab}
      />
      <RecordingButton />
      <OutlinedButton
        Icon={MoreHorizIcon}
        onClick={handleClickFAB}
        isFocused={false}
        tooltip={""}
        badge={""}
        lottieOption={null}
        disabledOpacity={1}
        renderRightComponent={() => null}
        disabled={false}
        large={false}
        btnID={"MoreOptionsBTN"}
        color={""}
        focusIconColor={"black"}
        isRequestProcessing={false}
        borderColor={""}
        bgColor={"transparent"}
      />
      <SwipeableDrawer
        anchor={"bottom"}
        open={Boolean(open)}
        onClose={handleCloseFAB}
        onOpen={handleClickFAB}
        style={{ paddingBottom: "100px" }}
      >
        <Grid container className="bg-gray-800 py-6">
          {otherFeatures.map(({ icon }, index) => {
            return (
              <Grid
                key={`icon_${index}`}
                className="flex items-center justify-center"
                item
                xs={icon === BottomBarButtonTypes.MEETING_ID_COPY ? 7 : 4}
                sm={icon === BottomBarButtonTypes.MEETING_ID_COPY ? 5 : 3}
                md={icon === BottomBarButtonTypes.MEETING_ID_COPY ? 3 : 2}
              >
                {icon === BottomBarButtonTypes.RAISE_HAND ? (
                  <RaiseHandButton isMobile={isMobile} isTab={isTab} />
                ) : icon === BottomBarButtonTypes.SCREEN_SHARE ? (
                  <ScreenShareButton isMobile={isMobile} isTab={isTab} />
                ) : icon === BottomBarButtonTypes.CHAT ? (
                  <ChatButton
                    isMobile={isMobile}
                    isTab={isTab}
                    sideBarMode={sideBarMode}
                    setSideBarMode={setSideBarMode}
                    sideBarModes={sideBarModes}
                  />
                ) : icon === BottomBarButtonTypes.PARTICIPANTS ? (
                  <ParticipantsButton
                    isMobile={isMobile}
                    isTab={isTab}
                    sideBarMode={sideBarMode}
                    setSideBarMode={setSideBarMode}
                    sideBarModes={sideBarModes}
                  />
                ) : icon === BottomBarButtonTypes.MEETING_ID_COPY ? (
                  <MeetingIdCopyButton />
                ) : null}
              </Grid>
            );
          })}
        </Grid>
      </SwipeableDrawer>
    </div>
  ) : (
    <div className="md:flex lg:px-2 xl:px-6 pb-2 px-2 hidden">
      <MeetingIdCopyButton />

      <div className="flex flex-1 items-center justify-center" ref={tollTipEl}>
        <MicButton
          selectMicDeviceId={selectMicDeviceId}
          setSelectMicDeviceId={setSelectMicDeviceId}
          tollTipEl={tollTipEl}
          isMobile={isMobile}
          isTab={isTab}
        />
        <WebCamButton
          selectWebcamDeviceId={selectWebcamDeviceId}
          setSelectWebcamDeviceId={setSelectWebcamDeviceId}
          tollTipEl={tollTipEl}
          isMobile={isMobile}
          isTab={isTab}
        />
        <ScreenShareButton isMobile={isMobile} isTab={isTab} />
        <LeaveButton />
      </div>
      <div className="flex items-center justify-center">
        <ChatButton
          isMobile={isMobile}
          isTab={isTab}
          sideBarMode={sideBarMode}
          setSideBarMode={setSideBarMode}
          sideBarModes={sideBarModes}
        />
        <ParticipantsButton
          isMobile={isMobile}
          isTab={isTab}
          sideBarMode={sideBarMode}
          setSideBarMode={setSideBarMode}
          sideBarModes={sideBarModes}
        />
      </div>
    </div>
  );
}

export default BottomBar;