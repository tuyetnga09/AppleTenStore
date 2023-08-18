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
    public Category insert(Category category) {
        return categoryRepository.save(category);
    }


    @Override
    public Category update(Category category, Integer id) {
        return categoryRepository.save(category);
    }

    @Override
    public Category delete(String id) {
        return categoryRepository.findById(id).get();
    }
}
