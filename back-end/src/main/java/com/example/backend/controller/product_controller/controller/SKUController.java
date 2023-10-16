package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.ProductServiceImpl;
import com.example.backend.controller.product_controller.model.request.ListSkuProduct;
import com.example.backend.controller.product_controller.service.impl.SKUServiceImpl;
import com.example.backend.entity.Product;
import com.example.backend.entity.SKU;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/sku/")
public class SKUController {
    @Autowired
    private SKUServiceImpl skuService;

    @Autowired
    private ProductServiceImpl productService;

    @GetMapping("display")
    public Page<SKU> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<SKU> listSKU = skuService.getAll(pageable);
        return listSKU;
    }

    @GetMapping("get-all")
    public List<SKU> getAllFindByProduct() {
        return skuService.getAllListSkuFindByProduct();
    }


    @GetMapping("getSKU")
    public SKU getSKUProduct(@RequestParam("capacity") String capacity,@RequestParam("color") String color,@RequestParam("idProduct") Integer idProduct){
        return skuService.getSkuProduct(capacity,color,idProduct);
    }

    @GetMapping("getOneSKU/{id}")
    public SKU getOneSKU(@PathVariable("id") Long id){
        return skuService.findByID(id);
    }

    @GetMapping("get-list-product/{idProduct}")
    public List<SKU> getListProduct(@PathVariable("idProduct") Integer idProduct) {
        Product product = productService.findById(idProduct);
        return skuService.getAllSkuFindByProduct(product);
    }
    @GetMapping("getSkuProduc")
    public Page<ListSkuProduct> getSKUProduct(@RequestParam(value = "page", defaultValue = "0") Integer page){
        Pageable pageable = PageRequest.of(page, 5);
       return skuService.getSKUProductFormSellOff(pageable);
    }

}
