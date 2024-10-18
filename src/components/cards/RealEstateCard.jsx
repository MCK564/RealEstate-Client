import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link as RouterLink } from "react-router-dom";
import { addToFavorite } from "../../utils/ApiFunction";
import Crop32Icon from '@mui/icons-material/Crop32';
import { useNavigate } from "react-router-dom";

const user_id = localStorage.getItem("id");
export const RealEstateCard = ({ props }) => {
  const {
    id,
    name,
    address,
    rentPriceDesc,
    avatarUrl,
    owner,
    numberOfBasement,
    liker_ids,
    floorArea,
    modified_date,
  } = props;
  const owner1 = owner;
  const liker_ids1 = liker_ids;
  const modified_date1 = modified_date;
  const [liked, setLiked] = useState(false);
  const [date, setDate] = useState("");
  const handleLikeClick = () => {
    addToFavorite(id, !liked).then((response) => {
      console.log(response);
    });
    setLiked(!liked);
  };
  useEffect(() => {
    if (liker_ids1.includes(parseInt(user_id))) {
      setLiked(true);
    }
    if (modified_date1 && modified_date1.length >= 3) {
      setDate(modified_date1[2] + "-" + modified_date1[1] + "-" + modified_date1[0]);
    }
  }, []);
  const navigate = useNavigate();
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: "10px",
        boxShadow: "0px 4px 5px rgba(0, 0, 0, 0.1)",
        bgcolor: "#fff",
        textDecoration: "none",
        "&:hover": {
          boxShadow: "2px 5px 19px rgba(0, 0, 0, 0.4)",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        textAlign="center"
        padding="10px 5px 0px"
        bgcolor="#c0c0c0"
        sx={{
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
        }}
      >
        <Avatar
          alt={owner1.fullname}
          src={owner1.avatar}
          sx={{ bgcolor: "deepskyblue" }}
        />
        <Stack sx={{ textAlign: "center" }}>
          <Typography fontWeight="500" textAlign="left" variant="h6">
            {owner1.fullname}
          </Typography>
          <Typography
            sx={{
              color: "#606060",
              fontFamily: "cursive",
              paddingBottom: "5px",
              fontSize:"13px"
            }}
          >
             đăng vào ngày {date}
          </Typography>
        </Stack>
      </Stack>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box onClick={()=> window.location.href=`/realEstate/${id}`} sx={{cursor:"pointer"}}>
            <img
              src={avatarUrl}
              style={{
                minHeight:"200px",
                maxHeight: "250px",
                width: "100%",
                objectFit: "contain",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ p: 2, pt: 0 }}>
              <Typography variant="h5" pt="5px" fontWeight="600">{name}</Typography>
              <Stack
               sx={{
                margin:{md:"10px"}
               }}
             
              >
                {[
                  {
                    text: address,
                    icon: <LocationOnIcon fontSize="small" color="inherit" />,
                  },
                  {
                    text: owner1.phone,
                    icon: <LocalPhoneIcon fontSize="small" color="inherit" />,
                  },
                  {
                    text: "Số tầng: " + numberOfBasement,
                    icon: <ApartmentIcon fontSize="small" color="inherit" />,
                  },
                  {
                    text:"Diện tích: " +floorArea+" m2",
                    icon:<Crop32Icon fontSize="small"/>
                  }
                ].map((item) => (
                  <>
                    <Box
                      color="gray"
                      size="small"
                      sx={{ textTransform: "none", px: 0 }}
                      display="flex"
                      gap={1}
                    >
                     {item.icon} {item.text}
                    </Box>
                  </>
                ))}
              </Stack>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-end" 
              sx={{
                marginTop:{md:"20px"}
              }}
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color="brown"
                  textAlign="left"
                >
                  ${rentPriceDesc}
                </Typography>
                <IconButton
                  color="error"
                  sx={{ position: "relative" }}
                  onClick={handleLikeClick}
                >
                  {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </Stack>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};
