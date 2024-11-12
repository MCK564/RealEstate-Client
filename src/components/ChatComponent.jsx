import React, { useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  InputAdornment,
  Avatar,
  Stack,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import { getChatHistory } from "../utils/ApiFunction";

const token = localStorage.getItem("token");
let stompClient = null;

const ChatComponent = ({ userId, receiver, ownerAvatar, ownerName }) => {
  const [messages, setMessages] = useState([]);
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const messageContainRef = useRef(null);

  const onError = (err) => {
    console.error("Connection error: ", err);
  };

  const registerUser = () => {
    const socket = new SockJS(`http://localhost:8080/ws?token=${token}`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, onConnected, onError);
  };

  const onConnected = () => {
    setIsConnected(true);
    const chatRoom = userId < receiver.id
      ? `/chatroom/${userId}-${receiver.id}`
      : `/chatroom/${receiver.id}-${userId}`;
    stompClient.subscribe(chatRoom, onPrivateMessageReceived);
  };

  const onPrivateMessageReceived = (payload) => {
    const payloadData = JSON.parse(payload.body);
    setMessages((prevMessages) => [...prevMessages, payloadData]);
  };

  const sendMessage = () => {
    if (message.trim() && stompClient) {
      const chatMessageDTO = {
        senderId: userId,
        receiverId: receiver.id,
        content: message,
      };
      stompClient.send("/app/message", {}, JSON.stringify(chatMessageDTO));
      setMessage("");
    }
  };

  const getChatHistory2 = () => {
    getChatHistory(userId, receiver.id).then((response) => {
      if (response) {
        setMessages(response.messages);
        setConversationId(response.id);
      }
    });
  };

  useEffect(() => {
    registerUser();
    getChatHistory2();
    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, []);

  useEffect(() => {
    if (messageContainRef.current) {
      messageContainRef.current.scrollTop = messageContainRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <IconButton
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "blue",
          color: "white",
          zIndex: 1000,
        }}
      >
        <ChatIcon />
      </IconButton>

      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            bottom: "80px",
            right: "20px",
            width: "350px",
            height: "400px",
            backgroundColor: "#E5FFCC",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
            borderRadius: 2,
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            padding: 2,
          }}
        >
          <Stack direction="row" spacing={1.5} sx={{ marginBottom: "2px" }}>
            <Avatar
              alt={receiver.fullname}
              src={receiver.avatar}
              sx={{ width: 40, height: 40, border: "1px solid #808080" }}
            />
            <Typography variant="h5" lineHeight={1.6}>
              {receiver.fullname}
            </Typography>
          </Stack>

          <Box
            ref={messageContainRef}
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              marginBottom: 1,
              paddingRight: 1,
              backgroundColor: "#fff",
              boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
              borderRadius: 2,
            }}
          >
            {messages.map((msg, index) =>{
               const isCurrentUser = String(msg.sender_id) === String(userId);
               const isLastMessageFromSender = 
                 index === messages.length - 1 || messages[index + 1].sender_id !== msg.sender_id;

              return (
                
              
                  <Box
                  key={index}
                  sx={{
                    margin: 1,
                   textAlign: isCurrentUser ? "right" : "left",
                  }}
                >
                 
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent={isCurrentUser ? "flex-end" : "flex-start"}
                    sx={{
                      marginLeft: isCurrentUser || isLastMessageFromSender ? 0 : "38px",
                      marginRight: !isCurrentUser || isLastMessageFromSender ? 0 : "38px",
                    }}   >
                     {!isCurrentUser && (index === 0 || isLastMessageFromSender) && (
          <Avatar
            alt={receiver.fullname}
            src={receiver.avatar}
            sx={{ width: 30, height: 30, border: "1px solid #808080" }}
          />
        )}
                    <Typography backgroundColor="#E5FFCC" p={1} borderRadius={4}>{msg.message} </Typography>
                    {isCurrentUser && (index === 0 || isLastMessageFromSender) && (
          <Avatar
            alt={ownerName}
            src={ownerAvatar}
            sx={{ width: 30, height: 30, border: "1px solid #808080" }}
          />
        )}
                  </Stack>
                </Box>
                
                  
              )
            } )}
          </Box>

          <TextField
            variant="outlined"
            fullWidth
            placeholder="Type a message..."
            value={message}
            sx={{
              backgroundColor: "#fff",
              boxShadow: "0px 0px 5px rgba(0,0,0,0.2)",
            }}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={sendMessage} color="success" edge="end">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      )}
    </>
  );
};

export default ChatComponent;
