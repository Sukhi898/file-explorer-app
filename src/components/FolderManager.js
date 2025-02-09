import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import SortableItem from "./SortableItem";
import styled from "styled-components";
import {
  createFolder,
  renameFolder,
  deleteFolder,
  reorderFolders,
  selectFilteredFolders,
} from "../Redux/folderSlice";
import { Folder } from "@mui/icons-material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #1e1e1e;
  padding: 20px;
  border-radius: 8px;
  font-size: 0.9rem;
  width: 100%;
`;

const FolderList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  flex-direction: ${(props) => (props.$view === "list" ? "column" : "row")};
`;

const NewFolderButton = styled.button`
  background: #007bff;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    background: #0056b3;
  }
`;

const FolderNameInput = styled.input`
  background: #333;
  border: 1px solid #555;
  color: white;
  padding: 8px;
  border-radius: 5px;
  width: 200px;
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

const FolderInputContainer = styled.div`
  display: flex;
  align-items: center;
`;

export default function FolderManager({
  selectedCategory,
  selectedSection,
  view,
}) {
  const dispatch = useDispatch();
  const section = selectedSection || "Favourites";

  const folders = useSelector((state) => selectFilteredFolders(state, section));

  const [editingId, setEditingId] = useState(null);
  const [tempName, setTempName] = useState("");
  const [creatingNewFolder, setCreatingNewFolder] = useState(false);

  const handleCreateFolder = () => {
    setCreatingNewFolder(true);
    setTempName("");

    if (folders.length >= 2) {
      const updatedFolders = [
        ...folders.slice(0, 2),
        { id: "new-folder-placeholder", name: "", isNew: true },
        ...folders.slice(2),
      ];
      dispatch(reorderFolders({ section, newFolders: updatedFolders }));
    } else {
      setCreatingNewFolder(true);
    }
  };

  const handleSaveNewFolder = () => {
    const folderName = tempName.trim() || "New Folder";

    if (section) {
      dispatch(createFolder({ section, name: folderName }));

      dispatch(
        reorderFolders({
          section,
          newFolders: folders.filter(
            (folder) => folder.id !== "new-folder-placeholder"
          ),
        })
      );

      setCreatingNewFolder(false);
    }
  };

  const handleRenameFolder = (id, name) => {
    setEditingId(id);
    setTempName(name);
  };

  const handleSaveRename = (id) => {
    const folderName = tempName.trim() || "New Folder";
    dispatch(renameFolder({ section, id, newName: folderName }));
    setEditingId(null);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = folders.findIndex((f) => f.id === active.id);
      const newIndex = folders.findIndex((f) => f.id === over.id);
      dispatch(reorderFolders({ section, oldIndex, newIndex }));
    }
  };

  return (
    <Container>
      <div>
        <NewFolderButton onClick={handleCreateFolder}>
          + New Folder
        </NewFolderButton>
      </div>

      {creatingNewFolder && (
        <FolderInputContainer>
          <Folder style={{ color: "#fff", marginRight: "10px" }} />
          <FolderNameInput
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
            onBlur={handleSaveNewFolder}
            onKeyDown={(e) => e.key === "Enter" && handleSaveNewFolder()}
            autoFocus
          />
        </FolderInputContainer>
      )}

      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={folders.map((folder) => folder.id)}>
          <FolderList $view={view}>
            {folders.map((folder, index) =>
              folder.isNew ? (
                <FolderInputContainer key="new-folder-placeholder">
                  <Folder style={{ color: "#fff", marginRight: "10px" }} />
                  <FolderNameInput
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={handleSaveNewFolder}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleSaveNewFolder()
                    }
                    autoFocus
                  />
                </FolderInputContainer>
              ) : (
                <SortableItem
                  key={folder.id}
                  id={folder.id}
                  name={folder.name}
                  editing={editingId === folder.id}
                  tempName={tempName}
                  setTempName={setTempName}
                  handleRename={() =>
                    handleRenameFolder(folder.id, folder.name)
                  }
                  handleSaveRename={() => handleSaveRename(folder.id)}
                  handleDelete={() =>
                    dispatch(deleteFolder({ section, id: folder.id }))
                  }
                />
              )
            )}
          </FolderList>
        </SortableContext>
      </DndContext>
    </Container>
  );
}
