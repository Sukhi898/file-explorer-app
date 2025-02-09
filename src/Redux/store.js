import { configureStore } from "@reduxjs/toolkit";
import folderReducer from "./folderSlice";

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("foldersState");
    if (!serializedState) return undefined;
    const folders = JSON.parse(serializedState);

    Object.keys(folders).forEach((section) => {
      if (Array.isArray(folders[section])) {
        folders[section].forEach((folder) => {
          folder.color = folder.color || "#51aed9";
        });
      } else if (typeof folders[section] === "object") {
        Object.keys(folders[section]).forEach((key) => {
          folders[section][key].forEach((folder) => {
            folder.color = folder.color || "#51aed9";
          });
        });
      }
    });

    return { folders };
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("foldersState", JSON.stringify(state.folders));
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const store = configureStore({
  reducer: {
    folders: folderReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
