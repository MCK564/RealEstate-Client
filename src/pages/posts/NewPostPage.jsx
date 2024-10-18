import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import {
  createOrUpdateBuilding,
  uploadAvatar2,
  uploadSlideImages2,
  getBuildingEdit,
  getCommunicationByBuildingId,
} from "../../utils/ApiFunction";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import appEnqueueSnackbar from "../../utils/AppSnackbar";
import { useLocation, useNavigate } from "react-router-dom";
import { PaymentModal } from "../../components/modals/PaymentModal";

export const NewPostPage = () => {

  const [remainPost, setRemainPost] = useState(0);
  const [postId, setPostId] = useState(-1);
  const [existingBuilding, setExistingBuilding] = useState({});
  const [district, setDistrict] = useState('');



  const handleDistrictchange = (event) => {
    setDistrict(event.target.value);
  };



  const location = useLocation();

  
  
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    ward: "",
    structure: "",
    number_of_basement: "", 
    floor_area: "", 
    direction: "",
    rent_price: "", 
    rent_price_description: "", 
    service_fee: "", 
    car_fee: "",
    rent_areas: "",
    motorbike_fee: "", 
    overtime_fee: "", 
    water_fee: "", 
    electricity_fee: "", 
    deposit: "",
    rent_time: "", 
    decoration_time: "",
    brokerage_fee: "",
    note: "",
    link_of_building: "",
    manager_name: "", 
    manager_phone_number: "", 
    district: "",
    type: [],
    payment: "",
    map: "",
    id: "",
    owner_id:"",
    status:1,
  });
  useEffect(() => {
    if (existingBuilding) {
      setFormData({
        name: existingBuilding.name || "",
        street: existingBuilding.street || "",
        ward: existingBuilding.ward || "",
        structure: existingBuilding.structure || "",
        number_of_basement: existingBuilding.number_of_basement || "", 
        floor_area: existingBuilding.floor_area || "", 
        direction: existingBuilding.direction || "",
        rent_price: existingBuilding.rent_price || "", 
        rent_price_description: existingBuilding.rent_price_description || "", 
        service_fee: existingBuilding.service_fee || "", 
        car_fee: existingBuilding.car_fee || "",
        rent_areas: existingBuilding.rent_areas || "",
        motorbike_fee: existingBuilding.motorbike_fee || "", 
        overtime_fee: existingBuilding.overtime_fee || "", 
        water_fee: existingBuilding.water_fee || "", 
        electricity_fee: existingBuilding.electricity_fee || "", 
        deposit: existingBuilding.deposit || "",
        rent_time: existingBuilding.rent_time || "", 
        decoration_time: existingBuilding.decoration_time || "",
        brokerage_fee: existingBuilding.brokerage_fee || "",
        note: existingBuilding.note || "",
        link_of_building: existingBuilding.link_of_building || "",
        manager_name: existingBuilding.manager_name || "", 
        manager_phone_number: existingBuilding.manager_phone_number || "", 
        district: existingBuilding.district || "",
        type: existingBuilding.type || [],
        payment: existingBuilding.payment || "",
        map: existingBuilding.map || "",
        id: existingBuilding.id || "",
        owner_id:existingBuilding.owner_id || "",
        status:existingBuilding.status || "",
      });
    }
  }, [existingBuilding]);

  const [selectedTypes, setSelectedTypes] = useState([]);
  const [communications, setCommunications] = useState([]);
  const navigate = useNavigate();
  const districts = [
    { code: "THANH_PHO_THU_DUC", name: "Thành phố Thủ Đức" },
    { code: "QUAN_1", name: "Quận 1" },
    { code: "QUAN_2", name: "Quận 2" },
    { code: "QUAN_3", name: "Quận 3" },
    { code: "QUAN_4", name: "Quận 4" },
    { code: "QUAN_5", name: "Quận 5" },
    { code: "QUAN_6", name: "Quận 6" },
    { code: "QUAN_7", name: "Quận 7" },
    { code: "QUAN_8", name: "Quận 8" },
    { code: "QUAN_9", name: "Quận 9" },
    { code: "QUAN_10", name: "Quận 10" },
    { code: "QUAN_11", name: "Quận 11" },
    { code: "QUAN_12", name: "Quận 12" },
    { code: "QUAN_BINH_TAN", name: "Quận Bình Tân" },
    { code: "QUAN_BINH_THANH", name: "Quận Bình Thạnh" },
    { code: "QUAN_GO_VAP", name: "Quận Gò Vấp" },
    { code: "QUAN_PHU_NHUAN", name: "Quận Phú Nhuận" },
    { code: "QUAN_TAN_BINH", name: "Quận Tân Bình" },
    { code: "QUAN_TAN_PHU", name: "Quận Tân Phú" },
    { code: "HUYEN_BINH_CHANH", name: "Huyện Bình Chánh" },
    { code: "HUYEN_CAN_GIO", name: "Huyện Cần Giờ" },
    { code: "HUYEN_CU_CHI", name: "Huyện Củ Chi" },
    { code: "HUYEN_HOC_MON", name: "Huyện Hóc Môn" },
    { code: "HUYEN_NHA_BE", name: "Huyện Nhà Bè" },
  ];
  const typeCodes = [
    { code: "NOI_THAT", name: "Nội thất" },
    { code: "NGUYEN_CAN", name: "Nguyên căn" },
    { code: "TANG_TRET", name: "Tầng trệt" },
    { code: "CHO_THUE", name: "Cho thuê" },
    { code: "BAN", name: "Bán" },
  ];
  const handleTypeChange = (event) => {
    const { value } = event.target;
    setSelectedTypes((prevSelectedTypes) => {
      if (prevSelectedTypes.includes(value)) {
        return prevSelectedTypes.filter((type) => type !== value);
      } else {
        return [...prevSelectedTypes, value];
      }
    });
  };
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
 
  const closeModal = () =>{setShowModal(false);}
  const { register, handleSubmit } = useForm();
  const { register: registerAvatar, handleSubmit: handleUpdateAvatar } =
    useForm();
  const { register: registerSlideImage, handleSubmit: handleUpdateSlideImage } =
    useForm();
  const onSubmit = (data) => {

    if(postId === -1 ){
      data["rent_areas"] = data["rent_areas"]
      .split(" , ")
      .map((item) => parseInt(item));
    data["owner_id"] = localStorage.getItem("id");
    data["status"] = 1;
    data["type"] = data["type"].join(",");
      if(remainPost<=0) {
        appEnqueueSnackbar("Bạn đã sử dụng hết lượt đăng bài, vui lòng mua thêm", {
          variant: "warning"
        });
        return ;
      }
    createOrUpdateBuilding(data).then((response) => {
      if (response) {
          appEnqueueSnackbar("Đăng bài thành công", {
            variant: "success",
          });
        navigate("/owner_post");
      }
    });
    }
  else{
    var formData2 = formData;
    formData2.type = selectedTypes.join(",")
    formData2.district = district;
    formData2.rent_areas = data["rent_areas"]
    .split(",")
    .map((item) => parseInt(item));
    createOrUpdateBuilding(formData2).then((response) => {
      if (response) {

          appEnqueueSnackbar("Cập nhật thành công", {
            variant: "success",
          });
        navigate("/owner_post");
      }
    });
    
  }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    setRemainPost(localStorage.getItem("remain_posts"));
    var currentURL = window.location.href;
    currentURL = new URL(currentURL);
    const searchParams = new URLSearchParams(currentURL.search);
    const id = searchParams.get("id");
    if (id != null) {
      setPostId(id);
      getBuildingEdit(id).then((response) => {
        console.log(response);
        setExistingBuilding(response);
        setDistrict(response.district);
        setSelectedTypes(response.type.split(","))
      });

      getCommunicationByBuildingId(id).then((response) => {
        if (response) {
          setCommunications(response.communicationResponseList);
        }
      });
    }
    else{
    
        const queryParams = new URLSearchParams(location.search);
    
        const paymentStatus = queryParams.get('payment-status');
        const currentPost = queryParams.get('current-post');
        if(postId === -1){
          if(paymentStatus==='success' ){
            appEnqueueSnackbar("Thanh toán thành công, vui lòng kiểm tra lại lượt đăng bài", {
              variant: "success"
            });
          }
          else if(paymentStatus==="failed"){
            appEnqueueSnackbar("Thanh toán thất bại, vui lòng kiểm tra và thực hiện lại giao dịch", {
              variant: "warning"
            });
          }
      
          if(currentPost!==null){
            setRemainPost(parseInt(currentPost))
            localStorage.setItem("remain_posts", parseInt(currentPost));
          }
        }
        
  
    }
  }, []);

  const updateAvatarr = (data) => {
    console.log(data.avatar[0]);
    uploadAvatar2(postId, data.avatar[0]).then((response) => {
      console.log(response);
      if (response) {
        appEnqueueSnackbar("Cập nhật avatar thành công", {
          variant: "success",
        });
        navigate("/owner_post");
      } else {
        appEnqueueSnackbar("Cập nhật avatar không thành công do nội dung ảnh không phù hợp", {
          variant: "error",
        });
      }
    });
  };

  const updateSlideImages = (data) => {
    const imagesArray = Object.values(data.images);
    uploadSlideImages2(postId, imagesArray).then((response) => {
      if (response) {
        appEnqueueSnackbar("Cập nhật slide thành công", { variant: "success" });
        navigate("/owner_post");
      } else {
        appEnqueueSnackbar("Cập nhật slide không thành công do nội dung ảnh không phù hợp", {
          variant: "error",
        });
      }
    });
  };


  return (
    <Container sx={{ mt: "5rem" }}>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        border={1}
        p="20px"
        borderRadius="15px"
        boxShadow="0px 5px 10px rgba(0,0,0,0.4)"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container spacing={2} >
              <Grid item xs={8}>
                   <Typography variant="h4" fontWeight="600">
              {postId !== -1 ? "Cập nhật bài đăng" : "Tạo mới bài đăng"}
            </Typography>
              </Grid>
              <Grid item xs={4}>
                   <Typography variant="h6" fontWeight="500" color="GrayText">
             Số lượt đăng còn lại : {remainPost} 
             <IconButton color="success" onClick={openModal}>+</IconButton>
            </Typography>
              </Grid>
       
         
            </Grid>
        
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("name")}
              label="Tên"
              variant="filled"
              fullWidth
              required
              onChange={handleChange}
              value={formData.name}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("street")}
              label="Đường"
              variant="filled"
              fullWidth
              required
              onChange={handleChange}
              value={formData.street}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("ward")}
              label="Phường"
              variant="filled"
              fullWidth
              value={formData.ward}
              onChange={handleChange}
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("structure")}
              label="Cấu trúc"
              variant="filled"
              value={formData.structure}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("number_of_basement")}
              label="Số tầng"
              type="number"
              variant="filled"
              fullWidth
              value={formData.number_of_basement}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("floor_area")}
              label="Diện tích sàn"
              variant="filled"
              fullWidth
              type="number"
              value={formData.floor_area}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("direction")}
              label="Hướng"
              variant="filled"
              value={formData.direction}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("rent_price")}
              label="Giá thuê dạng số"
              variant="filled"
              fullWidth
              value={formData.rent_price}
              onChange={handleChange}
              type="number"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("rent_price_description")}
              label="Mô tả giá thuê"
              variant="filled"
              value={formData.rent_price_description}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("service_fee")}
              label="Phí dịch vụ"
              variant="filled"
              value={formData.service_fee}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("car_fee")}
              label="Phí đỗ xe"
              variant="filled"
              value={formData.car_fee}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("rent_areas")}
              label="Diện tích thuê"
              variant="filled"
              value={formData.rent_areas}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("motorbike_fee")}
              label="Phí đỗ xe máy"
              variant="filled"
              value={formData.motorbike_fee}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("overtime_fee")}
              label="Phí quá hạn"
              variant="filled"
              value={formData.overtime_fee}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("water_fee")}
              label="Phí nước"
              variant="filled"
              value={formData.water_fee}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("electricity_fee")}
              label="Phí điện"
              variant="filled"
              value={formData.electricity_fee}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("deposit")}
              label="Tiền đặt cọc"
              variant="filled"
              value={formData.deposit}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("rent_time")}
              label="Thời gian thuê"
              variant="filled"
              value={formData.rent_time}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("decoration_time")}
              label="Thời gian trang trí"
              variant="filled"
              value={formData.decoration_time}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("brokerage_fee")}
              label="Phí môi giới"
              variant="filled"
              fullWidth
              value={formData.brokerage_fee}
              onChange={handleChange}
              type="number"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("note")}
              label="Ghi chú"
              variant="filled"
              value={formData.note}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("linkofbuilding")}
              label="Link toà nhà"
              variant="filled"
              value={formData.link_of_building}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("manager_name")}
              label="Tên quản lý"
              variant="filled"
              value={formData.manager_name}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("manager_phone_number")}
              label="Số điện thoại quản lý"
              variant="filled"
              value={formData.manager_phone_number}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputLabel>Quận</InputLabel>
            <Select
        value={district}
        onChange={handleDistrictchange}
        label="Quận"
        variant="filled"
        fullWidth
      >
        {districts.map((districtItem, index) => (
          <MenuItem key={index} value={districtItem.code} selected={districtItem.code === district}>
            {districtItem.name}
          </MenuItem>
        ))}
      </Select>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <InputLabel id="type-label">Loại</InputLabel>
            {typeCodes.map((type, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    {...register("type")}
                    checked={selectedTypes.includes(type.code)}
                    onChange={handleTypeChange}
                    value={type.code}
                  />
                }
                label={type.name}
              />
            ))}
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("payment")}
              label="Phương thức thanh toán"
              variant="filled"
              type="hidden"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("map")}
              label="Bản đồ"
              variant="filled"
              type="hidden"

            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              {...register("id")}
              label="ID"
              variant="filled"
              type="hidden"
              value={formData.id}
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth color="success">
             {postId === -1 ? "Tạo mới" : "Cập nhật"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      {postId !== -1 && (
        <>
          <Box
            component={"form"}
            onSubmit={handleUpdateAvatar(updateAvatarr)}
            border={1}
            p="20px"
            borderRadius="15px"
            boxShadow="0px 5px 10px rgba(0,0,0,0.4)"
            margin="20px 0"
          >
            <Typography variant="h4" fontWeight="600">
              Cập nhật ảnh đại diện
            </Typography>
            <Grid container columnSpacing={2} alignItems="center" gap={1}>
              <Grid item sx={12} md={4}>
                <TextField
                  {...registerAvatar("avatar")}
                  type="file"
                  variant="outlined"
                />
              </Grid>
              <Grid item sx={12} md={4}>
                {existingBuilding && existingBuilding.avatar && (
                  <img
                    src={existingBuilding.avatar}
                    alt="avatar"
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "15px",
                      mt: "5px",
                      boxShadow: "0px 5px 5px rgba(0,0,0,0.3)",
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
            component={"form"}
            onSubmit={handleUpdateSlideImage(updateSlideImages)}
            border={1}
            p="20px"
            borderRadius="15px"
            boxShadow="0px 5px 10px rgba(0,0,0,0.4)"
          >
            <Typography variant="h4" fontWeight="600">
              Cập nhật slide
            </Typography>
            <Grid container columnSpacing={2} alignItems="center" gap={1}>
              <Grid item sx={12} md={4}>
                <Box>
                  <input
                    {...registerSlideImage("images")}
                    type="file"
                    multiple
                  />
                </Box>
              </Grid>
              <Grid item sx={12} md={4} gap="2">
                <Stack direction="row" spacing={2}>
                  {existingBuilding &&
                    existingBuilding.images &&
                    existingBuilding.images.length > 0 &&
                    existingBuilding.images.map((src, index) => {
                      return (
                        <>
                          <img
                            key={index}
                            src={src}
                            alt="avatar"
                            style={{
                              width: "150px",
                              height: "150px",
                              borderRadius: "15px",
                              boxShadow: "0px 5px 5px rgba(0,0,0,0.3)",
                            }}
                          />
                        </>
                      );
                    })}
                </Stack>
              </Grid>
              <Grid item sx={12} md={12}>
                <Button type="submit" variant="contained" color="success">
                  Cập nhật
                </Button>
              </Grid>
            </Grid>
          </Box>
          <Box
            border={1}
            p="20px"
            borderRadius="15px"
            margin="20px 0"
            boxShadow="0px 5px 10px rgba(0,0,0,0.4)"
          >
            <Typography variant="h4" fontWeight="600" mb="10px">
              Danh sách người dùng thích post này
            </Typography>

            <Table>
              <TableHead>
                <TableRow sx={{ padding: "10px", bgcolor: "pink" }}>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Người thích
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Số điện thoại
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Email
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {existingBuilding &&
                  existingBuilding.likes &&
                  existingBuilding.likes.length > 0 &&
                  existingBuilding.likes.map((user, index) => {
                    return (
                      <>
                        <TableRow key={index}>
                          <TableCell>
                            <Stack direction="row" spacing={1}>
                              <Avatar src={user.avatar} alt={user.name} />
                              <Typography variant="h6" textAlign="center">
                                {user.fullname}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>{user.phone}</TableCell>
                          <TableCell>{user.email}</TableCell>
                        </TableRow>
                      </>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>

          <Box
            border={1}
            p="20px"
            borderRadius="15px"
            boxShadow="0px 5px 10px rgba(0,0,0,0.4)"
          >
            <Typography variant="h4" fontWeight="600" mb="10px">
              Danh sách lời nhắn
            </Typography>
            <Table>
              <TableHead>
                <TableRow sx={{ padding: "10px", bgcolor: "#00994c" }}>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Người nhắn
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Số điện thoại
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Nội dung tin nhắn
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {communications &&
                  communications.length > 0 &&
                  communications.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <Stack direction="row" spacing={1}>
                            <Avatar
                              src={item.buyer.avatar}
                              alt={item.buyer.name}
                            />
                            <Typography variant="h6" textAlign="center">
                              {item.buyer.fullname}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.note}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>
        </>
      )}
     {showModal && <PaymentModal open={showModal} onClose={closeModal} /> } 
    </Container>
  );
};
