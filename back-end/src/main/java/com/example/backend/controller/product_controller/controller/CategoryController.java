package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.CategoryServiceImpl;
import com.example.backend.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category/")
public class CategoryController {
    @Autowired
    private CategoryServiceImpl categoryService;

    @GetMapping("display")
    public Page<Category> viewAll(@RequestParam(value = "page",defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page,2);
        return categoryService.getAll(pageable);
    }
}
