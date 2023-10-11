import React, { useState, useEffect } from 'react';
import { Input, Button, List } from 'antd';
import ChatMessage from './ChatMessage';

export default function ChatPopUp() {
    const [message, setMessage] = useState(''); // State để lưu tin nhắn mới
    const [messages, setMessages] = useState([]); // State để lưu danh sách tin nhắn
    const [socket, setSocket] = useState(null); // State để lưu kết nối WebSocket

    // Khởi tạo kết nối WebSocket trong useEffect
    useEffect(() => {
        const newSocket = new WebSocket('ws://localhost:8080/ws'); // Điều chỉnh URL WebSocket theo máy chủ Spring Boot của bạn

        newSocket.onopen = () => {
            console.log('Connected to WebSocket server');
        };

        newSocket.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        };

        setSocket(newSocket);

        return () => {
            newSocket.close(); // Đóng kết nối WebSocket khi component unmount
        };
    }, []);

    // Hàm gửi tin nhắn
    const sendMessage = () => {
        if (message && socket) {
            const newMessage = {
                text: message,
                sender: 'You', // Đổi thành tên của người dùng hoặc tên của bạn
            };
            socket.send(JSON.stringify(newMessage));
            setMessage(''); // Xóa nội dung của input sau khi gửi tin nhắn
        }
    };

    return (
        <div className="container py-5">
            <div className="row d-flex justify-content-center">
                <div
                    className="card-header d-flex justify-content-between align-items-center p-3"
                    style={{ borderTop: "4px solid #ffa900" }}
                >
                    <h5 className="mb-0">Chat messages</h5>
                    <div className="d-flex flex-row align-items-center">
                        <span className="badge bg-warning me-3">{messages.length}</span> {/* Hiển thị số lượng tin nhắn */}
                    </div>
                </div>
                <div className="card-body">
                    <List
                        itemLayout="horizontal"
                        dataSource={messages}
                        renderItem={(messageItem) => (
                            <ChatMessage
                                key={messageItem.id}
                                message={messageItem}
                                isSentByYou={messageItem.sender === 'You'}
                            />
                        )}
                    />
                </div>
                <div className="card-footer text-muted d-flex justify-content-start align-items-center p-3">
                    <div className="input-group mb-0">
                        <Input
                            placeholder="Type message"
                            className="form-control"
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <Button
                            type="button"
                            className="btn btn-warning"
                            id="button-addon2"
                            style={{ paddingTop: ".55rem" }}
                            onClick={sendMessage}
                        >
                            SEND
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
