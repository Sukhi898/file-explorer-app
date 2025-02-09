import React from "react";
import { useSelector } from "react-redux";
import { selectFilteredFolders } from "../Redux/folderSlice";
import SortableItem from "./SortableItem";

export default function FoldersList() {
  const filteredFolders = useSelector(selectFilteredFolders);

  return (
    <div>
      {filteredFolders.length > 0 ? (
        filteredFolders.map((folder) => (
          <SortableItem key={folder.id} id={folder.id} name={folder.name} />
        ))
      ) : (
        <p style={{ color: "white" }}>No folders found</p>
      )}
    </div>
  );
}
