import {
  FavoriteBorderOutlined,
  FlagOutlined,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getBuildingEdit, getSimilarBuliding } from "../utils/ApiFunction";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link, useNavigate } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import { useForm } from "react-hook-form";
import { createCommunication } from "../utils/ApiFunction";
import appEnqueueSnackbar from "../utils/AppSnackbar";
import poster from "../assets/images/poster.jpg"
import poster2 from "../assets/images/poster2.png"
import MessageIcon from '@mui/icons-material/Message';

const InfoBox = ({ title, value, optionalInfo }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="body2" color="grey.500">
        {title}
      </Typography>
      <Typography variant="body1">{value} </Typography>
      <Typography variant="caption" color="grey.500">
        {optionalInfo}
      </Typography>
    </Box>
  );
};

export const RealEstateDetailPage = ({onChatClick}) => {
  const navigate = useNavigate();
  const [existingBuilding, setExistingBuilding] = useState({
    id:"",
    images: [],
    owner: {
      phone: "",
    },
  });
const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
const [scrolled, setScrolled] = useState(false);
const [similarBuildings, setSimilarBuildings] = useState([]);
const [open, setOpen] = useState(false);
const theme = useTheme();
const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
const [showPhoneNumber, setShowPhoneNumber] = useState(false);
const [dataLoaded, setDataLoaded] = useState(false);
const [building_id, setBuilding_id] = useState();


const handleTogglePhoneNumber = () => {
  setShowPhoneNumber(!showPhoneNumber);
};
const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const handleChatClick = () =>{
  onChatClick(existingBuilding.owner);
}




useEffect(() => {
  var currentURL = window.location.href.split("/");
  const id = currentURL[currentURL.length - 1];
  setBuilding_id(id);
  if (id && !dataLoaded) { 
      Promise.all([getBuildingEdit(id), getSimilarBuliding(id)]) 
        .then(([editResponse, similarResponse]) => {
          console.log(editResponse);
          console.log(similarResponse);
          setExistingBuilding(editResponse);
          setSimilarBuildings(similarResponse.buildings);
          setDataLoaded(true); 
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    }
  
  const handleScroll = () => {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };
  window.addEventListener("scroll", handleScroll);
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, [dataLoaded]);


  const createCommunication2 = (data) => {
    if(!localStorage.getItem("token")){
      navigate('/login');
    }
    console.log(existingBuilding.id);
    data = { ...data, building_id: building_id };
    data = { ...data, sale_id: existingBuilding.owner.id };
    data = { ...data, buyer_id: parseInt(localStorage.getItem("id")) };
    createCommunication(data).then((response) => {
      if (response) {
        appEnqueueSnackbar("Để lại thông tin thành công", {
          variant: "success",
        });
      }
    });
  };


  return (
    <Container sx={{ mt: "5rem" }}>
      <Grid container spacing={2} sx={{ position: "relative" }}>
        <Grid item md={8} xs={12} gap={1}>
          {existingBuilding && existingBuilding.avatar ? (
           <Carousel autoPlay showArrows={true} verticalSwipe="natural" width="100%" dynamicHeight height="300px" style={{ backgroundColor: "gray" }}>
           <div>
             <img
               src={existingBuilding.avatar}
               alt={existingBuilding.name}
               style={{
                 maxHeight: "500px", 
                 width: "100%", 
                 objectFit: "contain", 
               }}
             />
           </div>
           {existingBuilding.images != undefined &&
             existingBuilding.images.map((image, index) => (
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
         
          ) : (
            <Box
              component="img"
              src="https://file4.batdongsan.com.vn/resize/1275x717/2024/04/25/20240425232124-6609_wm.jpg"
              alt="Placeholder"
              style={{ width: "100%", height: 400 }}
            />
          )}

          <Box my={0.75}>
            <Typography variant="h5">{existingBuilding.name}</Typography>
            <Typography variant="body2" color="grayText">
              {existingBuilding.address}
            </Typography>
            <Typography variant="h5" color="red" fontWeight="bold" mt="10px">
              {existingBuilding.rent_price_description}
            </Typography>
          </Box>

          <Divider />

          <Box
            display="flex"
            justifyContent="space-between"
            my={0.75}
            gap={1}
            textAlign="center"
          >
            <InfoBox
              title="Số tầng"
              value={existingBuilding.number_of_basement}
              optionalInfo=""
            />
            <Divider orientation="vertical" flexItem />
            <InfoBox
              title="Diện tích"
              value={existingBuilding.floor_area + " m2"}
              optionalInfo=""
            />
            <Divider orientation="vertical" flexItem />
            <InfoBox
              title="Loại"
              value={existingBuilding.type_string + " "}
              optionalInfo=""
            />
            <Divider orientation="vertical" flexItem />
            <InfoBox
              title="Quản lý"
              value={
                existingBuilding.manager_name +
                " " +
                existingBuilding.manager_phone_number
              }
              optionalInfo=""
            />
          </Box>
          <Divider />
          <Box my={0.75} color="GrayText">
            <Typography variant="h6" fontWeight="600" color="#616060">
              Giới thiệu
            </Typography>
            <Typography sx={{ ml: "10px" }} fontSize="small">
              Phòng mới cho thuê, thoáng mát, sạch sẽ đường Thích Quảng Đức. Tất
              cả các phòng đều có ban công, cửa sổ thoáng mát cả ngày, lấy ánh
              sáng tự nhiên vào phòng tiết kiệm điện.
              <br />
              <br />
              Trang bị sẵn các thiết bị:
              <br />+ GIƯỜNG, NỆM
              <br />+ MÁY LẠNH
              <br />+ KỆ BẾP
              <br />+ TỦ QUẦN ÁO
              <br />+ BÀN, GHẾ SOFA
              <br />+ WIFI CÁP QUANG TỐC ĐỘ CAO
              <br />+ CAMERA QUAN SÁT 24/24
              <br />
              <br />
              Vị trí thuận tiện qua quận 1, Bình Thạnh, ra khu Phan Xích Long
              sầm uất chỉ 3 phút, 7 phút tới sân bay. Chợ, siêu thị gần nhà
              <br />
              Thuận tiện di chuyển đến các trường Đại Học Mở phút, Đại Học Công
              Nghiệp,....
              <br />
              <br />
              Giờ giấc tự do 24/24 dành cho các bạn đi làm
              <br />
              Hẻm taxi đổ tận cửa tiện việc vận chuyển, đi về khuya an toàn
              <br />
              <br />
              Địa chỉ: 100/83 Thích Quảng Đức, F5, Phú Nhuận
              <br />
              Giá: 3,3 – 3,9 triệu
              <br />
              SDT liên hệ: 0932867255
            </Typography>
          </Box>
          <Box
            display="flex"
            my={0.75}
            justifyContent="space-between"
            mt="20px"
          >
            <Box display="flex" gap={1}>
              <Avatar src={existingBuilding.owner.avatar} alt="avatar" />
              <Stack>
                <Typography fontWeight="600">
                  {existingBuilding.owner.fullname}
                  <CheckCircleIcon
                    sx={{
                      ml: "5px",
                      top: "27px",
                    }}
                    color="success"
                    fontSize="small"
                  />
                </Typography>
                <Typography fontSize="13px" fontWeight="500" color="GrayText">
                  Đã kiểm chứng
                </Typography>
              </Stack>
            </Box>
            <Box display="flex" alignItems="center" color="grey.800">
              <Tooltip title="Chia sẻ">
                <Button color="inherit">
                  <Share />
                </Button>
              </Tooltip>

              <Tooltip title="Báo cáo">
                <Button color="inherit">
                  <FlagOutlined />
                </Button>
              </Tooltip>

              <Tooltip title="Lưu tin">
                <Button color="inherit">
                  <FavoriteBorderOutlined />
                </Button>
              </Tooltip>
            </Box>
          </Box>
          <Divider />
          <Stack spacing={1} my=".75rem">
            <Typography variant="h5" fontWeight="600" color="#616060">
              Danh sách bất động sản xung quanh
            </Typography>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              {similarBuildings &&
                similarBuildings.length > 0 &&
                similarBuildings.map((b, index) => {
                  return (
                    <Grid item key={index} xs={12} sm={6} md={6} lg={6}>
                      <Box
                        onClick={() =>
                          (window.location.href = `/realEstate/${b.id}`)
                        }
                        style={{ height: "100%" }} 
                      >
                        <Card
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            height:"100%",
                            minHeight: "350px",
                          }}
                        >
                          <CardActionArea sx={{ flexGrow: 1 }}>
                            <CardMedia
                              component="img"
                              image={b.avatarUrl}
                              alt={b.name}
                              height="200"
                              sx={{
                                objectFit:"contain",
                              }}
                            />
                            <CardContent>
                              <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                              >
                                {b.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {b.address}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                          <CardActions>
                            <Typography
                              variant="h6"
                              color="red"
                              fontWeight="600"
                              ml="5px"
                            >
                              {b.rentPriceDesc}
                            </Typography>
                          </CardActions>
                        </Card>
                      </Box>
                    </Grid>
                  );
                })}
            </Grid>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            position: { md: "fixed" },
            marginLeft: { xs: "0", md: "800px" },
            zIndex: 1000,
            width: { xs: "100%", md: "400px" },
            transition: "all 2s",
            top: scrolled ? "50px" : "auto",
          }}
        >
          <Box  boxShadow="0px 0px 5px rgba(0, 0, 0, 0.3)"
              borderRadius="15px"
              p="15px"
              >
            <Box display="flex" gap={1}>
              <Avatar src={existingBuilding.owner.avatar} alt="avatar" />
              <Stack>
                <Typography fontWeight="600" fontSize="18px">
                  {existingBuilding.owner.fullname}
                  <CheckCircleIcon
                    sx={{
                      position: { md: "absolute" },
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
                  mb="5px"
                >
                  Đã kiểm chứng
                </Typography>
              </Stack>
            </Box>
            <Divider />
            <Box
              display="flex"
              border="1px solid #00994c"
              my="15px"
              p="8px 20px"
              boxShadow="2px 0px 2px rgba(0,0,0,0.2)"
              borderRadius="10px"
              color="GrayText"
              textAlign="center"
              justifyContent="space-between"
              gap={2}
              
              sx={{
                cursor: "pointer",
                "&:hover": {
                  color: "#00994c",
                },
              }}
              onClick={handleTogglePhoneNumber}
            >
              <Box display="flex">
                <PhoneIcon />
                <Typography fontSize="15px" fontWeight="700" textAlign="center">
                  {showPhoneNumber
                    ? existingBuilding.owner.phone
                    : `${existingBuilding.owner.phone.slice(0, 3)}xxxx`}
                </Typography>
              </Box>

              {showPhoneNumber ? (
                <Typography color="#00994c">Bấm để ẩn số</Typography>
              ) : (
                <Typography color="#00994c">Bấm để hiện số</Typography>
              )}
            </Box>

              <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                  bgcolor: "#fff",
                  color: "#00994c",
                  p: "8px 20px",
                  border: "1px solid #00994c",
                  "&:hover": {
                    bgcolor: "#fff",
                  },
                }}
                startIcon={<EmailIcon />}
                fullWidth
              >
                Gửi tin nhắn
              </Button>

              <Button
            
                variant="contained"
                onClick={handleChatClick}
                sx={{
                  marginTop:"15px",
                  bgcolor: "#fff",
                  color: "#00994c",
                  p: "8px 20px",
                  border: "1px solid #00994c",
                  "&:hover": {
                    bgcolor: "#fff",
                  },
                }}
                startIcon={<MessageIcon />}
                fullWidth
              >
             Trò chuyện trực tiếp
              </Button>
          </Box>
          <Box mt="20px" sx={{ maxWidth: 600, mx: 'auto', bgcolor: 'black', boxShadow: 3, borderRadius: "15px"}}>
      
        <img src={poster2} alt="Shinsegae Duty Free Family Festival" style={{ width:"100%", height:"350px",objectFit:"fill" ,borderRadius:"15px"}} />
     
    </Box>
        </Grid>
      </Grid>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box component="form" onSubmit={handleSubmit(createCommunication2)}>
          <DialogTitle id="responsive-dialog-title">
            {"Liên hệ môi giới"}
          </DialogTitle>
          <DialogContent>
          
            <TextField
              {...register("phone", {
                required: "required",
                pattern: {
                  value: /^\d{6,10}$/,
                  message: "Invalid phone number",
                },
              })}
              error={!!errors.phone}
              helperText={errors.phone?.message}
              fullWidth
              label="Số điện thoại"
              margin="normal"
            />
            <Divider sx={{
            my:"10px"
            
            }}/>
            <Typography>
              Lời nhắn
            </Typography>
            <textarea
              {...register("note")}
              placeholder="để lại lời nhắn"
              
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid gray",
                
                "&:focus": {
                  outline: "none",
                  border: "1px solid gray",
                },
                width:"90%",
                minHeight:"40px",
                "&::placeholder":{
                  color:"gray",
                  fontSize:"12px"
                }
              }}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              type="submit"
              onClick={handleClose}
              variant="contained"
              sx={{
                color: "#fff",
                bgcolor: "#00994c",
                p: "8px 20px",
                border: "1px solid #00994c",
                "&:hover": {
                  bgcolor: "#fff",
                  color: "#00994c",
                  border: "1px solid #00994c",
                },
              }}
            >
              Gửi
            </Button>
            <Button
              onClick={handleClose}
              autoFocus
              variant="outlined"
              sx={{
                bgcolor: "#fff",
                color: "#00994c",
                p: "8px 20px",
                border: "1px solid #00994c",
                "&:hover": {
                  bgcolor: "#fff",
                },
              }}
            >
              Thoát
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </Container>
  );
};
