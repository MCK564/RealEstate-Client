import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import {
  getUserById,
  updateAvatar,
  updateProfileAPI,
  updatePasswordAPI,
} from "../../utils/ApiFunction";
import appEnqueueSnackbar from "../../utils/AppSnackbar";

export const ProfilePage = () => {
  const [existingUser, setExistingUser] = useState({
    avatar: "",
    email: "",
    fullname: "",
    phone: "",
    id: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setExistingUser({ ...existingUser, [name]: value });
  };

  useEffect(() => {
    getUserById().then((response) => {
      if (response !== false) {
        setExistingUser(response);
      }
    });
  }, []);
  const { register: registerAvatar, handleSubmit: handleAvatarSubmit } =
    useForm();

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
  } = useForm();

  const updateAvatar2 = (data) => {
    updateAvatar(data["avatar"][0]).then((response) => {
      setExistingUser({ ...existingUser, ["avatar"]: response.avatar });
      appEnqueueSnackbar("Cập nhật ảnh thành công", { variant: "success" });
    });
  };

  const updateProfile = (data) => {
    data = {...data,['id']:parseInt(localStorage.getItem('id'))}
        console.log(data);
    updateProfileAPI(data).then((response)=>{
        if(response){
            appEnqueueSnackbar("Cập nhật profile thành công", { variant: "success" });
            localStorage.clear();
            window.location.href="/login";
        }
        else{
            appEnqueueSnackbar("Cập nhật profile không thành công", { variant: "error" });
        }
    })
    
  };

  const updatePassword = (data) => {
    if (data.old_password === data.new_password) {
      appEnqueueSnackbar("Mật khẩu mới phải khác mật khẩu cũ", {
        variant: "warning",
      });
    } else if (data.new_password !== data.renew_password) {
      appEnqueueSnackbar("Nhập lại mật khẩu mới cho chính xác", {
        variant: "warning",
      });
    } else {
      updatePasswordAPI(data).then((response) => {
       if(response){
        appEnqueueSnackbar("Cập nhật password  thành công", { variant: "success" });
       }
      });
    }
  };

  return (
    <Container sx={{ mt: "5rem" }}>
      <Stack spacing={2}>
        <Box
          component={"form"}
          noValidate
          onSubmit={handleAvatarSubmit(updateAvatar2)}
          justifyContent="space-between"
          alignItems="center"
          padding="1rem"
          borderRadius="10px"
          textDecoration="none"
          color="black"
          transition="all 0.3s"
          boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
        >
          <Typography variant="h5" fontWeight="500">
            Ảnh đại diện
          </Typography>
          <Grid container columnSpacing={2} alignItems="center">
            <Grid item sx={12} md={4}>
              <TextField
                {...registerAvatar("avatar")}
                type="file"
                variant="outlined"
              />
            </Grid>
            <Grid item sx={12} md={4}>
              {existingUser && existingUser.avatar && (
                <img
                  src={existingUser.avatar}
                  alt="avatar"
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "15px",
                    boxShadow: "0px 0px 3px rgba(0,0,0,0.2)",
                  }}
                />
              )}
            </Grid>
            <Grid item sx={12}>
              <Button type="submit" variant="contained" color="success">
                Cập nhật
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box
          component="form"
          noValidate
          onSubmit={handleProfileSubmit(updateProfile)}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="1rem"
          borderRadius="10px"
          transition="all 0.3s"
          boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
        >
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight="500">
              Cập nhật thông tin cá nhân
            </Typography>
            <TextField
              {...registerProfile("fullname", {
                required: "Họ tên là bắt buộc",
              })}
              type="text"
              label="Họ tên"
              error={!!profileErrors.fullname}
              helperText={profileErrors.fullname?.message}
              fullWidth
              variant="filled"
              margin="normal"
              value={existingUser.fullname}
              onChange={handleChange}
            />
            <TextField
              {...registerProfile("email", {
                required: "Email là bắt buộc",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
                  message: "Địa chỉ email không hợp lệ",
                },
              })}
              type="text"
              label="Email"
              error={!!profileErrors.email}
              helperText={profileErrors.email?.message}
              fullWidth
              variant="filled"
              margin="normal"
              value={existingUser.email}
              onChange={handleChange}
            />
          
            <TextField
              {...registerProfile("phone", {
                required: "Số điện thoại là bắt buộc",
                pattern: {
                  value: /^\d{6,10}$/,
                  message: "Số điện thoại không hợp lệ",
                },
              })}
              type="text"
              label="Số điện thoại"
              error={!!profileErrors.phone}
              helperText={profileErrors.phone?.message}
              fullWidth
              variant="filled"
              margin="normal"
              value={existingUser.phone}
              onChange={handleChange}
            />

            <Button type="submit" variant="contained" color="success">
              Cập nhật
            </Button>
          </Stack>
        </Box>

        <Box
          component={"form"}
          noValidate
          onSubmit={handlePasswordSubmit(updatePassword)}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="1rem"
          borderRadius="10px"
          textDecoration="none"
          color="black"
          transition="all 0.3s"
          boxShadow="0px 0px 5px rgba(0, 0, 0, 0.2)"
        >
          <Stack spacing={2}>
            <Typography variant="h5" fontWeight="500">
              Cập nhật mật khẩu
            </Typography>
            <TextField
              {...registerPassword("old_password", {
                required: "required",
              })}
              type="password"
              label="Mật khẩu cũ"
              fullWidth
              margin="normal"
            />
            <TextField
              {...registerPassword("new_password", {
                required: "required",
              })}
              type="password"
              label="Mật khẩu mới"
              fullWidth
              margin="normal"
            />
            <TextField
              {...registerPassword("renew_password", {
                required: "required",
              })}
              type="password"
              label="Lặp lại mật khẩu mới"
              fullWidth
              margin="normal"
            />
            <Button type="submit" variant="contained" color="success">
              Cập nhật
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
