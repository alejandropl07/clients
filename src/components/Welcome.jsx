import { Typography } from "@mui/material";
import React, { Fragment } from "react";

function Welcome() {

  return (
    <Fragment>
      <Typography
        component="h1"
        variant="h2"
        color="inherit"
        noWrap
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Bienvenido  {""}    {"Alejandro"}
      </Typography>
    </Fragment>
  );
}

export default Welcome;
