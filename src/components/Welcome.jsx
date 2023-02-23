import { Typography } from "@mui/material";
import React, { Fragment } from "react";
import { useStateValue } from "../context/StateProvider";

function Welcome() {
  const [{ user }] = useStateValue();
  return (
    <Fragment>
      <Typography
        component="h1"
        variant="h2"
        color="inherit"
        noWrap
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Bienvenido {""} {user?.username}
      </Typography>
    </Fragment>
  );
}

export default Welcome;
