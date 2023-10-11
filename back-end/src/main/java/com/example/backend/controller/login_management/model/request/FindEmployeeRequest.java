package com.example.backend.controller.login_management.model.request;

import java.time.LocalDate;

public class FindEmployeeRequest {
    private String fullName;

    private String email;

    private String phoneNumber;

    private String status;

    private LocalDate startTime;

    private LocalDate endTime;
}
