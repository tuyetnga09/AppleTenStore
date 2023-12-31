package com.example.backend.controller.order_management.service;

import com.example.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface UserService {

    List<User> getAll();

    List<User> findByRoleAndStatus(Pageable pageable, String role, String status);

    Boolean updateUser(String fullName, String email, String phoneNumber, LocalDate dateOfBirth, Integer id);

    void updateStatusUser(String status, Integer id);
}
