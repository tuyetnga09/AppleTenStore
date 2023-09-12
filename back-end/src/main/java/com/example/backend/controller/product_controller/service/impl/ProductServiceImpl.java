package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.ProductRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements Iservice<Product> {
    @Autowired
    private ProductRepository productRepository;
    @Override
    public Page<Product> getAll(Pageable pageable) {
        return productRepository.findAll(pageable);
    }
    @Override
    public void insert(Product product) {

    }

    @Override
    public void update(Product product, Integer id) {

    }

    @Override
    public void delete(Integer id) {

    }

    @Override
    public void delete(Product product) {

    }

    @Override
    public void returnDelete(Product product) {

    }
}
