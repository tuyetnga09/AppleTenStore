package com.example.backend.untils;

public class RestAPIRunTime extends RuntimeException{
    private static final long serialVersionUID = 1L;

    private String message;

    public RestAPIRunTime() {
    }

    public RestAPIRunTime(Message statusCode) {
        this.message = statusCode.getMessage();
    }

    public RestAPIRunTime(String message) {
        this.message = message;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
