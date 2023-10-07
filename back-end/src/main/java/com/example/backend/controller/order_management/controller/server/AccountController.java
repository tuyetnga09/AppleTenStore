package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
@CrossOrigin("*")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping()
    public ResponseObj getList() {
        return new ResponseObj(accountService.findAll());
    }

    @GetMapping("/get-email")
    public ResponseObj getOneByEmail(@RequestParam("email") String email) {
        return new ResponseObj(accountService.getOneByEmail(email));
    }

    @GetMapping("/numberOfCustomersLastMonth")
    public Integer numberOfCustomersLastMonth(){
        return accountService.numberOfCustomersLastMonth();
    }

    @GetMapping("/numberOfCustomersThisMonth")
    public Integer numberOfCustomersThisMonth(){
        return accountService.numberOfCustomersThisMonth();
    }
}
