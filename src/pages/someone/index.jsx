import { Avatar, Box, Container, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {
  findBuildingBySomeoneId,
  getUserDetailById,
  findContactedsById,
} from "../../utils/ApiFunction";
import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import { RealEstateCard } from "../../components/cards/RealEstateCard";

export const SomeOnePage = () => {
    const param = useParams();
    const id = param.id;
  const [listPost, setListPost] = useState([]);
  const [currentUserDetail, setCurrentUserDetail] = useState(null);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    // var currentURL = window.location.href.split("/");
    // const id = currentURL[currentURL.length - 1];
    findBuildingBySomeoneId(id).then((response) => {
      if (response) {
        console.log(response);
        setListPost(response);
      }
    });

    getUserDetailById(id).then((response) => {
      if (response) {
        setCurrentUserDetail(response);
      }
    });

    findContactedsById(id).then((response) => {
      if (response) {
        console.log(response);
        setContacts(response);
      }
    });
  }, [id]);

  return (
    <>
      <Container sx={{ mt: "5rem" }}>
        <Grid container spacing={2} sx={{ position: "relative" }}>
          <Grid item xs={12} md={12}>
            <Box
              borderRadius="10px"
              boxShadow="0px 0px 5px rgba(0,0,0,0.2)"
              mb="15px"
              p="20px 10px"
            >
                    {currentUserDetail &&
              <Grid container spacing={2} sx={{ position: "relative" }}>
                <Grid item xs={12} md={5}>
                  <Stack direction="row" spacing={2}>
                
                    <Avatar
                      alt={currentUserDetail.fullname}
                      src={currentUserDetail.avatar}
                      sx={{ width: 110, height: 110,border: "1px solid #808080" }}
                    />
                    <Stack spacing={0}>
                  <Typography variant="h3" color="" fontWeight="bold">
                    {currentUserDetail.fullname}
                  </Typography>
                        <Typography variant="h7" color="GrayText" fontWeight="lighter" marginBottom="2px" >
                            Đã liên hệ {contacts && contacts.length}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                        {contacts && contacts.length > 0 &&
                        contacts.map((ct,key)=>{
                            return (
                                <>
                                <Link to={`/user/${ct.id}`} key={key}>
                                        <Avatar
                                    alt={ct.fullname}
                                    src={ct.avatar}
                                    sx={{ width: 30, height: 30,border: "1px solid #808080"}}
                                    /> 
                                </Link>
                                </>
                            )
                        })
                        }
                    </Stack>
                    </Stack>
                            
                  
                  </Stack>
                </Grid>
              </Grid> }
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              borderRadius="10px"
              boxShadow="0px 0px 5px rgba(0,0,0,0.2)"
              mb="15px"
              p="20px 10px"
            >
              <Header title="Giới thiệu" />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            <Box
              borderRadius="10px"
              boxShadow="0px 0px 5px rgba(0,0,0,0.2)"
              mb="15px"
              p="20px 10px"
            >
                <Stack spacing={2}>
                     {listPost && listPost.length >0 && listPost.map((post, key)=>{
                return (
                    <>

                    <RealEstateCard key={key} props={post}/>
                    </>
                )
            })}
                </Stack>
           
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};
