package com.example.backend.controller.login_management.service.impl;

import com.example.backend.controller.login_management.model.request.LoginRequest;
import com.example.backend.controller.login_management.model.request.ResetRequest;
import com.example.backend.controller.login_management.model.response.LoginResponse;
import com.example.backend.controller.login_management.service.LoginService;
import com.example.backend.controller.order_management.model.EmailService;
import com.example.backend.entity.Account;
import com.example.backend.repository.AccountRepository;
import com.example.backend.untils.Message;
import com.example.backend.untils.RestAPIRunTime;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class LoginServiceImpl  implements LoginService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private EmailService emailService;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Override
    public LoginResponse getOneByEmailAndPass(LoginRequest request) {
        Account account = accountRepository.getOneByEmail(request.getEmail());
        if (account == null) {
            throw new RestAPIRunTime(Message.NOT_EXISTS);
        }
        if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            throw new RestAPIRunTime((Message.PASSWORD_NOT_EXISTS));
        }
        LoginResponse response = new LoginResponse(account);
        return response;
    }

    @Override
    public LoginResponse resetPassword(ResetRequest resetPassword) {
        Account account = accountRepository.resetPassword(resetPassword.getEmailForgot(), resetPassword.getPhoneNumber());
        if (account == null) {
            throw new RestAPIRunTime(Message.NOT_EXISTS);
        }
        Random random = new Random();
        int randomNumber = 100000 + random.nextInt(900000);
        account.setPassword(passwordEncoder.encode(String.valueOf(randomNumber)));
        accountRepository.save(account);
        String subject = "Mật khẩu mới của bạn ";
        emailService.sendEmailPasword(account.getEmail(),subject,String.valueOf(randomNumber));
        LoginResponse response = new LoginResponse(account);
        return response;
    }

}
