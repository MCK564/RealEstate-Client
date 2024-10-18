import { Facebook, Google, LocalLaundryService } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useForm } from "react-hook-form";
import appEnqueueSnackbar from "../../utils/AppSnackbar";
import { login } from "../../utils/ApiFunction";

export const LoginPage = () => {
  

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      login(data).then((response)=>{
        if (response!==false) {
          appEnqueueSnackbar("Đăng nhập thành công", { variant: "success" });
         window.location.href="/";
        } else {
          appEnqueueSnackbar("Sai mật khẩu hoặc số điện thoại", { variant: "error" });
        }
      })
     
    } catch (error) {
      appEnqueueSnackbar("Đã xảy ra lỗi", { variant: "error" });
      console.error(error);
    }
  };


  useEffect(() => {
    localStorage.getItem('token') && navigate("/");
  }, []);
  return (
    <>
      <Container maxWidth="sm" sx={{ mt: "5rem" }}>
        <Box
          component={"form"}
          noValidate
          onSubmit={handleSubmit(handleLogin)}
          textAlign={"center"}
        >
          <Paper variant="outlined" sx={{ p: 3 }}>
            <Typography variant="h5" fontWeight="700">Đăng nhập</Typography>

            <TextField
              {...register("phone", {
                required: "required",
                pattern: { value: /^\d{6,10}$/, message: "Invalid phone number" },
              })}
              error={!!errors.phone} 
              helperText={errors.phone?.message} 
              label="Số điện thoại" 
              fullWidth
              margin="normal"
            />

            <TextField
              {...register("password", {
                required: "required",
                minLength: { value: 6, message: "Mật khẩu ngắn quá" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              label="Mật khẩu"
              fullWidth
              type="password"
              margin="normal"
            
            />

            <Button
              type="submit"
              variant="contained"
              color="error"
              size="large"
              fullWidth
              disableElevation
              sx={{ my: ".5rem" }}
            >
              Đăng nhập
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body1">Hoặc đăng nhập với</Typography>
            </Divider>

            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  startIcon={<Facebook />}
                  sx={{ textTransform: "none" }}
                >
                   Facebook
                </Button>
              </Grid>

              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  fullWidth
                  startIcon={<Google />}
                  sx={{ textTransform: "none" }}
                >
                Google
                </Button>
              </Grid>
            </Grid>

            <Typography variant="body1" mt={"1rem"}>
              Chưa có tài khoản?{" "}
              <Typography
                component={RouterLink}
                to="/register"
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Tạo mới ngay
              </Typography>
            </Typography>
          </Paper>
        </Box>
      </Container>
    </>
  );
};
