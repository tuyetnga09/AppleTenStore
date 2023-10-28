package com.example.backend.controller.order_management.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class EditCustomer {

    private String fullName;

    private String email;

    private String phoneNumber;

    private LocalDate dateOfBirth;
}
