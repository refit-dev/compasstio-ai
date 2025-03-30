import React from "react";
import { OutlinedButton } from "../OutlinedButton";
import EndIcon from "../../icons/Bottombar/EndIcon";
import { useMeeting } from "@videosdk.live/react-sdk";

// Remove setIsMeetingLeft from props as the component calls leave() directly
// interface LeaveBTNProps {
//     setIsMeetingLeft: (left: boolean) => void;
// }

// export const LeaveBTN = ({ setIsMeetingLeft }: LeaveBTNProps) => {
export const LeaveBTN = () => { // No props needed now
    const mMeeting = useMeeting();

    // Ensure leave function is available
    const handleLeave = () => {
        if (mMeeting && mMeeting.leave) {
            mMeeting.leave();
            // setIsMeetingLeft(true); // Removed: State handled by SDK context
        } else {
            console.error("Leave function not available from useMeeting hook");
        }
    };

    return (
        <OutlinedButton
            Icon={EndIcon}
            bgColor="bg-red-150"
            onClick={handleLeave} // Call the leave handler
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