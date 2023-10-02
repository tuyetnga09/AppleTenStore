package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.SKUServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/sku/")
public class SKUController {
    @Autowired
    private SKUServiceImpl skuService;

   // viết hàm hiển thị ở đây

}
