import { Button, Typography } from "@mui/material";
import React from "react";

import { Link as RouterLink } from "react-router-dom";

const NavLink = ({ text, to }) => {
  return (
    <Button
      LinkComponent={RouterLink}
      to={to}
      sx={{
        textTransform: "none",
        color: "inherit",
      }}
    >
      <Typography>{text}</Typography>
    </Button>
  );
};

export default NavLink;
