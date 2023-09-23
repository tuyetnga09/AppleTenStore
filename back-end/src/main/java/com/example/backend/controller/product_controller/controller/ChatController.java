package com.example.backend.controller.product_controller.controller;


import com.example.backend.entity.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.Date;

@Controller
public class ChatController {

    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message sendMessage(@Payload Message chatMessage) {
        chatMessage.setTimestamp(new Date()); // Set the current timestamp
        return chatMessage;
    }
}