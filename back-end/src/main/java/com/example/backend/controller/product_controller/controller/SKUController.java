package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.SKUServiceImpl;
import com.example.backend.entity.Product;
import com.example.backend.entity.SKU;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("*")
@RestController
@RequestMapping("/sku/")
public class SKUController {
    @Autowired
    private SKUServiceImpl skuService;

    @GetMapping("display")
    public Page<SKU> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<SKU> listSKU = skuService.getAll(pageable);
        return listSKU;
    }

}
