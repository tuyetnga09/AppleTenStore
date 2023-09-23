package com.example.backend.controller.order_management.model.account;

import com.example.backend.entity.Account;
import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;


@Projection(types = {Account.class, User.class})
public interface AccountResponse {

    @Value("#{target.id}")
    Integer getId();

    @Value("#{target.fullName}")
    String getFullName();

    @Value("#{target.phoneNumber}")
    String getPhoneNumber();

    @Value("#{target.email}")
    String getEmail();

}
