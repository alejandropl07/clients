import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import { useStateValue } from "../context/StateProvider";
import { actionTypes } from "../context/reducer";

function ListItems() {
  const [{ clients }, dispatch] = useStateValue();
  const showListClient = () => {
    dispatch({
      type: actionTypes.SHOW_LIST_CLIENTS,
    });
  };

  const showWelcome = () => {
    dispatch({
      type: actionTypes.SHOW_WELCOME,
    });
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={showWelcome}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItemButton>
      <ListItemButton onClick={showListClient}>
        <ListItemIcon>
          <EmojiPeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Consulta clientes" />
      </ListItemButton>
    </React.Fragment>
  );
}

export default ListItems;
