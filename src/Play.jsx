import React, { useState, useEffect } from "react";
import { IoPlay } from "react-icons/io5";
import { IoPause } from "react-icons/io5";
import { IoTrashSharp } from "react-icons/io5";
import "./Delete.css";

const useAudio = (url, record, onDelete) => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

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

  return [playing, toggle, deleteRecording];
};

const Player = ({ url, record, onDelete }) => {
  const [playing, toggle, deleteRecording] = useAudio(url, record, onDelete);

  return (
    <div>
      <div>
        <button className="button" onClick={toggle}>
          {playing ? <IoPause /> : <IoPlay />}
        </button>
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
