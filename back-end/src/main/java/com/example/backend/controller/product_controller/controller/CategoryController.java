package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.repository.CategoryRepository;
import com.example.backend.controller.product_controller.service.impl.CategoryServiceImpl;
import com.example.backend.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/category/")
public class CategoryController {
    @Autowired
    private CategoryServiceImpl categoryService;
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("display")
    public Page<Category> viewAll(@RequestParam(value = "page",defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page,2);
        return categoryService.getAll(pageable);
    }

    @PostMapping("save")

    public void save(@RequestBody Category category) {
        categoryService.insert(category);
    }

    @PutMapping("update/{id}")
    public void update(@RequestBody Category category,@PathVariable("id") Integer id) {
        category.setId(id);
        categoryService.update(category, id);
    }

    @DeleteMapping("delete")
    public void delete(@RequestParam("id")Integer id) {
        categoryService.delete(id);
    }

    @GetMapping("getAll")
    public List<Category> getCategory() {
        return categoryRepository.findAll();
    }
    //test
}
