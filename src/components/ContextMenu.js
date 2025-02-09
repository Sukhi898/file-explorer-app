import React from "react";
import styled from "styled-components";

const Menu = styled.div`
  position: absolute;
  background: #333;
  color: white;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 100;
`;

const MenuItem = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background: #555;
  }
`;

export default function ContextMenu({ x, y, onRename, onDelete }) {
  return (
    <Menu style={{ top: y, left: x }}>
      <MenuItem onClick={onRename}>Rename</MenuItem>
      <MenuItem onClick={onDelete}>Delete</MenuItem>
    </Menu>
  );
}
