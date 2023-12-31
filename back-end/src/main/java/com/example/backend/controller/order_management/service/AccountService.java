package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.account.AccountResponse;
import com.example.backend.entity.Account;

import java.util.List;

public interface AccountService {

    List<Account> findAll ();

    Account getOneByEmail(String email);

    AccountResponse getAccountUserByIdBill(String idBill );

    Integer numberOfCustomersLastMonth();

    Integer numberOfCustomersThisMonth();

//    Integer numberOfCustomers();

    Boolean updateAccount(String email, Integer id);

    Boolean updatePassword(String password, String passwordNew, String passwordRepeat, Integer id);

    Account getOneById(Integer id);

    Account updateRole(String role, Integer idUser);
}
