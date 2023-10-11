package com.example.backend.controller.login_management.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class LoginRequest {
    private  String email ;

    private String password;
}
