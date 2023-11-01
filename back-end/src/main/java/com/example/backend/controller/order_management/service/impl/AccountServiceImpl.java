package com.example.backend.controller.order_management.service.impl;


import com.example.backend.controller.order_management.model.account.AccountResponse;
import com.example.backend.controller.order_management.service.AccountService;
import com.example.backend.entity.Account;
import com.example.backend.repository.AccountRepository;
import com.example.backend.untils.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public List<Account> findAll() {
        return accountRepository.findAll();
    }

    @Override
    public Account getOneByEmail(String email) {
       return accountRepository.getOneByEmail(email);
    }

    @Override
    public AccountResponse getAccountUserByIdBill(String idBill) {
//        return accountRepository.getAccountUserByIdBill(idBill);
        return null;
    }

    @Override
    public Integer numberOfCustomersLastMonth() {
        return accountRepository.numberOfCustomersLastMonth();
    }

    @Override
    public Integer numberOfCustomersThisMonth() {
        return accountRepository.numberOfCustomersThisMonth();
    }

    @Override
    public Boolean updateAccount(String email, Integer id) {
        Account account = accountRepository.findByUser_Id(id);
            account.setEmail(email.trim());
            accountRepository.save(account);
            return true;
    }

    @Override
    public Boolean updatePassword(String password, String passwordNew, String passwordRepeat, Integer id) {
        Account account = accountRepository.findByUser_Id(id);
        if (password.equals(new String(Base64.getDecoder().decode(account.getPassword()))) && passwordNew.equals(passwordRepeat)){
                account.setPassword(Base64.getEncoder().encodeToString(passwordNew.getBytes()));
                accountRepository.save(account);
                return true;
        }
        return false;
    }

    @Override
    public Account getOneById(Integer id) {
        return accountRepository.findById(id).orElse(null);
    }

    @Override
    public Account updateRole(String role, Integer idUser) {
        Account account = accountRepository.findByUser_Id(idUser);
        account.setRoles(Roles.valueOf(role));
        return accountRepository.save(account);
    }

//    @Override
//    public Integer numberOfCustomers() {
//        return accountRepository.numberOfCustomers();
//    }
}
