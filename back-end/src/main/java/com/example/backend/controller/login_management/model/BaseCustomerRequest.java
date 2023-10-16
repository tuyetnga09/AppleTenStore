package com.example.backend.controller.login_management.model;

import com.example.backend.untils.Status;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
@Getter
@Setter
public abstract class BaseCustomerRequest {
    private String fullName;
    private LocalDate dateOfBirth;

    private String phoneNumber;

    private String email;

    private Boolean gender;

    private String avatar;

    private Status status;

    private String password;

    private Integer points;
}
