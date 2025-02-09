import React from "react";
import styled from "styled-components";
import AppsIcon from "@mui/icons-material/Apps";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchBar from "./SearchBar";

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CalendarViewWeekIcon from "@mui/icons-material/CalendarViewWeek";
import LaptopWindowsIcon from "@mui/icons-material/LaptopWindows";
import IosShareIcon from "@mui/icons-material/IosShare";
import SellIcon from "@mui/icons-material/Sell";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernet";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ToolbarContainer = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: grey;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: #aaa;
  cursor: pointer;
  padding: 5px;

  &:hover {
    color: white;
    transform: scale(0.9);
  }
`;

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  color: white;
  gap: 10px;

  @media (max-width: 480px) {
    gap: 5px;
    font-size: 14px;
  }
`;

const ArrowButton = styled.div`
  cursor: pointer;
  font-size: 24px;
  color: #aaa;
  transition: transform 0.3s ease;

  &:hover {
    color: white;
    transform: scale(0.9);
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const IconGroup = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;

  & > * {
    color: #aaa;
    transition: color 0.3s, transform 0.3s;

    &:hover {
      color: white;
      transform: scale(0.9);
    }
  }

  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const sections = [
  "AirDrop",
  "Recents",
  "Applications",
  "Desktop",
  "Documents",
  "Downloads",
  "iCloud Drive",
];

export default function Toolbar({ setView, sectionName, setSelectedSection }) {
  const handleBackClick = () => {
    const currentIndex = sections.indexOf(sectionName);
    if (currentIndex > 0) {
      setSelectedSection(sections[currentIndex - 1]);
    }
  };

  const handleForwardClick = () => {
    const currentIndex = sections.indexOf(sectionName);
    if (currentIndex < sections.length - 1) {
      setSelectedSection(sections[currentIndex + 1]);
    }
  };

  return (
    <ToolbarContainer>
      <ArrowContainer>
        <ArrowButton onClick={handleBackClick}>
          <IoIosArrowBack />
        </ArrowButton>
        <ArrowButton onClick={handleForwardClick}>
          <IoIosArrowForward />
        </ArrowButton>
        <p style={{ color: "white", margin: 0 }}>{sectionName}</p>
      </ArrowContainer>

      <FlexContainer>
        <IconGroup>
          <IconButton onClick={() => setView("grid")}>
            <AppsIcon />
          </IconButton>
          <IconButton onClick={() => setView("list")}>
            <ViewListIcon />
          </IconButton>
          <CalendarViewWeekIcon />
          <LaptopWindowsIcon />
          <ExpandMoreIcon />
        </IconGroup>

        <IconGroup>
          <SettingsEthernetIcon />
          <SellIcon />
          <IosShareIcon />
          <ExpandMoreIcon />
        </IconGroup>
      </FlexContainer>

      <SearchContainer>
        <SearchBar />
      </SearchContainer>
    </ToolbarContainer>
  );
}
