package com.example.backend.controller.login_management.service;

import com.example.backend.controller.login_management.model.request.CreateAddressRequest;
import com.example.backend.controller.login_management.model.request.CreateCustomerRequest;
import com.example.backend.controller.login_management.model.request.FindEmployeeRequest;
import com.example.backend.controller.login_management.model.response.EmployeeResponse;
import com.example.backend.entity.Account;
import com.example.backend.entity.Address;
import com.example.backend.entity.Customer;
import com.example.backend.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    List<EmployeeResponse> findAll(FindEmployeeRequest req);

    User create(CreateCustomerRequest request,
                CreateAddressRequest addressRequest,
                MultipartFile file);

    User add(User user, Address address, Account account);

    Optional<Customer> getOneUser(Integer id);
}
