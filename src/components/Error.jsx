import React from "react";
import { Box, Typography } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";

function Error() {
  return (
    <div className="error">
        <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
      <WarningIcon color="primary"
       sx={{ fontSize: 85 }} />
       <Typography
        component="h1"
        variant="h2"
        color="primary"
        noWrap
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        404
      </Typography>
       </Box>
      <Typography
        component="h1"
        variant="h2"
        color="inherit"
        noWrap
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        Error
      </Typography>
    </div>
  );
}

export default Error;
