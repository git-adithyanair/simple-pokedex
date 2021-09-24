import React, { useState, useEffect } from "react";
import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import axios from "axios";
import { useSelector } from "react-redux";

import Header from "../components/Header";
import DetailsCard from "../components/DetailsCard";

const Favorites = () => {
  const [data, setData] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const token = useSelector((state) => state.token);

  const getPokemonHandler = async () => {
    axios({
      url: "http://localhost:8000/api/pokedex/get_fav",
      method: "get",
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        setData(response.data.results);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error.response.status);
        setLoaded(true);
      });
  };

  useEffect(() => {
    getPokemonHandler();
  }, []);

  let arr = [];
  if (loaded) {
    for (let i = 0; i < data.length; i++) {
      arr.push(
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
      );
    }
  }
  return (
    <Box>
      <Header showSearch={false} setLoaded={setLoaded} />
      {loaded ? (
        <Box
          sx={{
            width: "80vw",
            height: "100vh",
            margin: "40px auto",
            flexGrow: 1,
          }}
        >
          <Grid container spacing={4}>
            {arr}
          </Grid>
          {!data || data.length === 0 ? (
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
        </Box>
      ) : (
        <LinearProgress />
      )}
    </Box>
  );
};

export default Favorites;
