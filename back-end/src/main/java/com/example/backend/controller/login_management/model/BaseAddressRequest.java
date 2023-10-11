package com.example.backend.controller.login_management.model;

import com.example.backend.untils.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseAddressRequest {
    private Integer id;


    private String address;

    private String tinhThanhPho;

    private String quanHuyen;

    private String xaPhuong;

    private Integer userId;
    private Status status;
}
