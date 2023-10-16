//package com.example.backend.controller.product_controller.controller.product.server;
//
//import com.example.backend.controller.product_controller.model.request.CreateProduct;
//import com.example.backend.controller.product_controller.service.impl.ProductServiceImpl;
//import com.example.backend.entity.Product;
//import com.example.backend.repository.ProductRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.PageRequest;
//import org.springframework.data.domain.Pageable;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@CrossOrigin("*")
//@RestController
//@RequestMapping("/admin/product/")
//public class PrivateController {
//
//    @Autowired
//    private ProductServiceImpl productService;
//    @Autowired
//    private ProductRepository productRepository;
//
//    @PostMapping("save")
//    public Product save(@RequestBody CreateProduct createProduct) {
//        return productService.insert(createProduct);
//    }
//
//    @GetMapping("displayDelete")
//    public Page<Product> viewAllDelete(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
//        Pageable pageable = PageRequest.of(page, 10);
////        Page<Product> listProduct = productService.getDelete(pageable);
//        Page<Product> listProduct = productService.deleteProduct(pageable, key);
//        return listProduct;
//    }
//
//    @DeleteMapping("delete/{id}")
//    public void delete(@PathVariable("id") Integer id) {
//        Product product = productRepository.findById(id).orElse(null);
//        productService.delete(product);
//    }
//
//    @PutMapping("return/{id}")
//    public void returnDelete(@PathVariable("id") Integer id) {
//        Product product = productRepository.findById(id).orElse(null);
//        productService.returnDelete(product);
//    }
//
//    @PutMapping("update/{id}")
//    public ResponseEntity<String> update(@RequestBody CreateProduct createProduct, @PathVariable("id") Integer id) {
//        return new ResponseEntity<>(productService.update(createProduct, id), HttpStatus.OK);
//    }
//
//
//    @GetMapping(value = "get-all-product")
//    public List<Product> selectAll() {
//        return this.productService.selectAll();
//    }
//
//    @GetMapping(value = "new-product")
//    public List<Product> selectNewProduct() {
//        return this.productService.selectNewProduct();
//    }
//
//    @GetMapping(value = "chip-product")
//    public List<Product> selectChipProduct() {
//        return this.productService.selectChipProduct();
//    }
//
//    @GetMapping(value = "/search/{id}")
//    public Product findById(@PathVariable int id){
//        return this.productService.findById(id);
//    }
//
//    @GetMapping("{id}")
//    public Product detail(@PathVariable("id") Integer id){
//        return productService.getOne(id);
//    }
//    @GetMapping("detail/{id}")
//    public CreateProduct detailCreateProduct(@PathVariable("id") Integer id){
//        return productService.getOne1(id);
//    }
//
//}
