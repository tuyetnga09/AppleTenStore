package com.example.backend.controller.login_management.controller;

import com.example.backend.controller.login_management.model.request.CreateAddressRequest;
import com.example.backend.controller.login_management.model.request.CreateCustomerRequest;
import com.example.backend.controller.login_management.model.request.CustomerDTO;
import com.example.backend.controller.login_management.service.CustomerService;
import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.entity.Account;
import com.example.backend.entity.Address;
import com.example.backend.entity.User;
import com.example.backend.untils.Status;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/customer")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

//    @PostMapping("/create")
//    public ResponseObj add(@RequestParam(value = "request", required = false) String req,
//                           @RequestParam(value = "multipartFile",required = false) MultipartFile file) {
//
//        JsonObject jsonObject = JsonParser.parseString(req).getAsJsonObject();
//
//        // add khách hàng
//        CreateCustomerRequest customerRequest = new CreateCustomerRequest();
//        customerRequest.setFullName(jsonObject.get("fullName").getAsString());
//        customerRequest.setPhoneNumber(jsonObject.get("phoneNumber").getAsString());
//        customerRequest.setEmail(jsonObject.get("email").getAsString());
//        customerRequest.setGender(Boolean.valueOf(jsonObject.get("gender").getAsString()));
//        customerRequest.setStatus(Status.valueOf(jsonObject.get("status").getAsString()));
//        customerRequest.setDateOfBirth(LocalDate.ofEpochDay(Long.valueOf(jsonObject.get("dateOfBirth").getAsString())));
//
//        // add địa chỉ
//        CreateAddressRequest addressRequest = new CreateAddressRequest();
//        addressRequest.setAddress(jsonObject.get("line").getAsString());
//        //....
//
//        return new ResponseObj(customerService.create(customerRequest, addressRequest, file));
//    }

    @PostMapping("/create")
    public ResponseObj add(@RequestBody CustomerDTO customerDTO) {
        User user = customerDTO.getUser();
        Address address = customerDTO.getAddress();
        Account account = customerDTO.getAccount();
        return new ResponseObj(customerService.add(user, address, account));
    }
}
