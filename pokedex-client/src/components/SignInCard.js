import React, { useState } from "react";
import { TextField, Button, Typography, Link, Alert } from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setToken } from "../store/actions";

const SignInCard = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const signInHandler = () => {
    axios({
      url: "http://localhost:8000/api/pokedex/login",
      method: "post",
      data: {
        username: email,
        password,
      },
    })
      .then((response) => {
        dispatch(setToken(response.data.token));
        history.push("/feed");
      })
      .catch(() => {
        setError("Could not sign in with provided credentials.");
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Sign In</h1>
      <form>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          fullWidth
          required
          size="normal"
          margin="normal"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          required
          size="normal"
          margin="normal"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error ? (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        ) : null}
        <Button
          variant="contained"
          style={{ marginTop: 40 }}
          fullWidth
          size="large"
          onClick={signInHandler}
        >
          Sign In
        </Button>
      </form>
      <Typography style={{ textAlign: "center", marginTop: 30 }}>
        Don't have an account?{" "}
        <Link href="#" onClick={() => props.setValue(1)}>
          Sign up
        </Link>
        .
      </Typography>
    </div>
  );
};

export default SignInCard;
