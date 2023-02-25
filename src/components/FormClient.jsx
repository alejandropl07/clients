import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Select from "@mui/material/Select";
import clientAxios from "../config/axios";
import Swal from "sweetalert2";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";

function FormClient() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [telefonoCelular, setTelCel] = useState("");
  const [otroTelefono, setOtroTel] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fNacimiento, setFNac] = useState("");
  const [fAfiliacion, setFAfil] = useState("");
  const [sexo, setSexo] = useState("");
  const [resenaPersonal, setResenaPersonal] = useState("");

  const [interestSelect, setInterestSelect] = useState("");

  const [{ user, error, interest }, dispatch] = useStateValue();
  const { token, userid } = user;

  const successValid = () => {
    dispatch({
      type: actionTypes.VALIDATE_SUCCESS,
    });
  };

  const errorValid = () => {
    dispatch({
      type: actionTypes.VALIDATE_ERROR,
    });
  };

  const showListClients = () => {
    dispatch({
      type: actionTypes.SHOW_LIST_CLIENTS,
    });
  };
  const createClientAction = () => {
    dispatch({
      type: actionTypes.CREATE_CLIENT,
    });
  };

  const getInterest = async () => {
    await clientAxios
      .get("api/Intereses/Listado", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        dispatch({
          type: actionTypes.GET_INTEREST,
          payload: response.data,
        });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createClient = async (event) => {
    event.preventDefault();
    if (
      nombre.trim() === "" ||
      apellidos.trim() === "" ||
      identificacion.trim() === "" ||
      telefonoCelular.trim() === "" ||
      otroTelefono.trim() === "" ||
      direccion.trim() === "" ||
      fNacimiento.trim() === "" ||
      fAfiliacion.trim() === "" ||
      sexo.trim() === "" ||
      resenaPersonal.trim() === "" ||
      interestSelect.trim() === ""
    ) {
      errorValid();
      return;
    }
    successValid();
    await clientAxios
      .post(
        "/api/Cliente/Crear",
        {
          nombre,
          apellidos,
          identificacion,
          celular: telefonoCelular,
          otroTelefono,
          direccion,
          fNacimiento,
          fAfiliacion,
          sexo,
          resennaPersonal: resenaPersonal,
          interesFK: interestSelect,
          imagen:
            "data:image/jpeg;base64,/9j/4QEZRXhpZgAATU0AKgAAAAgABQEAAAMAAAABAtAAAAEBAAMAAAABBkAAAAExAAIAAAAmAAAASodpAAQAAAABAAAAcAESAAMAAAABAAAAAAAAAABBbmRyb2lkIFJQMUEuMjAwNzIwLjAxMi5BMjE3TVVCVTdDVUkxAAAEkAMAAgAAABQAAACmkpEAAgAAAAQ3NDQAkBEAAgAAAAcAAAC6kggABAAAAAEAAAAAAAAAADIwMjI6MDU6MzEgMTc6MDE6NDQALTA0OjAwAAADAQAAAwAAAAEC0AAAATEAAgAAACYAAADrAQEAAwAAAAEGQAAAAAAAAEFuZHJvaWQgUlAxQS4yMDA3MjAuMDEyLkEyMTdNVUJVN0NVSTEA/+AAEEpGSUYAAQEAAAEAAQAA/+ICKElDQ19QUk9GSUxFAAEBAAACGAAAAAACEAAAbW50clJHQiBYWVogAAAAAAAAAAAAAAAAYWNzcAAAAAAAAAAAAAAAAAAA",
          usuarioId: userid,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        showListClients();
        createClientAction();
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

  useEffect(() => {
    getInterest();
  }, []);

  return (
    <Box
      component="form"
      onSubmit={createClient}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
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
          <IconButton aria-label="clients">
            <AccountCircleIcon /> Mantenimiento de clientes
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <IconButton aria-label="save" type="submit" className="icon-button">
            <SaveIcon />
            Guardar
          </IconButton>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <IconButton
            aria-label="back"
            onClick={showListClients}
            className="icon-button"
          >
            <KeyboardBackspaceIcon />
            Regresar
          </IconButton>
        </Grid>
      </Grid>
      <Box
        sx={{
          flexGrow: 1,
          overflow: "hidden",
        }}
      >
        <TextField
          sx={{ minWidth: "20%" }}
          required
          id="identificacion"
          label="Identificación"
          placeholder="Identificación"
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
        />

        <TextField
          sx={{ minWidth: "20%" }}
          required
          id="nombre"
          label="Nombre"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          sx={{ minWidth: "20%" }}
          required
          id="apellidos"
          label="Apellidos"
          placeholder="Apellidos"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />

        <FormControl required sx={{ m: 1, minWidth: "20%" }}>
          <InputLabel id="genero-label">Género</InputLabel>
          <Select
            labelId="genero-label"
            id="genero"
            value={sexo}
            label="Género *"
            onChange={(e) => setSexo(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
          </Select>
        </FormControl>

        <TextField
          sx={{ minWidth: "20%" }}
          name="fecha-nacimiento"
          label="Fecha de nacimiento"
          InputLabelProps={{ shrink: true, required: true }}
          type="date"
          value={fNacimiento}
          onChange={(e) => setFNac(e.target.value)}
        />

        <TextField
          sx={{ minWidth: "20%" }}
          name="fecha-afiliacion"
          label="Fecha de afiliación"
          InputLabelProps={{ shrink: true, required: true }}
          type="date"
          value={fAfiliacion}
          onChange={(e) => setFAfil(e.target.value)}
        />

        <TextField
          sx={{ minWidth: "20%" }}
          required
          id="tel-cel"
          label="Teléfono celular"
          placeholder="Teléfono Celular"
          InputLabelProps={{
            shrink: true,
          }}
          value={telefonoCelular}
          onChange={(e) => setTelCel(e.target.value)}
        />
        <TextField
          sx={{ minWidth: "20%" }}
          required
          id="tel-otro"
          label="Teléfono otro"
          placeholder="Teléfono Otro"
          InputLabelProps={{
            shrink: true,
          }}
          value={otroTelefono}
          onChange={(e) => setOtroTel(e.target.value)}
        />

        <FormControl required sx={{ m: 1, minWidth: "20%" }}>
          <InputLabel id="interes-label">Interés</InputLabel>
          <Select
            labelId="interes-label"
            id="interes"
            label="Interes"
            value={interestSelect}
            onChange={(e) => setInterestSelect(e.target.value)}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {interest?.map((int) => (
              <MenuItem key={int.id} value={int.id}>
                {int.descripcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          sx={{ minWidth: "76%" }}
          required
          id="direccion"
          label="Dirección"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />

        <TextField
          sx={{ minWidth: "76%" }}
          required
          id="resena"
          label="Reseña"
          placeholder="Reseña"
          value={resenaPersonal}
          onChange={(e) => setResenaPersonal(e.target.value)}
        />
      </Box>
      {error ? (
        <Typography
          component="h1"
          variant="h5"
          color="red"
          noWrap
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Todos los campos son obligatorios
        </Typography>
      ) : null}
    </Box>
  );
}

export default FormClient;
