package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.SKU;
import com.example.backend.repository.SKURepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SKUServiceImpl implements Iservice<SKU> {
    @Autowired
    private SKURepositoty skuRepositoty;

    @Override
    public Page<SKU> getAll(Pageable pageable) {
        return skuRepositoty.findAll(pageable);
    }

    @Override
    public void insert(SKU sku) {

    }

    @Override
    public void update(SKU sku, Integer id) {

    }

    @Override
    public void delete(Integer id) {

    }

    @Override
    public void delete(SKU sku) {

    }

    @Override
    public void returnDelete(SKU sku) {

    }

// viet ham hien thi o day
}
