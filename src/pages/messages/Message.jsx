import {
  Box,
  Container,
  Grid,
  Stack,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getAllConnecteds } from "../../utils/ApiFunction";
import ChatComponent2 from "../../components/ChatComponent2";

const yourId = localStorage.getItem("id");
const yourAvatar = localStorage.getItem("avatar");
const yourFullname = localStorage.getItem("fullname");
export const MessagePage = ({ userId }) => {
  const [selectReceiverId, setSelectedReceiverId] = useState(null);
  const [connecteds, setConnecteds] = useState([]);
  const [receiver, setReceiver] = useState({
    id: "",
    fullname: "",
    avatar: "",
  });

  useEffect(() => {
    getAllConnecteds().then((response) => {
      if (response) {
        setConnecteds(response.connecteds);
        let receiver1 = response.connecteds[0].id;
        setSelectedReceiverId(receiver1);
        setReceiver({
          ...receiver,
          id: receiver1.id,
          fullname: receiver1.full_name,
          avatar: receiver1.avatar_url,
        });
      }
    });
  }, []);

  useEffect(() => {}, [selectReceiverId]);

  const handleSelectReceiver = (id) => {
    setSelectedReceiverId(id);
    let connectFiltered = connecteds.filter((cn) => cn.id === id);
    connectFiltered = connectFiltered[0];
   
    setReceiver({
      ...receiver,
      id: connectFiltered.id,
      fullname: connectFiltered.full_name,
      avatar: connectFiltered.avatar_url,
    });
  };

  return (
    <>
      <Container sx={{ mt: "5rem" }}>
        <Box
          borderRadius="10px"
          boxShadow="0px 0px 5px rgba(0,0,0,0.2)"
          mb="15px"
          p="20px 10px"
        >
          <Header title="Trò chuyện" subtitle="" />

          <Grid container spacing={2}>
            <Grid item xs={4} sm={1} md={3}>
              <Box boxShadow="0px 0px 5px rgba(0,0,0,0.2)" p="10px">
                <Stack spacing={1.5}>
                  {connecteds &&
                    connecteds.length > 0 &&
                    connecteds.map((connect, index) => (
                      <Box
                        key={index}
                        py={0.5}
                        onClick={() => handleSelectReceiver(connect.id)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            backgroundColor: "#E5FFCC",
                          },
                          backgroundColor:
                            selectReceiverId === connect.id && "#E5FFCC",
                        }}
                      >
                        <Stack direction="row" spacing={1.5}>
                          <Avatar
                            alt={connect.full_name}
                            src={connect.avatar_url}
                            sx={{
                              width: 40,
                              height: 40,
                              border: "1px solid #808080",
                            }}
                          />
                          <Stack spacing={0.5}>
                            {" "}
                            {/* Compact stack */}
                            <Typography
                              variant="subtitle1"
                              fontWeight="bold"
                              lineHeight={1.2}
                            >
                              {connect.full_name}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="GrayText"
                              fontWeight="lighter"
                              lineHeight={1.2}
                            >
                              {connect.sender_name === connect.full_name
                                ? connect.full_name
                                : "bạn:"}{" "}
                              {connect.last_message}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Divider sx={{ padding: "2px" }} />
                      </Box>
                    ))}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={8} sm={11} md={9}>
              {selectReceiverId && receiver.id &&(
                <ChatComponent2
                  key={selectReceiverId}
                  userId={yourId}
                  receiver={receiver}
                  ownerAvatar={yourAvatar}
                  ownerName={yourFullname}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};
