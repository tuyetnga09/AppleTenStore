package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Customer;
import com.example.backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImplOffline implements Iservice<Customer> {
    @Autowired
    private CustomerRepository customerRepository;
    @Override
    public Page<Customer> getAll(Pageable pageable) {
        return customerRepository.findAll(pageable);
    }

    @Override
    public void insert(Customer customer) {
        customerRepository.save(customer);
    }

    @Override
    public void update(Customer customer, Integer id) {
        Customer customerUpdate = customerRepository.findById(id).orElse(null);
        customerUpdate.setFullName(customer.getFullName());
        customerUpdate.setPhoneNumber(customer.getPhoneNumber());
        customerUpdate.setEmail(customer.getEmail());
        customerRepository.save(customerUpdate);
    }

    @Override
    public void delete(Integer id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
        }
    }

    @Override
    public void delete(Customer customer) {
        customer.setStatus(1);
        customerRepository.save(customer);
    }

    @Override
    public void returnDelete(Customer customer) {
        customer.setStatus(0);
        customerRepository.save(customer);
    }

    public List<Customer> getAll() {
        return customerRepository.getAll();
    }
}
