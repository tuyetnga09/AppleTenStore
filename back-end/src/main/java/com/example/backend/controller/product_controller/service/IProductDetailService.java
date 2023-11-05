package com.example.backend.controller.product_controller.service;

import com.example.backend.controller.product_controller.model.product_detail.ion.ProductDetailIonAdmin;
import com.example.backend.controller.product_controller.model.product_detail.ion.SkuIonAdmin;
import com.example.backend.entity.Imei;
import com.example.backend.entity.Product;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IProductDetailService {
    //lấy ra tất cả product
    List<ProductDetailIonAdmin> getAllProduct();

    //lấy ra list sku theo idproduct- phongnh
    List<SkuIonAdmin> getAllSkuWhereIdProduct(Integer idProduct);

    //laays ra lisst imei theo idsku - phongnh
    List<Imei> getListImeiWherIdSku(Long idSku);

    //laays ra lisst imei theo idsku and status
    List<Imei> getAllImeiWhereIdSkuAndStatus(Long idSku, Integer status);

    //delete Product theo idProduct
    Boolean deleteProduct(Integer idProduct);

    //return Product theo idProduct
    Boolean returnProduct(Integer idProduct);

    //xoá sku theo idSku and idProduct
    Boolean deleteSku(Long idSku , Integer idProduct);

    //return Product theo idProduct
    Boolean returnSku(Long idSku , Integer idProduct);
}
