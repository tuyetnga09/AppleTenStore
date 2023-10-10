package com.example.backend.controller.login_management.controller;

import com.example.backend.controller.login_management.model.request.LoginRequest;
import com.example.backend.controller.login_management.service.LoginService;
import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/login")
public class LoginController {

    @Autowired
    private LoginService loginService;


    @GetMapping()
    public ResponseObj authentication (LoginRequest request){

        return new ResponseObj(loginService.getOneByEmailAndPass(request));
    }

}
