import React, { useEffect, useState } from "react";
import { Input, Button, List } from "antd";

const ChatManager = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Kết nối WebSocket và xử lý tin nhắn
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080/ws");

        socket.onopen = () => {
            console.log("Connected to WebSocket server");
        };

        socket.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        };

        // Đóng kết nối WebSocket khi component unmount
        return () => {
            socket.close();
        };
    }, []);

    // Gửi tin nhắn
    const sendMessage = () => {
        if (message) {
            const newMessage = {
                text: message,
                sender: "You",
            };
            // Gửi tin nhắn đến máy chủ WebSocket
            socket.send(JSON.stringify(newMessage));
            setMessage(""); // Xóa nội dung tin nhắn sau khi gửi
        }
    };

    return (
        <div>
            <List
                dataSource={messages}
                renderItem={(item) => (
                    <List.Item>{item.sender}: {item.text}</List.Item>
                )}
            />
            <Input
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <Button onClick={sendMessage}>Send</Button>
        </div>
    );
};

export default ChatManager;
