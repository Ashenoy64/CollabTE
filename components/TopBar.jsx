"use client";
import { useState } from "react";
import { LoadFileViewer } from "./Modal";
import { SaveFileData, LoadFileData, SaveFile } from "../app/lib/firebase";


//Component renders with the editor, allows user to save and load file while editing 
export default function TopBar({
  root,
  filename,
  uid,
  editor,
  SetData,
  sessionID,
  NotifyHandler,
  isOnline,
}) {
  const [viewFile, setViewFile] = useState(false);

  const ToggleViewFile = () => {
    setViewFile(!viewFile);
  };

  const HandleSave = async (filename) => {
    await SaveFile(uid, filename);
    SaveFileData(editor.getJSON(), uid, filename)
      .then(() => {
        NotifyHandler("File Saved Successfully");
      })
      .catch((error) => {
        NotifyHandler("Unable to save the file");
      });
  };

  const HandleLoad = async (filename) => {
    LoadFileData(uid, filename)
      .then((docSnap) => {
        if (docSnap.exists()) {
          SetData(docSnap.data());
        }
        NotifyHandler("File Loaded Successfully");
      })
      .catch((error) => {
        NotifyHandler("Unable to load the file");
      });
    ToggleViewFile();
  };

  return (
    <div className="flex flex-row justify-between gap-3">
      {viewFile ? (
        <LoadFileViewer
          uid={uid}
          CloseHandler={ToggleViewFile}
          LoadHandler={HandleLoad}
        />
      ) : (
        ""
      )}
      <div className="flex  flex-row gap-3 justify-evenly ">
        <div className="p-2 border-2 rounded w-36 object-contain text-center">
          <span className="text-white">{filename}</span>
        </div>
        <button
          className=" p-2 w-14 bg-white text-black rounded"
          onClick={() => HandleSave(filename)}
        >
          Save
        </button>
        {root ? (
          <button
            className=" p-2 bg-white text-black rounded"
            onClick={() => {
              ToggleViewFile();
            }}
          >
            Load
          </button>
        ) : (
          ""
        )}
      </div>
      {isOnline == "true" ? (
          <button
            className="p-2 object-contain rounded  font-semibold text-sm bg-green-600"
            onClick={() => {
              navigator.clipboard.writeText(sessionID);
              NotifyHandler("Copied to Clipboard");
            }}
          >
            Share <span className="font-bold">RoomID</span>
          </button>
      ) : (
        ""
      )}
    </div>
  );
}
