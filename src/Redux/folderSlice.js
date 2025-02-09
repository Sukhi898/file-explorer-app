import { createSlice } from "@reduxjs/toolkit";
import { arrayMove } from "@dnd-kit/sortable";
import { createSelector } from "reselect";

const initialState = {
  Favourites: [],
  Locations: {
    iCloudDrive: [],
  },
  Tags: {
    Red: [],
    Blue: [],
    Green: [],
  },
  searchQuery: "",
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    createFolder: (state, action) => {
      const { section, name } = action.payload;

      if (!state[section]) {
        state[section] = [];
      }

      if (Array.isArray(state[section])) {
        state[section].push({ id: Date.now().toString(), name });
      } else if (typeof state[section] === "object") {
        Object.keys(state[section]).forEach((key) => {
          if (Array.isArray(state[section][key])) {
            state[section][key].push({ id: Date.now().toString(), name });
          }
        });
      }
    },

    renameFolder: (state, action) => {
      const { section, id, newName } = action.payload;
      if (Array.isArray(state[section])) {
        const folder = state[section].find((f) => f.id === id);
        if (folder) folder.name = newName;
      } else if (typeof state[section] === "object") {
        Object.keys(state[section]).forEach((key) => {
          const folder = state[section][key]?.find((f) => f.id === id);
          if (folder) folder.name = newName;
        });
      }
    },

    deleteFolder: (state, action) => {
      const { section, id } = action.payload;
      if (Array.isArray(state[section])) {
        state[section] = state[section].filter((f) => f.id !== id);
      } else if (typeof state[section] === "object") {
        Object.keys(state[section]).forEach((key) => {
          state[section][key] = state[section][key]?.filter((f) => f.id !== id);
        });
      }
    },

    reorderFolders: (state, action) => {
      const { section, key, oldIndex, newIndex } = action.payload;
      if (state[section]?.[key]) {
        state[section][key] = arrayMove(
          state[section][key],
          oldIndex,
          newIndex
        );
      }
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
});

export const selectFilteredFolders = createSelector(
  [(state) => state.folders, (_, section) => section],
  (folders, section) => {
    const searchQuery = folders.searchQuery.toLowerCase();
    const sectionData = folders[section] || {};

    if (Array.isArray(sectionData)) {
      return sectionData.filter((folder) =>
        folder.name.toLowerCase().includes(searchQuery)
      );
    }

    return Object.keys(sectionData).reduce((result, key) => {
      if (Array.isArray(sectionData[key])) {
        result.push(
          ...sectionData[key].filter((folder) =>
            folder.name.toLowerCase().includes(searchQuery)
          )
        );
      }
      return result;
    }, []);
  }
);

export const {
  createFolder,
  renameFolder,
  deleteFolder,
  reorderFolders,
  setSearchQuery,
} = folderSlice.actions;

export default folderSlice.reducer;
