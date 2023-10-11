package com.example.backend.controller.login_management.service;

import com.example.backend.controller.login_management.model.request.CreateAddressRequest;
import com.example.backend.controller.login_management.model.request.CreateCustomerRequest;
import com.example.backend.controller.login_management.model.request.FindEmployeeRequest;
import com.example.backend.controller.login_management.model.response.EmployeeResponse;
import com.example.backend.entity.User;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CustomerService {
    List<EmployeeResponse> findAll(FindEmployeeRequest req);

    User create(CreateCustomerRequest request,
                CreateAddressRequest addressRequest,
                MultipartFile file);

}
