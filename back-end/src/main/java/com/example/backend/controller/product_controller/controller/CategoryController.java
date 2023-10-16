package com.example.backend.controller.product_controller.controller;

import com.example.backend.repository.CategoryRepository;
import com.example.backend.controller.product_controller.service.impl.CategoryServiceImpl;
import com.example.backend.entity.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/admin/category/")
public class CategoryController {
    @Autowired
    private CategoryServiceImpl categoryService;
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("display")
    public Page<Category> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Category> listCategory = categoryService.getAll(pageable);
        return listCategory;
    }

    @GetMapping("get-all-category")
    public ResponseEntity<List<Category>> getAllCategory() {
        return new ResponseEntity<>(categoryService.getAll(), HttpStatus.OK);
    }

    @PostMapping("save")
    public void save(@RequestBody Category category) {
        categoryService.insert(category);
    }

    @PutMapping("update/{id}")
    public void update(@RequestBody Category category, @PathVariable("id") Integer id) {
        category.setId(id);
        categoryService.update(category, id);
    }

    @PutMapping("delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
        Category category = categoryRepository.findById(id).orElse(null);
        categoryService.delete(category);
    }

    @GetMapping("displayDelete")
    public Page<Category> viewAllDelete(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Category> listCategory = categoryService.getDelete(pageable);
        return listCategory;
    }

    @GetMapping("return/{id}")
    public void returnDelete(@PathVariable("id") Integer id) {
        Category category = categoryRepository.findById(id).orElse(null);
        categoryService.returnDelete(category);
    }

    @PostMapping("import")
    public ResponseEntity<String> importRam(@RequestParam("file") MultipartFile file) {
        try {
            categoryService.importDataFromExcel(file);
            return ResponseEntity.ok("Import Thành Công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("Import Thất bại");
        }
    }

    @GetMapping("search")
    public Page<Category> search(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                 @RequestParam(value = "search", required = false) String search) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Category> listCategory = categoryService.search(search, pageable);
        return listCategory;
    }

    @GetMapping("displayDashboard")
    public Page<Category> viewAllDashboard(Pageable pageable) {
//        Pageable pageable = PageRequest.of(page, 5);
        Page<Category> listCategory = categoryService.getAll(pageable);
        return listCategory;
    }
}