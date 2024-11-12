import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import LandscapeIcon from "@mui/icons-material/Landscape";


export default function Footer() {

  return (
    <Box
      sx={{
       bgcolor:"#fff",
        p: 3,
        mt:3,
        borderTop:1,
        borderColor:"lightgray"
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center" >
          {"Copyright © "} 
          <Link color="inherit" href="/">
           RAOVAT
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}