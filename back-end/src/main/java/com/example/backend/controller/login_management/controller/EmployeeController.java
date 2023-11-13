package com.example.backend.controller.login_management.controller;

import com.example.backend.controller.login_management.model.request.CustomerDTO;
import com.example.backend.controller.login_management.model.request.EmployeeDTO;
import com.example.backend.controller.login_management.service.EmployeeService;
import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.entity.Account;
import com.example.backend.entity.Address;
import com.example.backend.entity.User;
import com.example.backend.untils.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

//    @PostMapping("/create")
//    public ResponseObj add(@RequestBody EmployeeDTO employeeDTO, @RequestParam("role") String role) {
//        User user = employeeDTO.getUser();
//        Address address = employeeDTO.getAddress();
//        Account account = employeeDTO.getAccount();
//        account.setRoles(Roles.valueOf(role));
//        return new ResponseObj(employeeService.add(user, address, account));
//    }

    @PostMapping("/create")
    public ResponseObj add(@RequestBody EmployeeDTO employeeDTO, @RequestParam("role") String role) {
        User user = employeeDTO.getUser();
        Address address = employeeDTO.getAddress();
        Account account = employeeDTO.getAccount();
        account.setRoles(Roles.valueOf(role));
        return new ResponseObj(employeeService.add(user, address, account));
    }
}
