import React, { useState, useEffect } from "react";
import { IoPlay } from "react-icons/io5";
import { IoPause } from "react-icons/io5";
import { IoTrashSharp } from "react-icons/io5";
import "./Delete.css";

const useAudio = (url, record, onDelete) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const playSound = () => {
    audio.play();
    setPlaying(!playing);
  };
  const pauseSound = () => {
    audio.pause();
    setPlaying(!playing);
  };

  const deleteRecording = () => {
    localStorage.removeItem(record);
    onDelete();
  };

  useEffect(() => {
    playing ? audio.play() : audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener("ended", () => setPlaying(false));
    return () => {
      audio.removeEventListener("ended", () => setPlaying(false));
    };
  }, []);

  return [playing, playSound, pauseSound, deleteRecording];
};

const Player = ({ url, record, onDelete }) => {
  const [playing, playSound, pauseSound, deleteRecording] = useAudio(
    url,
    record,
    onDelete
  );

  return (
    <div>
      <div>
        {playing && (
          <button className="button" onClick={pauseSound}>
            <IoPause />
          </button>
        )}
        {!playing && (
          <button className="button" onClick={playSound}>
            <IoPlay />
          </button>
        )}
      </div>
      <div className="delete">
        <button className="delete" onClick={deleteRecording}>
          <IoTrashSharp />
        </button>
      </div>
    </div>
  );
};

export default Player;
