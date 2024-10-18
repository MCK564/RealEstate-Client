import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { buyPost } from "../../utils/ApiFunction";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const userID = localStorage.getItem("id");
export const PaymentModal = ({ open, onClose }) => {

  // Initialize useForm with default values
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      quantity: 0,
    }
  });

  
  const quantity = watch("quantity", 0);

  const pay = (data) => {
    const updatedData = {...data, 
      "user_id":userID
    }

    buyPost(updatedData)
    .then((response)=> 
    {
      if(response !== false) window.location.href = response;
    }
    );
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "20%",
          maxHeight: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "10px",
          p: 4,
          overflowY: "auto",
        }}
      >
        <Typography variant="h6" mb={2}>
          Vui lòng nhập email và số lượng lượt đăng bạn mong muốn
        </Typography>
        <Box component="form" onSubmit={handleSubmit(pay)}>
          {/* Email Field */}
          <TextField
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email format",
              }
            })}
            label="Email"
            variant="filled"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            margin="normal"
          />

          <TextField
            {...register("quantity", {
              required: "Quantity is required",
              min: { value: 1, message: "Quantity must be at least 1" }
            })}
            label="Số lượng"
            variant="filled"
            fullWidth
            type="number"
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
            margin="normal"
          />

       
          <Typography mt={2}>
            Số tiền cần thanh toán: {quantity * 10000} VND
          </Typography>

          {/* Buttons */}
          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button variant="contained" color="error" onClick={onClose}>
              Hủy thanh toán
            </Button>
            <Button type="submit" variant="contained" color="success">
              Thanh toán
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
