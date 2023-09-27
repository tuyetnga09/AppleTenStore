package com.example.backend.controller.order_management.service.impl;


import com.example.backend.controller.order_management.model.account.AccountResponse;
import com.example.backend.repository.AccountRepository;
import com.example.backend.controller.order_management.service.AccountService;
import com.example.backend.entity.Account;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


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
       return null;
    }

    @Override
    public AccountResponse getAccountUserByIdBill(String idBill) {
//        return accountRepository.getAccountUserByIdBill(idBill);
        return null;
    }

}
