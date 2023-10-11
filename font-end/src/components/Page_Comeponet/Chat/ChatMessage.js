import React from 'react';

const ChatMessage = ({ message }) => {
    return (
        <div className="chat-message">
            <div className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}>
                <p>{message.text}</p>
            </div>
        </div>
    );
}

export default ChatMessage;
