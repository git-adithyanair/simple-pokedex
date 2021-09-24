import React, { useState } from "react";
import { TextField, Button, Typography, Link, Alert } from "@mui/material";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";

import { setToken } from "../store/actions";

const SignUpCard = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  const signUpHandler = () => {
    axios({
      url: "http://localhost:8000/api/pokedex/register",
      method: "post",
      data: {
        email,
        password,
        password2,
      },
    })
      .then((response) => {
        if (response.data.token) {
          dispatch(setToken(response.data.token));
          history.push("/feed");
        } else {
          setError(Object.values(response.data)[0]);
        }
      })
      .catch((error) => {
        setError(Object.values(error.response.data)[0]);
      });
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Sign Up</h1>
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
        <TextField
          id="password2"
          label="Confirm password"
          variant="outlined"
          fullWidth
          required
          size="normal"
          margin="normal"
          type="password"
          onChange={(e) => setPassword2(e.target.value)}
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
          onClick={signUpHandler}
        >
          Sign Up
        </Button>
      </form>
      <Typography style={{ textAlign: "center", marginTop: 30 }}>
        Already have an account?{" "}
        <Link href="#" onClick={() => props.setValue(0)}>
          Sign in
        </Link>
        .
      </Typography>
    </div>
  );
};

export default SignUpCard;
