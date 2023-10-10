package com.example.backend.controller.login_management.service;

import com.example.backend.controller.login_management.model.request.LoginRequest;
import com.example.backend.controller.login_management.model.request.ResetRequest;
import com.example.backend.controller.login_management.model.response.LoginResponse;

public interface LoginService {
    LoginResponse getOneByEmailAndPass(LoginRequest request);
    LoginResponse resetPassword (ResetRequest resetPassword);
}
