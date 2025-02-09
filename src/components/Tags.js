import React from "react";
import styled from "styled-components";

const TagsContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const Tag = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

export default function Tags() {
  return (
    <TagsContainer>
      {["red", "orange", "yellow", "green", "blue", "purple", "gray"].map(
        (color) => (
          <Tag key={color} color={color} />
        )
      )}
    </TagsContainer>
  );
}
