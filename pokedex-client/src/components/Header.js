import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";

import { clearToken } from "../store/actions";

const Header = (props) => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const searchInput = React.useRef(null);

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  }, [searchValue]);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => {
            if (props.showSearch) {
              window.location.reload();
            } else {
              history.push("/feed");
            }
          }}
        >
          Pokedex
        </Typography>

        {props.showSearch ? (
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              inputRef={searchInput}
            />
          </Search>
        ) : null}
        {props.showSearch ? (
          <Button
            color="inherit"
            style={{ marginRight: 40 }}
            onClick={() => {
              if (searchValue === "") {
                window.location.reload();
              } else {
                props.onClickSearch(searchValue);
              }
            }}
          >
            Search
          </Button>
        ) : null}
        <Button
          color="inherit"
          onClick={() =>
            props.showSearch ? history.push("/favs") : history.push("/feed")
          }
          style={{ marginRight: 20 }}
        >
          {props.showSearch ? "Favorites" : "Feed"}
        </Button>
        <Button color="inherit" onClick={() => dispatch(clearToken())}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
