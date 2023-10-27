package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.service.AccountService;
import com.example.backend.entity.Account;
import com.example.backend.untils.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/admin/account")
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

    @GetMapping("/roles")
    public List<String> roles() {
        List<String> roles = new ArrayList<>();
        Roles[] allDataTypes = Roles.values();
        for (Roles dataType : allDataTypes) {
            roles.add(dataType.toString());
        }
        return roles;
    }

    @GetMapping("/login")
    public Account checkLogin(@RequestParam("email") String email, @RequestParam("password") String password) {
        for (Account ac : accountService.findAll()
             ) {
            String pw = new String(Base64.getDecoder().decode(ac.getPassword()));
            if (ac.getEmail().equals(email) && pw.equals(password)){
                return ac;
            }
        }
        return null;
    }

    @GetMapping("/get-id")
    public ResponseObj getOneById(@RequestParam("id") Integer id) {
        return new ResponseObj(accountService.getOneById(id));
    }
}
