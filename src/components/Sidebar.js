import React, { useState } from "react";
import styled from "styled-components";
import { Folder } from "@mui/icons-material";
import { PiApplePodcastsLogoFill } from "react-icons/pi";
import { PiAppStoreLogoBold } from "react-icons/pi";
import { CiCircleChevLeft } from "react-icons/ci";
import { BsWindowDesktop } from "react-icons/bs";
import { GrDocument } from "react-icons/gr";
import { MdOutlineDownloadForOffline } from "react-icons/md";
import { IoCloudDownloadOutline } from "react-icons/io5";

const SidebarContainer = styled.div`
  width: 20%;
  background: #2a2a2a;
  padding: 10px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    width: 40%;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 5px;
  }
`;

const Section = styled.div`
  margin-bottom: 11px;
  font-size: 0.8rem;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const SectionTitle = styled.h3`
  padding: 2px 0;
  border-bottom: 1px solid #444;
  font-size: 1rem;
  color: grey;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const Item = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    background: #333;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  cursor: pointer;
  & > span {
    display: flex;
    align-items: center;
    padding: 5px;
    gap: 10px;
    border-radius: 5px;
    margin-bottom: 5px;
  }
`;

const Tag = styled.div`
  padding: 5px 5px;
  background: ${(props) => props.color};
  border-radius: 100%;
  cursor: pointer;
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

const Input = styled.input`
  background: transparent;
  border: 1px solid #fff;
  color: white;
  padding: 5px;
  width: 100%;
`;

const Colors = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;

  & > div {
    width: 11px;
    height: 11px;
    border-radius: 100%;
  }

  & > div:nth-child(1) {
    background: red;
  }

  & > div:nth-child(2) {
    background: #ffbf00;
  }

  & > div:nth-child(3) {
    background: green;
  }
`;

export default function Sidebar({ onSelectSection }) {
  const favourites = [
    { name: "AirDrop", icon: <PiApplePodcastsLogoFill /> },
    { name: "Recents", icon: <CiCircleChevLeft /> },
    { name: "Applications", icon: <PiAppStoreLogoBold /> },
    { name: "Desktop", icon: <BsWindowDesktop /> },
    { name: "Documents", icon: <GrDocument /> },
    { name: "Downloads", icon: <MdOutlineDownloadForOffline /> },
  ];
  const tags = [
    { name: "Red", color: "red" },
    { name: "Orange", color: "orange" },
    { name: "Yellow", color: "#ffbf00	" },
    { name: "Green", color: "green" },
    { name: "Blue", color: "blue" },
    { name: "Purple", color: "purple" },
    { name: "Grey", color: "grey" },
  ];

  const [iCloudFolders, setICloudFolders] = useState([]);
  const [newFolderName, setNewFolderName] = useState("");
  const [addingFolder, setAddingFolder] = useState(false);

  const handleAddFolder = () => {
    if (newFolderName.trim()) {
      setICloudFolders([...iCloudFolders, newFolderName.trim()]);
      setNewFolderName("");
      setAddingFolder(false);
    }
  };

  return (
    <SidebarContainer>
      <Colors>
        <div></div>
        <div></div>
        <div></div>
      </Colors>
      <Section>
        <SectionTitle>Favourites</SectionTitle>
        {favourites.map((item) => (
          <Item key={item.name} onClick={() => onSelectSection(item.name)}>
            <div style={{ color: "#0064ff" }}>{item.icon}</div>
            {item.name}
          </Item>
        ))}
      </Section>

      <Section>
        <SectionTitle>Locations</SectionTitle>
        <Item onClick={() => onSelectSection("iCloud Drive")}>
          <IoCloudDownloadOutline />
          iCloud Drive
        </Item>
        {addingFolder && (
          <Input
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            onBlur={handleAddFolder}
            onKeyDown={(e) => e.key === "Enter" && handleAddFolder()}
            autoFocus
          />
        )}
        {iCloudFolders.map((folder) => (
          <Item key={folder}>
            <Folder /> {folder}
          </Item>
        ))}
      </Section>
      <Section>
        <SectionTitle>Tags</SectionTitle>
        <TagsContainer>
          {tags.map((tag) => (
            <span key={tag.name}>
              <Tag color={tag.color}></Tag>
              {tag.name}
            </span>
          ))}
        </TagsContainer>
      </Section>
    </SidebarContainer>
  );
}
