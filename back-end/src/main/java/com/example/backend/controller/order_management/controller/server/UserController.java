package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.dto.EditCustomer;
import com.example.backend.controller.order_management.model.dto.EditPassword;
import com.example.backend.controller.order_management.service.AccountService;
import com.example.backend.controller.order_management.service.UserService;
import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AccountService accountService;

    @GetMapping("")
    public List<User> getAll(){
        return userService.getAll();
    }

    @GetMapping("/findByRole")
    public Page<User> findByRole(Pageable pageable, @RequestParam("role") String role){
        return userService.findByRole(pageable, role);
    }

    @PutMapping("/{id}")
    public Boolean editCustomer(@PathVariable("id") Integer id, @RequestBody EditCustomer editCustomer){
        if (accountService.updateAccount(editCustomer.getEmail(), id) && userService.updateUser(editCustomer.getFullName(), editCustomer.getEmail(), editCustomer.getPhoneNumber(), editCustomer.getDateOfBirth(), id)){
            return true;
        }
        return false;
    }

    @PutMapping("/updatePassword/{id}")
    public Boolean editPasswordCustomer(@PathVariable("id") Integer id, @RequestBody EditPassword editPassword){
        if (accountService.updatePassword(editPassword.getPassword(), editPassword.getPasswordNew(), editPassword.getPasswordRepeat(), id)){
            return true;
        }
        return false;
    }
}
