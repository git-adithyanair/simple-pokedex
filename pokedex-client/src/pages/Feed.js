import React, { useState, useCallback, useRef } from "react";
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import DetailsCard from "../components/DetailsCard";
import useFetch from "../hooks/useFetch";

const Feed = () => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [searching, setSearching] = useState(false);
  const [page, setPage] = useState(1);
  const [isSearch, setIsSearch] = useState(false);

  const token = useSelector((state) => state.token);
  const { loading, _, list, hasMore } = useFetch(page, token);

  const observer = useRef();
  const lastPokemonRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const searchPokemonHandler = async (lookup) => {
    setSearching(true);
    setIsSearch(true);
    axios({
      url: `http://localhost:8000/api/pokedex/search?lookup=${lookup}`,
      method: "get",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        setData(response.data.results);
        setSearching(false);
      })
      .catch((error) => {
        console.log(error.response.status);
        setSearching(false);
      });
  };

  return (
    <Box>
      <Header
        onClickSearch={searchPokemonHandler}
        setLoaded={setLoaded}
        showSearch={true}
      />
      {searching || list.length === 0 ? (
        <LinearProgress />
      ) : (
        <Box
          sx={{
            width: "80vw",
            height: "100vh",
            margin: "40px auto",
            flexGrow: 1,
          }}
        >
          <Grid container spacing={4}>
            {/* {arr} */}
            {!isSearch
              ? list.map((item, i) => {
                  const isLastElement = list.length === i + 1;
                  return (
                    <Grid
                      container
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={4}
                      xl={3}
                      key={list[i].name}
                    >
                      {isLastElement ? (
                        <DetailsCard data={list[i]} itemRef={lastPokemonRef} />
                      ) : (
                        <DetailsCard data={list[i]} />
                      )}
                    </Grid>
                  );
                })
              : data.map((item, i) => (
                  <Grid
                    container
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={3}
                    key={data[i].name}
                  >
                    <DetailsCard data={data[i]} />
                  </Grid>
                ))}
          </Grid>
          {(!data || data.length === 0) && isSearch ? (
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              textAlign="center"
              marginTop={10}
            >
              No Pokemon to show!
            </Typography>
          ) : null}
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CircularProgress sx={{ marginTop: 10, marginBottom: 10 }} />
            </div>
          ) : null}
        </Box>
      )}
    </Box>
  );
};

export default Feed;
