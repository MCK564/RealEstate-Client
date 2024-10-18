import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ThemeProvider } from "@emotion/react";
import AppLightTheme from "./themes/AppLightTheme.jsx";
import { AuthenticationProvider } from "./contexts/AuthenticationContext.jsx";
import { SnackbarProvider } from "notistack";
import 'react-responsive-carousel/lib/styles/carousel.min.css';

ReactDOM.createRoot(document.getElementById("root")).render(
    <ThemeProvider theme={AppLightTheme}>
      <SnackbarProvider>
        <AuthenticationProvider>
          <App />
        </AuthenticationProvider>
      </SnackbarProvider>
    </ThemeProvider>
);
