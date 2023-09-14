package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/product/")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

}
