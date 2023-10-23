package com.example.backend.controller.product_controller.controller.product.client;

import com.example.backend.controller.product_controller.service.impl.ProductServiceImpl;
import com.example.backend.entity.Product;
import com.example.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/public/product/")
public class PublicController {

    @Autowired
    private ProductServiceImpl productService;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping("display")
    public Page<Product> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 10);
//        Page<Product> listProduct = productService.getAll(pageable);
        Page<Product> listProduct = productService.search(pageable, key);
        return listProduct;
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

    //    @GetMapping("display/listProductByCategories")
//    public Page<Product> listProductByCategories(Pageable pageable, @RequestParam("id") Integer id) {
////        Pageable pageable = PageRequest.of(page, 10);
//        Page<Product> listProduct = productService.listProductByCategories(pageable, id);
//        return listProduct;
//    }
    @GetMapping("display/listProductByCategories")
    public List<Product> listProductByCategories(@RequestParam("id") Integer id) {
        return productService.listProductByCategories(id);
    }
}
