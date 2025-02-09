import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { setSearchQuery } from "../Redux/folderSlice";

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  background: #444;
  color: white;
  padding: 5px 30px;
  border: none;
  border-radius: 5px;
  outline: none;
`;

const SearchIconStyled = styled(SearchIcon)`
  position: absolute;
  left: 10px;
  color: gray;
`;

export default function SearchBar() {
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <SearchBox>
      <SearchIconStyled />
      <SearchInput type="text" placeholder="Search" onChange={handleSearch} />
    </SearchBox>
  );
}
