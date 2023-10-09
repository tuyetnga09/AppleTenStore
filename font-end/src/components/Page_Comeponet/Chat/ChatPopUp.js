import React, { useState, useEffect } from 'react';
import { Modal, Input, Button } from 'antd';

export default function ChatModal({ socket }) {
    const [message, setMessage] = useState('');

    const sendMessage = () => {
        if (message && socket) {
            const newMessage = {
                text: message,
                sender: 'You',
            };
            socket.send(JSON.stringify(newMessage));
            setMessage('');
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
                        <span className="badge bg-warning me-3">20</span>
                    </div>
                </div>
                <div
                    className="card-body"
                    data-mdb-perfect-scrollbar="true"
                    style={{ position: "relative", height: 400, overflowY: 'auto' }}
                >
                    {message.map((message, index) => (
                        <div key={index} className="d-flex flex-row justify-content-start">
                            <div>
                                <p className="small p-2 ms-3 mb-3 rounded-3" style={{ backgroundColor: "#f5f6f7" }}>
                                    {message.text}
                                </p>
                            </div>
                        </div>
                    ))}
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
