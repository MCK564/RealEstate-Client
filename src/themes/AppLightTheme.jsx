import { createTheme } from "@mui/material";
const AppLightTheme = createTheme({
  palette: {
   
  },
  
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  }
});
export default AppLightTheme;
