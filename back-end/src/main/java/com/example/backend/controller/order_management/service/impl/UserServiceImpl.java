package com.example.backend.controller.order_management.service.impl;

import com.example.backend.controller.order_management.service.UserService;
import com.example.backend.entity.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public Page<User> findByRole(Pageable pageable, String role) {
        return userRepository.findByRole(pageable, role);
    }

    @Override
    public Boolean updateUser(String fullName, String email, String phoneNumber, LocalDate dateOfBirth, Integer id) {
        User user = userRepository.findById(id).orElse(null);
        user.setFullName(fullName);
        user.setEmail(email);
        user.setPhoneNumber(phoneNumber);
        user.setDateOfBirth(dateOfBirth);
        userRepository.save(user);
        return true;
    }

}
