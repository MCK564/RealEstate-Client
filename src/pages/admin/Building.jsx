import { Box, Button, Checkbox, Divider, FormControlLabel, Grid, IconButton, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { adminSearchBuilding } from "../../utils/ApiFunction";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { DetailModal } from "../../components/modals/DetailModal";

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

export const AdminBuilding = () =>{
  const [selectedTypes, setSelectedTypes] = useState([])
  const [buildings, setBuildings] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [district, setDistict] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState({
    id:-1,
    owner:{
      fullname:"",
      avatar:""
    }
  });
  const [detail, setDetail] = useState([]);
  
  useEffect(()=>{
    var detailArray = Object.entries(selectedBuilding);
    detailArray = detailArray.filter(([key, value]) => key!== 'owner');
    detailArray = detailArray.map(([key,value])=>{
      if(key === 'rent_areas'){
          value = value.join(",");
      }
  
      if(key === 'type_string'){
          value = value.join(",")
      }
      return [key, value];
    });
    setDetail(detailArray);
    console.log(detailArray)
  },[selectedBuilding])

  const [modalOpen, setModalOpen] = useState(false);
  const [param, setParam] = useState({
    limit: 5,
    page: 0,
    rentPriceFrom: "",
    rentAreaFrom: "",
    district: "",
    name: "",
    numberOfBasement: "",
    managerName: "",
    onwerName: "",
    type: "",
  });
  const {register, handleSubmit} = useForm();
  const handleViewDetail  = (building) =>{
    setSelectedBuilding(building);
  }
  const handleChange = (e)=>{
    const {name,value } = e.target;
    setParam((prevState)=>({
      ...prevState,
      [name]:value
    }));
  }
  
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false)
      setSelectedBuilding({
        id:-1,
        owner:{
          fullname:"",
          avatar:""
        }
      });
  };
  const handleDistrictChange = (e) =>{
    setDistict(e.target.value) ;
  }
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

  const handleDelete = (id) =>{
    console.log(id);
  }

  const handleCurrentPageChange = (e,value) =>{
    setCurrentPage(value-1);
  }

  const search = () =>{
    const searchData = {
      ...param,
      type: selectedTypes.join(","),
      page: currentPage == 0 ? 0 : currentPage -1,
      district:district
    };
    console.log(searchData);
    adminSearchBuilding(searchData).then((response)=>{
      console.log(response);
      setBuildings(response.buildingEditResponses);
      setTotalPages(response.totalPages);
    })
  }

  useEffect(()=>{
    search();
  },[currentPage]);

  useEffect(()=>{
    if(selectedBuilding.id !== -1){
      handleOpenModal();
    }
  },[selectedBuilding])
    return (
        <>
        <Box marginLeft="65px">
         <Box p="15px">
          <Header
            title="Quản lý bài đăng"
            subtitle="Xem danh sách bài đăng"
          />
        </Box>
        <Box border="1px solid lightGray" p="15px" borderRadius="5px">
        <Stack spacing={2}>

          <Box component="form" onSubmit={handleSubmit(search)}>
          <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                  <TextField
                    {...register("name")}
                    type="text"
                    label="Tên bất động sản"
                    value={param.name}
                    onChange={handleChange}
                    sx={{
                      '@media (max-width: 600px)': {
                        width: '100%' 
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    {...register("rentPriceFrom")}
                    type="number"
                    label="Giá lớn hơn"
                    value={param.rentPriceFrom}
                    onChange={handleChange}
                    sx={{
                      '@media (max-width: 600px)': {
                        width: '100%' 
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    {...register("rentPriceTo")}
                    type="number"
                    label="Giá nhỏ hơn"
                    value={param.rentPriceTo}
                    onChange={handleChange}
                    sx={{
                      '@media (max-width: 600px)': {
                        width: '100%' 
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={3}>
                  <TextField
                    {...register("numberOfBasement")}
                    type="number"
                    label="Số tầng hầm"
                    value={param.numberOfBasement}
                    onChange={handleChange}
                    sx={{
                      '@media (max-width: 600px)': {
                        width: '100%' 
                      }
                    }}
                  />
                </Grid>
            
                <Grid item xs={12} md={3}>
                <TextField
                    {...register("rentAreaFrom")}
                    type="number"
                    label="Diện tích thuê"
                    value={param.rentArea}
                    onChange={handleChange}
                    sx={{
                      '@media (max-width: 600px)': {
                        width: '100%' 
                      }
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                <TextField
                    {...register("managerName")}
                    type="text"
                    label="Quản lý"
                    value={param.managerName}
                    onChange={handleChange}
                    sx={{
                      '@media (max-width: 600px)': {
                        width: '100%' 
                      }
                    }}
                  />
                </Grid>
               
                <Grid item xs={12} md={6}> 
                
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
                <Grid item xs={12} md={6}>
                  <InputLabel>Quận</InputLabel>
                  <Select
                    {...register("district")}
                    labelId="district-label"
                    variant="filled"
                    fullWidth
                    value={district}
                    onChange={handleDistrictChange}
                  >
                    {districts.map((district, index) => {
                      return (
                        <MenuItem value={district.code} key={index}>
                          {district.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </Grid>
                <Grid item xs={12} md={6} alignContent="center">
                  <Button type="submit" variant="contained" color="success" fullWidth  >
                    Tìm kiếm
                  </Button>
                </Grid>
                </Grid>
          </Box>
          <Divider/>

          <Box mt="20px">
            <Typography mb="15px" variant="h5" color="GrayText" >
              {buildings ? "Kết quả tìm kiếm":"Tất cả bài đăng"}
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                <TableRow sx={{ padding: "10px", bgcolor: "cyan" }}>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    ID
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Ảnh đại diện
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Tiêu đề
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Lượt thích
                  </TableCell>
                  <TableCell style={{ position: "sticky", top: 0, zIndex: 1 }}>
                    Thao tác
                  </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                  {buildings && buildings.length > 0 
                  && buildings.map((b,index)=> {
                    return (
                      <TableRow key={index}>
                          <TableCell>
                            {b.id}
                          </TableCell>
                          <TableCell>
                            <img src={b.avatar} style={{borderRadius:"10px",boxShadow:"0px 5px 5px rgba(0,0,0,0.3)"}}/>
                        </TableCell>
                        <TableCell>
                         <Link to={"/realEstate/"+b.id} >
                         {b.name}
                            </Link>  
                        </TableCell>
                        <TableCell>
                            {b.likes.length}
                      
                        </TableCell>
                        <TableCell>
                         <Stack direction="row" spacing={1}>
                           <IconButton color="warning" onClick={()=>handleViewDetail(b)}>
                                <VisibilityIcon/>
                           </IconButton>
                           <IconButton color="error" onClick={()=>handleDelete(b.id)}>
                              <DeleteIcon/>
                           </IconButton >
                         </Stack>
                        </TableCell>
                      </TableRow>
                    )
                  })
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
        </Box>
        </Box>
        <DetailModal open={modalOpen} onClose={handleCloseModal} building={selectedBuilding} owner={selectedBuilding.owner} detail={detail}/>
        </>
    )
}