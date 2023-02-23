import React, { useEffect, useState} from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SaveIcon from "@mui/icons-material/Save";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";
import clientAxios from "../config/axios";
import Swal from "sweetalert2";
import { actionTypes } from "../context/reducer";
import { useStateValue } from "../context/StateProvider";

function UpdateClient() {
  const [{ user, client, error, interest }, dispatch] = useStateValue();
  const { token, userid } = user;

  const navigate = useNavigate();

  const showListClient = () => {
    dispatch({
      type: actionTypes.SHOW_LIST_CLIENTS,
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // const updateClientAction = () => dispatch(updateClientAction());

  const [nombre, setNombre] = useState(client.nombre);
  const [apellidos, setApellidos] = useState(client.apellidos);
  const [identificacion, setIdentificacion] = useState(client.identificacion);
  const [celular, setCelular] = useState(client.telefonoCelular);
  const [otroTelefono, setOtroCel] = useState(client.otroTelefono);
  const [direccion, setDireccion] = useState(client.direccion);
  const [resennaPersonal, setResena] = useState(client.resenaPersonal);

  const [fNacimiento, setFechaNac] = useState(client.fNacimiento);
  const [fAfiliacion, setFechaAfil] = useState(client.fAfiliacion);

  const [sexo, setSexo] = useState(client.sexo);
  const [interestSelect, setInterestSelect] = useState(client.interesesId);

  const submitEditarCliente = async (event) => {
    event.preventDefault();
    if (
      nombre.trim() === "" ||
      apellidos.trim() === "" ||
      identificacion.trim() === "" ||
      celular.trim() === "" ||
      otroTelefono.trim() === "" ||
      direccion.trim() === "" ||
      resennaPersonal.trim() === ""
    ) {
      dispatch({
        type: actionTypes.VALIDATE_ERROR,
      });
      return;
    }
    dispatch({
      type: actionTypes.VALIDATE_SUCCESS,
    });
    await clientAxios
      .post(
        "/api/Cliente/Actualizar",
        {
          id: client.id,
          nombre,
          apellidos,
          identificacion,
          celular,
          otroTelefono,
          direccion,
          fNacimiento,
          fAfiliacion,
          sexo,
          resennaPersonal,
          interesFK: interestSelect,
          imagen:
            "data:image/jpeg;base64,/9j/4QEZRXhpZgAATU0AKgAAAAgABQEAAAMAAAABAtAAAAEBAAMAAAABBkAAAAExAAIAAAAmAAAASodpAAQAAAABAAAAcAESAAMAAAABAAAAAAAAAABBbmRyb2lkIFJQMUEuMjAwNzIwLjAxMi5BMjE3TVVCVTdDVUkxAAAEkAMAAgAAABQAAACmkpEAAgAAAAQ3NDQAkBEAAgAAAAcAAAC6kggABAAAAAEAAAAAAAAAADIwMjI6MDU6MzEgMTc6MDE6NDQALTA0OjAwAAADAQAAAwAAAAEC0AAAATEAAgAAACYAAADrAQEAAwAAAAEGQAAAAAAAAEFuZHJvaWQgUlAxQS4yMDA3MjAuMDEyLkEyMTdNVUJVN0NVSTEA/+AAEEpGSUYAAQEAAAEAAQAA/+ICKElDQ19QUk9GSUxFAAEBAAACGAAAAAACEAAAbW50clJHQiBYWVogAAAAAAAAAAAAAAAAYWNzcAAAAAAAAAAAAAAAAAAA",
          usuarioId: userid,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        showListClient();
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
      onSubmit={submitEditarCliente}
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <IconButton aria-label="clients">
            <AccountCircleIcon /> Mantenimiento de clientes
          </IconButton>

          <IconButton aria-label="save" type="submit">
            <SaveIcon />
            Guardar
          </IconButton>
          <IconButton aria-label="back" onClick={showListClient}>
            <KeyboardBackspaceIcon />
            Regresar
          </IconButton>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ minWidth: "20%" }}
            required
            id="identificacion"
            label="Identificación"
            placeholder="Identificación"
            defaultValue={client?.identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
          />

          <TextField
            sx={{ minWidth: "20%" }}
            required
            id="nombre"
            label="Nombre"
            placeholder="Nombre"
            defaultValue={client?.nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            sx={{ minWidth: "20%" }}
            required
            id="apellidos"
            label="Apellidos"
            placeholder="Apellidos"
            defaultValue={client?.apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormControl required sx={{ m: 1, minWidth: "20%" }}>
            <InputLabel id="genero-label">Género</InputLabel>
            <Select
              labelId="genero-label"
              id="genero"
              label="Género *"
              defaultValue={client?.sexo}
              onChange={(e) => setSexo(e.target.value)}
            >
              <MenuItem value={client?.sexo}>
                <em></em>
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
            defaultValue={client?.fNacimiento}
            onChange={(e) => setFechaNac(e.target.value)}
          />

          <TextField
            sx={{ minWidth: "20%" }}
            name="fecha-afiliacion"
            label="Fecha de afiliación"
            InputLabelProps={{ shrink: true, required: true }}
            type="date"
            defaultValue={client?.fAfiliacion}
            onChange={(e) => setFechaAfil(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ minWidth: "20%" }}
            required
            id="tel-cel"
            label="Teléfono celular"
            placeholder="Teléfono Celular"
            defaultValue={client?.telefonoCelular}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setCelular(e.target.value)}
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
            defaultValue={client?.otroTelefono}
            onChange={(e) => setOtroCel(e.target.value)}
          />

          <FormControl required sx={{ m: 1, minWidth: "20%" }}>
            <InputLabel id="interes-label">Interés</InputLabel>
            <Select
              labelId="interes-label"
              id="interes"
              label="Interes"
              defaultValue={client?.interesesId}
              onChange={(e) => setInterestSelect(e.target.value)}
            >
              <MenuItem value={client?.interesesId}>
                <em></em>
              </MenuItem>
              {interest?.map((int) => (
                <MenuItem key={int.id} value={int.id}>
                  {int.descripcion}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ minWidth: "76%" }}
            required
            id="direccion"
            label="Dirección"
            placeholder="Dirección"
            defaultValue={client?.direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TextField
            sx={{ minWidth: "76%" }}
            required
            id="resena"
            label="Reseña"
            placeholder="Reseña"
            defaultValue={client?.resenaPersonal}
            onChange={(e) => setResena(e.target.value)}
          />
        </Box>
      </div>
      {error ? (
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
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

export default UpdateClient;
