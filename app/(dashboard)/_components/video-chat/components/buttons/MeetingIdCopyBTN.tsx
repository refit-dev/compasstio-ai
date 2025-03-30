import React, { useState } from "react";
import { useMeeting } from "@videosdk.live/react-sdk";
import { ClipboardIcon, CheckIcon } from "@heroicons/react/outline";

export const MeetingIdCopyBTN = () => {
    const mMeeting = useMeeting();
    const [isCopied, setIsCopied] = useState(false);

    return (
        <div className="flex items-center justify-center lg:ml-0 ml-4 mt-4 xl:mt-0">
            <div className="flex border-2 border-gray-850 p-2 rounded-md items-center justify-center">
                <h1 className="text-white text-base ">{mMeeting.meetingId}</h1>
                <button
                    className="ml-2"
                    onClick={() => {
                        navigator.clipboard.writeText(mMeeting.meetingId);
                        setIsCopied(true);
                        setTimeout(() => {
                            setIsCopied(false);
                        }, 3000);
                    }}
                >
                    {isCopied ? (
                        <CheckIcon className="h-5 w-5 text-green-400" />
                    ) : (
                        <ClipboardIcon className="h-5 w-5 text-white" />
                    )}
                </button>
            </div>
        </div>
    );
};