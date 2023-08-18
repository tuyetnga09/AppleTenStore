package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.CategoryRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements Iservice<Category> {
    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Page<Category> getAll(Pageable pageable) {
        return categoryRepository.findAll(pageable);
    }

    @Override
    public void insert(Category category) {

    }

    @Override
    public void update(Category category, String id) {

    }

    @Override
    public void delete(String id) {

    }
}
