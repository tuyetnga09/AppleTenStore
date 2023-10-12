package com.example.backend.controller.login_management.service;

import com.example.backend.entity.Account;
import com.example.backend.entity.Address;
import com.example.backend.entity.User;

public interface EmployeeService {

    User add(User user, Address address, Account account);
}
