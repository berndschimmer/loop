import React, { useEffect, useState } from "react";
import Record from "./Record";
import Play from "./Play";
import "./Button.css";

const RecordView = (props) => {
  const [record, setRecord] = useState([]);

  useEffect(() => {
    const record = JSON.parse(localStorage.getItem("record_" + props.record));
    if (record) {
      setRecord(record);
    }
  }, []);
  const changeHandler = (freshRecorded) => {
    setRecord(freshRecorded);
  };
  const deleteHandler = () => {
    setRecord([]);
  };

  return (
    <div>
      {record.size && (
        <Play
          url={record.src}
          record={"record_" + props.record}
          onDelete={deleteHandler}
        ></Play>
      )}

      {!record.size && (
        <Record record={props.record} onStopped={changeHandler} />
      )}
    </div>
  );
};
export default RecordView;
