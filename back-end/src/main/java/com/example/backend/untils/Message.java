package com.example.backend.untils;

public enum Message {
    NOT_EXISTS("Không tồn tại"),
    PASSWORD_NOT_EXISTS("Password không đúng");

    private String message;

    Message(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
