import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import clientAxios from "../config/axios";

import Swal from "sweetalert2";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";
import { useNavigate } from "react-router-dom";

const theme = createTheme();

export default function Login() {
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();

  let initialUsername = JSON.parse(localStorage.getItem("username"));

  if (!initialUsername) {
    initialUsername = "";
  }

  const [username, setUsername] = useState(initialUsername);
  const [checkbox, setCheckbox] = useState(false);

  const handleUsername = (e) => {
    setUsername(e.target.name);
  };
  const handleCheckbox = (e) => {
    setCheckbox(e.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    //Consultar la API
    await clientAxios
      .post("api/Authenticate/login", {
        username: data.get("user"),
        password: data.get("password"),
      })
      .then((response) => {
        dispatch({
          type: actionTypes.LOGIN,
          payload: response.data,
        });
        if (checkbox) {
          setUsername(data.get("user"));
          localStorage.setItem("username", JSON.stringify(data.get("user")));
        }
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          text: "Ha ocurrido un error!",
          icon: "error",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Aceptar!",
        });
        console.log(error);
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Iniciar Sesi??n
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="user"
              label="Usuario"
              name="user"
              autoFocus
              defaultValue={username}
              onChange={handleUsername}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contrase??a"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  checked={checkbox}
                  onChange={handleCheckbox}
                />
              }
              label="Recu??rdame"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesi??n
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/register" variant="body2">
                  ??No tienes una cuenta? Reg??strese
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
