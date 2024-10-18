import {
  Avatar,
  Box,
  Divider,
  Grid,
  Modal,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";

export const DetailModal = ({ open, onClose, building, owner,detail }) => {
  const { fullname, avatar } = owner;
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
          width: "80%",
          maxHeight: "80%",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "auto", // Thiết lập thuộc tính cuộn
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Stack spacing={1}>
              <Carousel
                autoPlay
                showArrows={true}
                width="100%"
                height="300px"
                style={{ backgroundColor: "gray" }}
              >
                <div>
                  <img
                    src={building.avatar}
                    alt={building.name}
                    style={{
                      maxHeight: "300px",
                      width: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                {building.images != undefined &&
                  building.images.map((image, index) => (
                    <div key={index}>
                      <img
                        src={image}
                        alt={`Slide ${index}`}
                        style={{
                          maxHeight: "500px",
                          width: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ))}
              </Carousel>
              <Divider />
              <Stack>
                <Box display="flex" gap={1}>
                  <Avatar src={avatar} alt="avatar" />
                  <Stack>
                    <Typography fontWeight="600">
                      {fullname}
                      <CheckCircleIcon
                        sx={{
                          ml: "5px",
                          top: "27px",
                        }}
                        color="success"
                        fontSize="small"
                      />
                    </Typography>
                    <Typography
                      fontSize="13px"
                      fontWeight="500"
                      color="GrayText"
                    >
                      Đã kiểm chứng
                    </Typography>
                  </Stack>
                </Box>
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: "5px",
              }}
            />
            <Typography variant="h5" mb="10px">
              Thông tin chi tiết
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                    <TableRow sx={{padding:"10px",bgcolor:"yellow"}}>
                    <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                            Tên thuộc tính
                        </TableCell>
                        <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                            Giá trị
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {detail.map(([key,value],index)=>{
                        return (
                            <TableRow key={index}>
                                <TableCell>
                                    {key}
                                </TableCell>
                                <TableCell>
                                   {typeof value !== 'object'  && value }
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
