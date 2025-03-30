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
import { useMeeting } from "@videosdk.live/react-sdk"; // Import useMeeting
import { OutlinedButton } from "../OutlinedButton";

// Import button components
import { RaiseHandBTN } from "../buttons/RaiseHandBTN";
import { MicBTN } from "../buttons/MicBTN";
import { WebcamBTN } from "../buttons/WebcamBTN";
import { ScreenShareBTN } from "../buttons/ScreenShareBTN";
import { LeaveBTN } from "../buttons/LeaveBTN";
import { ChatBTN } from "../buttons/ChatBTN";
import { ParticipantsBTN } from "../buttons/ParticipantsBTN";
import { MeetingIdCopyBTN } from "../buttons/MeetingIdCopyBTN";
import { RecordingBTN } from "../buttons/RecordingBTN";

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
      <LeaveBTN /> {/* LeaveBTN takes no props */}
      <MicBTN
        selectMicDeviceId={selectMicDeviceId}
        setSelectMicDeviceId={setSelectMicDeviceId}
        tollTipEl={tollTipEl}
        isMobile={isMobile}
        isTab={isTab}
      />
      <WebcamBTN
        selectWebcamDeviceId={selectWebcamDeviceId}
        setSelectWebcamDeviceId={setSelectWebcamDeviceId}
        tollTipEl={tollTipEl}
        isMobile={isMobile}
        isTab={isTab}
      />
      <RecordingBTN />
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
                  <RaiseHandBTN isMobile={isMobile} isTab={isTab} />
                ) : icon === BottomBarButtonTypes.SCREEN_SHARE ? (
                  <ScreenShareBTN isMobile={isMobile} isTab={isTab} />
                ) : icon === BottomBarButtonTypes.CHAT ? (
                  <ChatBTN
                    isMobile={isMobile}
                    isTab={isTab}
                    sideBarMode={sideBarMode}
                    setSideBarMode={setSideBarMode}
                    sideBarModes={sideBarModes}
                  />
                ) : icon === BottomBarButtonTypes.PARTICIPANTS ? (
                  <ParticipantsBTN
                    isMobile={isMobile}
                    isTab={isTab}
                    sideBarMode={sideBarMode}
                    setSideBarMode={setSideBarMode}
                    sideBarModes={sideBarModes}
                  />
                ) : icon === BottomBarButtonTypes.MEETING_ID_COPY ? (
                  <MeetingIdCopyBTN />
                ) : null}
              </Grid>
            );
          })}
        </Grid>
      </SwipeableDrawer>
    </div>
  ) : (
    <div className="md:flex lg:px-2 xl:px-6 pb-2 px-2 hidden">
      <MeetingIdCopyBTN />

      <div className="flex flex-1 items-center justify-center" ref={tollTipEl}>
        <MicBTN
          selectMicDeviceId={selectMicDeviceId}
          setSelectMicDeviceId={setSelectMicDeviceId}
          tollTipEl={tollTipEl}
          isMobile={isMobile}
          isTab={isTab}
        />
        <WebcamBTN
          selectWebcamDeviceId={selectWebcamDeviceId}
          setSelectWebcamDeviceId={setSelectWebcamDeviceId}
          tollTipEl={tollTipEl}
          isMobile={isMobile}
          isTab={isTab}
        />
        <ScreenShareBTN isMobile={isMobile} isTab={isTab} />
        <LeaveBTN /> {/* LeaveBTN takes no props */}
      </div>
      <div className="flex items-center justify-center">
        <ChatBTN
          isMobile={isMobile}
          isTab={isTab}
          sideBarMode={sideBarMode}
          setSideBarMode={setSideBarMode}
          sideBarModes={sideBarModes}
        />
        <ParticipantsBTN
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