import React, { useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { useCountdownTimer } from "use-countdown-timer";

import { IoMic } from "react-icons/io5";

const Record = ({ record, onStopped }) => {
  const [timer] = useState(30000);

  const { countdown, start, pause, isRunning } = useCountdownTimer({
    timer,
    onExpire: () => {
      pauseRecording();
      stopRecording();
    },
  });

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: false,
    onStop: (blobUrl, blob) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.addEventListener("loadend", function () {
        const base64FileData = reader.result.toString();
        const mediaFile = {
          size: blob.size,
          type: blob.type,
          src: base64FileData,
        };
        localStorage.setItem("record_" + record, JSON.stringify(mediaFile));
        onStopped(mediaFile);
      });
    },
  });

  return (
    <div className="record">
      <div>
        <button
          className={"button button-" + status}
          onClick={() => {
            if (!isRunning) {
              startRecording();
              start();
            } else {
              pause();
              pauseRecording();
              stopRecording();
            }
          }}
        >
          <IoMic />
        </button>
      </div>
      <div>{countdown / 1000}</div>
    </div>
  );
};

export default Record;
