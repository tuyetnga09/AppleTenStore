package com.example.backend.controller.order_management.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseObj {
    private boolean isSuccess = false;
    private Object data;
    private String message;

    public <T> ResponseObj(T data) {
        processResponseObject(data);
    }

    public <T> void processResponseObject(T data) {
        if (data != null) {
            this.isSuccess = true;
            this.data = data;
        }
    }
    public <T> ResponseObj(T data, String message) {
        this.message = message;
        processResponseObject(data);
    }

}
