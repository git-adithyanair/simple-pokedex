import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";

const PokemonDialogue = (props, { data }) => {
  return (
    <Dialog onClose={props.setOpen} open={props.open}>
      <Card sx={{ maxWidth: "50vw", width: 400 }}>
        <CardMedia
          component="img"
          image={props.data.pictureUri}
          alt="pokemon"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.data.name.charAt(0).toUpperCase() + props.data.name.slice(1)}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Height: {props.data.height} decimetres
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Base Experience: {props.data.baseExperience} xp
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Weight: {props.data.weight} hectograms
          </Typography>
        </CardContent>
      </Card>
    </Dialog>
  );
};

export default PokemonDialogue;
