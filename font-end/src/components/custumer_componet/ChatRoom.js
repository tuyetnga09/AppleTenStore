import React, { useState, useEffect } from 'react';
import Header from "../Page_Comeponet/layout/Header";
import Footer from "../Page_Comeponet/layout/Footer";
import {
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from '@material-ui/core';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import Cookies from 'js-cookie';

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [stompClient, setStompClient] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = Stomp.over(socket);

    client.connect({}, () => {
      setStompClient(client);
    });

    return () => {
      if (client && client.connected) {
        client.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (!stompClient) return;

    const subscription = stompClient.subscribe('/topic/messages', (message) => {
      const receivedMessage = JSON.parse(message.body);

      if (receivedMessage.content !== message) {
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);

        // Lưu tin nhắn vào cookie
        const storedMessages = Cookies.get('chatMessages');
        const updatedMessages = storedMessages
          ? JSON.parse(storedMessages)
          : [];
        updatedMessages.push(receivedMessage);
        Cookies.set('chatMessages', JSON.stringify(updatedMessages));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [stompClient]);

  useEffect(() => {
    // Khôi phục tin nhắn từ cookie khi tải lại trang
    const storedMessages = Cookies.get('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    if (message.trim()) {
      const chatMessage = {
        nickname,
        content: message,
      };

      stompClient.send('/app/chat', {}, JSON.stringify(chatMessage));
      setMessage('');
    }
  };

  return (
    <div>
      <Header />
      <List>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>{msg.nickname.charAt(0)}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography variant="subtitle1">{msg.nickname}</Typography>
              }
              secondary={msg.content}
            />
          </ListItem>
        ))}
      </List>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
        // bat buuoc phai viet, sau co admin se lay theo tai khoan admin 
         placeholder="Name customer: "
          value={nickname}
          onChange={handleNicknameChange}
          autoFocus
        />
        <TextField
          placeholder="Bạn cần tôi giúp gì?"
          value={message}
          onChange={handleMessageChange}
          fullWidth
        />
        <IconButton onClick={sendMessage} disabled={!message.trim()}>
          send
        </IconButton>
      </div>
      <Footer />
    </div>
  );
};

export default ChatRoom;
