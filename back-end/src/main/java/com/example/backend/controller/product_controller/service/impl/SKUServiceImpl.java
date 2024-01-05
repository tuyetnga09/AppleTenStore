package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.model.product_detail.ion.SkuOfBillDetails;
import com.example.backend.controller.product_controller.model.request.ListSkuProduct;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Product;
import com.example.backend.entity.SKU;
import com.example.backend.repository.SKURepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class SKUServiceImpl implements Iservice<SKU> {
    @Autowired
    private SKURepositoty skuRepositoty;

    @Override
    public Page<SKU> getAll(Pageable pageable) {
        return skuRepositoty.findAll(pageable);
    }

    @Override
    public void insert(SKU sku) {

    }

    @Override
    public void update(SKU sku, Integer id) {

    }

    @Override
    public void delete(Integer id) {

    }

    @Override
    public void delete(SKU sku) {

    }

    @Override
    public void returnDelete(SKU sku) {

    }

    public List<SKU> getAllListSkuFindByProduct() {
        return skuRepositoty.skuFindByProduct();
    }
// viet ham hien thi o day

    public SKU getSkuProduct(String capacity, String color, Integer idProduct) {
        return skuRepositoty.skuProduct(capacity, color, idProduct);
    }

    public SKU findByID(Long id) {
        return skuRepositoty.findById(id).orElse(null);
    }

    ;

    public List<SKU> getAllSkuFindByProduct(Product product) {
        return skuRepositoty.findByProduct(product);
    }
//    public Page<ListSkuProduct> getSKUProductFormSellOff(Pageable pageable){
//        return skuRepositoty.getSkuProductFormSellOffline(pageable);
//    }

    public List<ListSkuProduct> getSKUProductFormSellOff(String key) {
        return skuRepositoty.getSkuProductFormSellOffline(key);
    }

    public List<ListSkuProduct> getSKUProductFormSellOffByCategory(Integer id, String key) {
        return skuRepositoty.getSkuProductFormSellOfflineByCategory(id, key);
    }

    public List<BigDecimal> priceMinAndMaxBySKU(Integer idProduct) {
        SKU sku = skuRepositoty.findSKUPriceMin(idProduct);
        SKU sku1 = skuRepositoty.findSKUPriceMax(idProduct);
        List<BigDecimal> bigDecimals = new ArrayList<>();
        if (sku != null) {
            bigDecimals.add(sku.getPrice());
            bigDecimals.add(sku1.getPrice());
        }
        return bigDecimals;
    }

    public List<SkuOfBillDetails> getSKUForAddBill(){
        return skuRepositoty.getSKUForAddBill();
    }

    public List<SkuOfBillDetails> searchSKUForAddBill(String name){
        return skuRepositoty.searcgSKUForAddBill(name);
    }

}
