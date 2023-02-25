import React, { Fragment, useEffect, useRef, useState } from "react";
import clientAxios from "../config/axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Client from "./Client";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";

function ListClients() {
  const [{ clients, user }, dispatch] = useStateValue();
  const { token, userid } = user;

  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");

  const nombreRef = useRef("");
  const identificacionRef = useRef("");

  const onChangeNombre = (value) => {
    setNombre(value);
  };

  const onChangeIdentificacion = (value) => {
    setIdentificacion(value);
  };

  const showFormClient = () => {
    dispatch({
      type: actionTypes.SHOW_FORM_CLIENT,
    });
  };

  const showWelcome = () => {
    dispatch({
      type: actionTypes.SHOW_WELCOME,
    });
  };

  const getClients = async () => {
    await clientAxios
      .post(
        "api/Cliente/Listado",
        { usuarioid: userid, identificacion, nombre },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        dispatch({
          type: actionTypes.GET_CLIENTS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getClientsFilter = async (event) => {
    event.preventDefault();
    await clientAxios
      .post(
        "api/Cliente/Listado",
        { usuarioid: userid, identificacion, nombre },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        dispatch({
          type: actionTypes.GET_CLIENTS,
          clients: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getClients();
  }, [token]);
  return (
    <Fragment>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 2, width: "25ch", flexGrow: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid
          container
          spacing={1}
          sx={{ overflow: "hidden", marginBottom: "1rem" }}
        >
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <IconButton>
              <AccountCircleIcon /> Consulta de clientes
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <IconButton onClick={showFormClient} className="icon-button">
              <AddIcon />
              Agregar
            </IconButton>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <IconButton
              aria-label="back"
              onClick={showWelcome}
              className="icon-button"
            >
              <KeyboardBackspaceIcon />
              Regresar
            </IconButton>
          </Grid>
        </Grid>

        <Grid container spacing={1} sx={{ overflow: "hidden" }}>
          <TextField
            sx={{ minWidth: "20%" }}
            id="nombre"
            label="Nombre"
            placeholder="Nombre"
            inputRef={nombreRef}
            onChange={() => onChangeNombre(nombreRef.current.value)}
          />

          <TextField
            sx={{ minWidth: "20%" }}
            id="identificacion"
            label="Identificación"
            placeholder="Identificación"
            inputRef={identificacionRef}
            onChange={() =>
              onChangeIdentificacion(identificacionRef.current.value)
            }
          />

          <IconButton
            aria-label="search"
            onClick={(event) => getClientsFilter(event)}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <SearchIcon />
          </IconButton>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Identificación</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Nombre completo</strong>
              </TableCell>
              <TableCell align="right">
                <strong>Acciones</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients?.map((client) => {
              if (
                client.nombre.toLowerCase().includes(nombre.toLowerCase()) &&
                client.identificacion
                  .toLowerCase()
                  .includes(identificacion.toLowerCase())
              )
                return (
                  <Client
                    key={client.id}
                    client={client}
                    getClients={getClients}
                  />
                );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
}

export default ListClients;
