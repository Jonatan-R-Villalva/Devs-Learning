import React, { useState } from "react";
import image from "../../img/RegisterBg.jpg";
import devsLogo from "../../img/devslearn.jpg";
import {
  Box,
  Button,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { AccountCircle, Email, Lock, Person } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { CreateUserInterface } from "../../interfaces/CreateUserInterface";

export default function Register() {
  const initialState = {
    fullname: "",
    username: "",
    password: "",
    rpassword: "",
    email: "",
    rank: 2,
    profileImg: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState(initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.fullname.length < 6) {
      alert("Please complete the form");
    } else {
      //dispatch funcion crear :)
      alert("creado");
    }
  };

  const handleclick = () => {
    navigate("/");
  };

  const [validName, setValidName] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [validUsername, setValidUsername] = useState(true);
  const [validPassword, setValidPassword] = useState(true);
  const [passwordCheck, setPasswordChecked] = useState(true);
  const regexWhite = new RegExp(/^\s+$/);

  function validatePassword() {
    if (
      input.password.length < 8 ||
      regexWhite.test(input.password) ||
      input.password === ""
    ) {
      setValidPassword(false);
    } else {
      setValidPassword(true);
    }
    if (input.password !== input.rpassword) {
      setPasswordChecked(false);
    } else {
      setPasswordChecked(true);
    }
  }

  function validateName() {
    if (input.fullname.length < 6 || regexWhite.test(input.fullname)) {
      setValidName(false);
    } else {
      setValidName(true);
    }
  }

  function validateUserName() {
    if (input.username.length < 3 || regexWhite.test(input.username)) {
      setValidUsername(false);
    } else {
      setValidUsername(true);
    }
  }

  function validateEmail() {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (
      regexWhite.test(input.email) ||
      input.email.length < 8 ||
      !input.email.match(validRegex)
    ) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  }

  return (
    <Box
      sx={{
        minWidth: "100vw",
        minHeight: "100vh",
        height: "100%",
        width: "100%",
        backgroundImage: `url(${image})`,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"

      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        borderRadius='20px'
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          width: "70%",
          height: "70vh",
          maxHeight: "100%",
          backgroundColor: "white",
          borderRadius: '20px'
        }}
      >
        <Container
          sx={{
            height: "100%",
            backgroundImage: `url(${devsLogo})`,
            backgroundPosition: "center",
            backgroundSize: "contain"
          }}
        ></Container>
        <Grid
          display="grid"
          container
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%", width: "100%", backgroundColor: 'white' }}
        >
          <Typography variant="h3">Create Account</Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            sx={{ height: "100%" }}
          >
            <TextField
              error={!validName}
              helperText={!validName && "Fullname minimum length required is 6"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              sx={{ m: "10px 0" }}
              label="Fullname"
              size="small"
              required
              type="text"
              name="fullname"
              onChange={handleChange}
              onBlur={validateName}
              value={input.fullname}
              placeholder="Fullname..."
            />
            <TextField
              error={!validUsername}
              helperText={
                !validUsername && "Username minimum length required is 3"
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
              sx={{ m: "10px 0" }}
              label="Username"
              required
              size="small"
              type="text"
              name="username"
              onChange={handleChange}
              onBlur={validateUserName}
              value={input.username}
              placeholder="Username..."
            />

            <TextField
              error={!validPassword}
              helperText={
                !validPassword && "Password minimum length 8 characters"
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              sx={{ m: "10px 0" }}
              label="Password"
              size="small"
              required
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={validatePassword}
              value={input.password}
              placeholder="Password..."
            />

            <TextField
              error={!passwordCheck}
              helperText={!passwordCheck && "Passwords doesnt match"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
              sx={{ m: "10px 0" }}
              label="Repeat Password"
              size="small"
              required
              type="password"
              name="rpassword"
              onChange={handleChange}
              onBlur={validatePassword}
              value={input.rpassword}
              placeholder="Repeat Password..."
            />

            <TextField
              error={!validEmail}
              helperText={!validEmail && "Plase enter a valid email"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
              sx={{ m: "10px 0" }}
              label="Email Adress"
              size="small"
              type="email"
              name="email"
              required
              onChange={handleChange}
              onBlur={validateEmail}
              value={input.email}
              placeholder="Email..."
            />
            <Button
              sx={{ mt: "5px" }}
              variant="contained"
              size="medium"
              type="submit"
              disabled={
                !validPassword ||
                !validName ||
                !validUsername ||
                !passwordCheck ||
                !validEmail
              }
            >
              Register
            </Button>
            <Button
              sx={{ mt: "5px" }}
              color="info"
              variant="contained"
              size="medium"
              type="button"
              onClick={handleclick}
            >
              Go Back
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
