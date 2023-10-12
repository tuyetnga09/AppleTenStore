package com.example.backend.controller.order_management.service;

import com.example.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

    List<User> getAll();

    Page<User> findByRole(Pageable pageable, String role);
}
