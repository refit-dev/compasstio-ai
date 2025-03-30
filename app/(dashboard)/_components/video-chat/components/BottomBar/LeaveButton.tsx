import React from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { OutlinedButton } from "../OutlinedButton";
import EndIcon from "../../icons/Bottombar/EndIcon";

export const LeaveButton: React.FC = () => {
    const mMeeting = useMeeting();

    return (
        <OutlinedButton
            Icon={EndIcon}
            bgColor="bg-red-150"
            onClick={() => {
                mMeeting.leave();
            }}
            tooltip="Leave Meeting"
            isFocused={false}
            badge={""}
            lottieOption={null}
            disabledOpacity={1}
            renderRightComponent={() => null}
            disabled={false}
            large={false}
            btnID={"LeaveBTN"}
            color={""}
            focusIconColor={"black"}
            isRequestProcessing={false}
            borderColor={""}
        />
    );
};

export default LeaveButton;