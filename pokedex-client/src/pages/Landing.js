import React from "react";
import { Box } from "@mui/system";

import AuthForm from "../components/AuthForm";

const Landing = () => {
  return (
    <Box>
      <h1 style={{ marginTop: 60, textAlign: "center" }}>
        Welcome to the Pokedex!
      </h1>
      <h3 style={{ textAlign: "center" }}>
        Search Pokemon and look up details about them.
      </h3>
      <AuthForm />
    </Box>
  );
};

export default Landing;
