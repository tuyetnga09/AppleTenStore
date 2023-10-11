package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.model.request.CreateProduct;
import com.example.backend.repository.ProductRepository;
import com.example.backend.controller.product_controller.service.impl.ProductServiceImpl;
import com.example.backend.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
@RequestMapping("/admin/product/")
public class ProductController {

    @Autowired
    private ProductServiceImpl productService;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("display")
    public Page<Product> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 5);
//        Page<Product> listProduct = productService.getAll(pageable);
        Page<Product> listProduct = productService.search(pageable, key);
        return listProduct;
    }

    @PostMapping("save")
    public Product save(@RequestBody CreateProduct createProduct) {
        return productService.insert(createProduct);
    }

    @GetMapping("displayDelete")
    public Page<Product> viewAllDelete(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 5);
//        Page<Product> listProduct = productService.getDelete(pageable);
        Page<Product> listProduct = productService.deleteProduct(pageable, key);
        return listProduct;
    }

    @DeleteMapping("delete/{id}")
    public void delete(@PathVariable("id") Integer id) {
        Product product = productRepository.findById(id).orElse(null);
        productService.delete(product);
    }

    @PutMapping("return/{id}")
    public void returnDelete(@PathVariable("id") Integer id) {
        Product product = productRepository.findById(id).orElse(null);
        productService.returnDelete(product);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> update(@RequestBody Product product, @PathVariable("id") Integer id) {
        productService.update(product, id);
        return new ResponseEntity<>("Update ok", HttpStatus.OK);
    }

    @GetMapping(value = "get-all-product")
    public List<Product> selectAll() {
        return this.productService.selectAll();
    }

    @GetMapping(value = "new-product")
    public List<Product> selectNewProduct() {
        return this.productService.selectNewProduct();
    }

    @GetMapping(value = "chip-product")
    public List<Product> selectChipProduct() {
        return this.productService.selectChipProduct();
    }

    @GetMapping(value = "/search/{id}")
    public Product findById(@PathVariable int id){
        return this.productService.findById(id);
    }

    @GetMapping("display/productNew")
    public Page<Product> productNew(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Product> listProduct = productService.productNew(pageable, key);
        return listProduct;
    }

    @GetMapping("display/productCheap")
    public Page<Product> productCheap(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Product> listProduct = productService.productCheap(pageable, key);
        return listProduct;
    }

    @GetMapping("{id}")
    public Product detail(@PathVariable("id") Integer id){
        return productService.getOne(id);
    }

    @GetMapping("display/filterProductbyPrice")
    public Page<Product> filterProductbyPrice(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key, @RequestParam("minPrice") Integer minPrice, @RequestParam("maxPrice") Integer maxPrice) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Product> listProduct = productService.filterProductByPrice(pageable, key, minPrice, maxPrice);
        return listProduct;
    }
    @GetMapping("display/filterProductbyCategory")
    public Page<Product> filterProductbyCategory(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key, @RequestParam("nameCategory") String nameCategory) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Product> listProduct = productService.filterProductByCategory(pageable, key, nameCategory);
        return listProduct;
    }

    @GetMapping("display/filterProductByAscendingPrice")
    public Page<Product> filterProductByAscendingPrice(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Product> listProduct = productService.filterProductByAscendingPrice(pageable, key);
        return listProduct;
    }

    @GetMapping("display/filterProductByDecreasePrice")
    public Page<Product> filterProductByDecreasePrice(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 10);
        Page<Product> listProduct = productService.filterProductByDecreasePrice(pageable, key);
        return listProduct;
    }

    @GetMapping("display/listProductByCategories")
    public Page<Product> listProductByCategories(Pageable pageable, @RequestParam("id") Integer id) {
//        Pageable pageable = PageRequest.of(page, 10);
        Page<Product> listProduct = productService.listProductByCategories(pageable, id);
        return listProduct;
    }
}
