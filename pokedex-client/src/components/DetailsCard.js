import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { useSelector } from "react-redux";

import PokemonDialogue from "./PokemonDialogue";

const DetailsCard = (props) => {
  const [open, setOpen] = useState(false);
  const [isFav, setIsFav] = useState(props.data.isFav);
  const [loaded, setLoaded] = useState(true);

  const token = useSelector((state) => state.token);

  const favoritePokemonHandler = async () => {
    setLoaded(false);
    axios({
      url: "http://localhost:8000/api/pokedex/add_fav",
      method: "post",
      data: {
        pokemonId: props.data.id.toString(),
      },
      headers: {
        Authorization: `Token ${token}`,
      },
    })
      .then((response) => {
        setLoaded(true);
        setIsFav(response.data.isFav);
      })
      .catch((error) => {
        setLoaded(true);
        console.log(error.response.status);
      });
  };

  return (
    <Card sx={{ minWidth: "15vw", width: 300 }} raised ref={props.itemRef}>
      <PokemonDialogue
        setOpen={() => setOpen(false)}
        open={open}
        data={props.data}
      />
      <CardMedia component="img" image={props.data.pictureUri} alt="pokemon" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setOpen(true)}>
          See details
        </Button>
        <IconButton
          aria-label="add to favorites"
          onClick={favoritePokemonHandler}
        >
          {isFav ? (
            <FavoriteIcon sx={{ color: "#EB5757" }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "#EB5757" }} />
          )}
        </IconButton>
      </CardActions>
      {loaded ? null : <LinearProgress />}
    </Card>
  );
};

export default DetailsCard;
