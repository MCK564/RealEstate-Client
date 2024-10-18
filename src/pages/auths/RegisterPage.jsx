import { Facebook, Google } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../contexts/AuthenticationContext";
import { useForm } from "react-hook-form";
import appEnqueueSnackbar from "../../utils/AppSnackbar";
import { register2 } from "../../utils/ApiFunction";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    try {
      console.log(data);
      register2(data).then((response)=>{
        if (response==true) {
          appEnqueueSnackbar("Đăng ký thành công", { variant: "success" });
          navigate("/login");
        } else {
          appEnqueueSnackbar("Đăng ký thất bại", { variant: "error" });
        }
      })
     
    } catch (error) {
      appEnqueueSnackbar("Đã xảy ra lỗi", { variant: "error" });
      console.error(error);
    }
  };


  return (
    <>
      <Container maxWidth="sm" sx={{ mt: "5rem" }}>
        <Box
          component={"form"}
          noValidate
          onSubmit={handleSubmit(handleRegister)}
          textAlign={"center"}
        >
         

          <Paper variant="outlined" sx={{ p: 3 }}>
          <Typography variant="h5" fontWeight="700" marginBottom="15px">Đăng ký tài khoản</Typography>
            <Stack direction={"row"} spacing={2}>
              <TextField
                {...register("fullname", {
                  required: "required",
                  minLength: { value: 2, message: "Ít nhất 2 ký tự" },
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                label="Họ Tên"
                fullWidth
                margin="normal"
              />
              <TextField
                {...register("phone", {
                  required: "required",
                  pattern: { value: /^\d{6,10}$/, message: "Invalid phone number" },
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                label="Số điện thoại"
                fullWidth
                margin="normal"
              />
            </Stack>

            <TextField
              {...register("email", {
                required: "required",
                pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
              label="Email"
              type="email"
              fullWidth
              margin="normal"
            />

            <TextField
              {...register("password", {
                required: "required",
                minLength: { value: 6, message: "Password is too short" },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
              label="Mật khẩu"
              fullWidth
              type="password"
              margin="normal"
            />
            <TextField
            {...register('status')}
              value="1"
              type="hidden"
            />
             <TextField
            {...register('role_id')}
              value="2"
              type="hidden"
            />
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="error"
              fullWidth
              disableElevation
              sx={{ my: 2 }}
            >
              Đăng ký
            </Button>

            <Divider sx={{ my: 2 }}>
              <Typography variant="body1">Hoặc đăng nhập với</Typography>
            </Divider>

            <Stack direction={"row"} spacing={1}>
              <Button
                variant="outlined"
                size="large"
                color="primary"
                fullWidth
                startIcon={<Facebook />}
                sx={{ textTransform: "none" }}
              >
                Facebook
              </Button>
              <Button
                variant="outlined"
                size="large"
                color="error"
                fullWidth
                startIcon={<Google />}
                sx={{ textTransform: "none" }}
              >
                 Google
              </Button>
            </Stack>

            <Typography variant="body1" mt={3}>
              Đã có tài khoản?{" "}
              <Typography
                component={RouterLink}
                to="/login"
                sx={{ textDecoration: "none", color: "primary.main" }}
              >
                Đăng nhập ngay
              </Typography>
            </Typography>
          </Paper>
        </Box>
      </Container>
    </>
  );
};
