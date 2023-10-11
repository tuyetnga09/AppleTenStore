package com.example.backend.controller.login_management.model;

import com.example.backend.untils.Status;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public abstract class BaseAddressRequest {
    private Integer id;

    private String line;

    private String district;

    private String province;

    private String ward;

    private Integer provinceId;

    private Integer toDistrictId;

    private String wardCode;

    private Status status;

    private Integer userId;
}
