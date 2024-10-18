import { Typography } from "@mui/material";
import { enqueueSnackbar } from "notistack";

const appEnqueueSnackbar = (message, options) => {
  enqueueSnackbar(<Typography>{message}</Typography>, options);
};

export default appEnqueueSnackbar;
