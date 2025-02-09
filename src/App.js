import React, { useState } from "react";
import styled from "styled-components";
import FolderManager from "./components/FolderManager";
import Toolbar from "./components/Toolbar";
import Sidebar from "./components/Sidebar";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  color: white;
`;

const Content = styled.div`
  flex: 1;
  background: #1e1e1e;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function App() {
  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("Favourites");
  const [selectedSection, setSelectedSection] = useState("AirDrop");
  return (
    <AppContainer>
      <Sidebar
        onSelectCategory={setSelectedCategory}
        onSelectSection={setSelectedSection}
      />
      <Content>
        <Toolbar
          setView={setView}
          sectionName={selectedSection}
          setSelectedSection={setSelectedSection}
        />
        <FolderManager
          selectedCategory={selectedCategory}
          selectedSection={selectedSection}
          view={view}
        />
      </Content>
    </AppContainer>
  );
}
