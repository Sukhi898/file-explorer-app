import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import styled from "styled-components";
import { Folder } from "@mui/icons-material";
import ContextMenu from "./ContextMenu";

const FolderItem = styled.div`
  display: flex;
  align-items: center;  Center vertically
  justify-content: space-between; 
  background: #444;
  padding: 10px;
  flex-direction: column;
  border-radius: 8px;
  color: #51aed9;
  cursor: pointer;
  font-size: 0.8rem;
  transition: transform 0.2s ease, background-color 0.2s ease;
  transform: ${(props) => props.style.transform};
  transition: ${(props) => props.style.transition};
  position: relative;

  &:hover {
    background-color: #333; 
  }
`;

const EditableInput = styled.input`
  background: transparent;
  border: none;
  color: white;
  outline: none;
  width: 100%;
  padding: 5px;
  text-align: center;
  font-size: 1rem;
`;

export default function SortableItem({
  id,
  name,
  editing,
  tempName,
  setTempName,
  handleRename,
  handleSaveRename,
  handleDelete,
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => setContextMenu(null);

  return (
    <>
      <FolderItem
        ref={setNodeRef}
        style={{ transform: CSS.Transform.toString(transform), transition }}
        {...attributes}
        {...listeners}
        onContextMenu={handleContextMenu}
      >
        <Folder style={{ fontSize: "40px", marginRight: "10px" }} />{" "}
        {editing ? (
          <EditableInput
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSaveRename()}
            onBlur={handleSaveRename}
            autoFocus
          />
        ) : (
          <span onDoubleClick={handleRename} style={{ color: "white" }}>
            {name}
          </span>
        )}
      </FolderItem>

      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onRename={() => {
            handleRename();
            closeContextMenu();
          }}
          onDelete={() => {
            handleDelete();
            closeContextMenu();
          }}
        />
      )}
    </>
  );
}
