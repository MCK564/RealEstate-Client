import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { RealEstateCard } from "../components/cards/RealEstateCard";
import { ArrowDropDown, Cached, Tune } from "@mui/icons-material";
import { deepPurple } from "@mui/material/colors";
import {  searchBuildings } from "../utils/ApiFunction";
import { useForm } from "react-hook-form";

const ProfessionalCard = ({ title, link, date }) => {
  const cardStyles = {
    textDecoration: "none",
    alignContent: "center",
  };

  return (
    <a href="#" style={cardStyles}>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          padding: "0.5rem",
          borderRadius: "10px",
          color: "black",
          transition: "all 0.3s",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
          "&:hover": {
            color: "blue",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)",
          },
        }}
      >
        <img
          src={link}
          alt="hehe"
          style={{ width: "100px", height: "95px", borderRadius: "5px" }}
        />
        <Stack spacing={2} marginLeft="5px">
          <Typography>{title}</Typography>
          <Typography variant="body2" fontSize="10px" color="GrayText">
            {date}
          </Typography>
        </Stack>
      </Box>
    </a>
  );
};

const FilterSection = () => {
  const newsData = [
    {
      title: "Ý Tưởng Thiết Kế Nội Thất Chung Cư 80m2 Đẹp Hiện Đại, Tinh Tế",
      date: "24/04/2024",
      link: "https://cdnnews.mogi.vn/news/wp-content/uploads/2024/03/29151916/thiet-ke-noi-that-chung-cu-80m2.jpg",
    },
    {
      title:
        "Tử Vi 12 Con Giáp Ngày 13/12/2023: Tuất Đón Tài Lộc, Dần Gặp Vận Hạn",
      date: "24/04/2024",
      link: "https://cdnnews.mogi.vn/news/wp-content/uploads/2023/12/12232425/tu-vi-12-con-giap-ngay-13-12-2023.jpg",
    },
    {
      title: "Tất Tần Tật Cách Thiết Kế Bếp Nhà Hàng Tiện Lợi, Thông Minh",
      date: "24/04/2024",
      link: "https://cdnnews.mogi.vn/news/wp-content/uploads/2023/10/01172508/thiet-ke-bep-nha-hang.jpg",
    },
    {
      title:
        "Nhà hướng Bắc đặt bếp hướng nào? Lưu ý khi xác định hướng đặt bếp",
      date: "15/04/2024",
      link: "https://cdnnews.mogi.vn/news/wp-content/uploads/2024/04/10105204/nha-huong-bac-dat-bep-huong-nao.jpg",
    },
  ];

  return (
    <Box
      boxShadow="inherit"
      borderRadius="15px"
      sx={{
        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.3)",
        padding: "1rem",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Tin tức
      </Typography>
      <Stack spacing={2}>
        {newsData.map((news, index) => (
          <ProfessionalCard
            key={index}
            title={news.title}
            link={news.link}
            date={news.date}
          />
        ))}
      </Stack>
    </Box>
  );
};

export const IndexPage = () => {
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
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
  }, []);
  const [district, setDistrict] = useState('');
  const [buildings, setBuildings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
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
  const { register, handleSubmit } = useForm();

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  useEffect(() => {
    search();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setParam((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [selectedTypes, setSelectedTypes] = useState([]);

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

  const search = () => {
    const searchData = {
      ...param,
      type: selectedTypes.join(","),
      page: currentPage == 0 ? 0 : currentPage -1,
      district:district
    };

    searchBuildings(searchData).then((response) => {
      if (response) {
        setBuildings(response.buildings);
        setTotalPages(response.totalPages);
      }
    });
  };

  useEffect(() => {
    search();
  }, [currentPage]);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <Container sx={{ mt: "5rem" }}>
      <Grid container spacing={2} sx={{ position: "relative" }}>
        <Grid item xs={12} md={8}>
          <Box
            borderRadius="10px"
            boxShadow="0px 0px 5px rgba(0,0,0,0.2)"
            mb="15px"
            p="20px 10px"
          >
            <Typography variant="h6" marginLeft="4px">
              Bộ lọc
            </Typography>
            <Divider />
            <Box component="form" onSubmit={handleSubmit(search)} mt="5px">
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    {...register("name")}
                    type="text"
                    label="Tên bất động sản"
                    value={param.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    {...register("rentPriceFrom")}
                    type="number"
                    label="Giá lớn hơn"
                    value={param.rentPriceFrom}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
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

                <Grid item xs={12} md={4}>
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
            
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
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
               
                <Grid item xs={12} md={8}>
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
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    fullWidth
                  >
                    Lọc
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Typography variant="h6" gutterBottom>
            Kết quả tìm khu vực Thành Hồ Chí Minh
          </Typography>

          <Stack direction="column" spacing={2}>
            {buildings.map((x) => (
              <RealEstateCard key={x.id} props={x} />
            ))}
          </Stack>
          <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
          shape="rounded"
          variant="outlined"
          sx={{padding:"10px",mt:"5px"}}
        />
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
          <FilterSection />
        </Grid>
      </Grid>
    </Container>
  );
};
