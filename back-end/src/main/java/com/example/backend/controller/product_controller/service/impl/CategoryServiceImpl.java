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
    private CategoryRepository  categoryRepository;

    @Override
    public Page<Category> getAll(Pageable pageable) {
       return categoryRepository.findAll(pageable);
    }

    @Override
    public void insert(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public void update(Category category, Integer id) {
        categoryRepository.save(category);
    }

    @Override
    public void delete(Integer id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public void delete(Category category) {
        category.setStatus(1);
        categoryRepository.save(category);
    }

    @Override
    public void returnDelete(Category category) {
        category.setStatus(0);
        categoryRepository.save(category);
    }

    public Category getOne(Integer id) {
        return categoryRepository.findById(id).get();
    }


}
