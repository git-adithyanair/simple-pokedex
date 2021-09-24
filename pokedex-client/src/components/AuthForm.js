import React, { useState } from "react";
import { Grid, Card, CardMedia, CardContent, Tabs, Tab } from "@mui/material";

import styles from "./AuthForm.module.css";
import pokemon from "../pokemon.jpeg";
import SignInCard from "./SignInCard";
import SignUpCard from "./SignUpCard";

const AuthForm = () => {
  const [value, setValue] = useState(0);

  return (
    <Grid>
      <Card elevation={15} className={styles.paper}>
        <CardMedia component="img" src={pokemon} alt="pokemon" />
        <Tabs
          value={value}
          onChange={(_, newValue) => setValue(newValue)}
          centered
          variant="fullWidth"
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>
        <CardContent style={{ padding: 30 }}>
          {value === 0 ? (
            <SignInCard setValue={setValue} />
          ) : (
            <SignUpCard setValue={setValue} />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default AuthForm;
