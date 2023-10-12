package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.service.UserService;
import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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

    @GetMapping("")
    public List<User> getAll(){
        return userService.getAll();
    }

    @GetMapping("/findByRole")
    public Page<User> findByRole(Pageable pageable, @RequestParam("role") String role){
        return userService.findByRole(pageable, role);
    }

}
