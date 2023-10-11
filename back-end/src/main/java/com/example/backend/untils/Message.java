package com.example.backend.untils;

public enum Message {
    NOT_EXISTS("Không tồn tại"),
    PASSWORD_NOT_EXISTS("Password không đúng"),
    PHONENUMBER_USER_EXIST("Số điện thoại người dùng đã tồn tại "),
    EMAIL_USER_EXIST("Email người dùng đã tồn tại");

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
