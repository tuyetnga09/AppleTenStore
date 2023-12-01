package com.example.backend.controller.order_management.service.impl;

import com.example.backend.controller.order_management.service.UserService;
import com.example.backend.entity.Account;
import com.example.backend.entity.User;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.untils.Status;
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

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> findByRoleAndStatus(Pageable pageable, String role, String status) {
        return userRepository.findByRoleAndStatus(pageable, role, status);
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

    @Override
    public void updateStatusUser(String status, Integer id) {
        Account account = accountRepository.findByUser_Id(id);
        if (status.equals("KHONG_SU_DUNG")){
            account.setStatus(Status.KHONG_SU_DUNG);
            accountRepository.save(account);
        }else {
            account.setStatus(Status.DANG_SU_DUNG);
            accountRepository.save(account);
        }
        userRepository.updateStatusUser(status, id);
    }

}
