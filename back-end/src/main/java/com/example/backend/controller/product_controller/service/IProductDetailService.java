package com.example.backend.controller.product_controller.service;

import com.example.backend.controller.product_controller.model.product_detail.ion.ProductDetailIonAdmin;
import com.example.backend.controller.product_controller.model.product_detail.ion.SkuIonAdmin;
import com.example.backend.controller.product_controller.model.request.ImeiCreateRequest;
import com.example.backend.controller.product_controller.model.respon.ImeiThatLac;
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
    Boolean deleteSku(Long idSku, Integer idProduct);

    //return Product theo idProduct
    Boolean returnSku(Long idSku, Integer idProduct);

    //delete imei (cập nhật status imei =1)
    Boolean deleteImei(Integer idImei);

    //return imei (cập nhật status imei =0)
    Boolean returnImei(Integer idImei);

    // add 1 imei
    Imei addOneImei(ImeiCreateRequest imeiCreateRequest);

    //check gia sku đã tồn tại chưa
     Boolean checkGiaSku(Long idSku);

     //lấy ra đối tượng SkuIonAdmin
    SkuIonAdmin getSkuIonAdmin(Long idSku);

    // cập nhật các imei đã được chọn thành status =1 (đã xoá)
    Boolean checkBoxListImei(List<String> codeImeis,Integer status);

    //cập nhật all imei hoạt động -> xoá (xoá all imei)
    Boolean updateAllImei(Integer statusUpdate, Long idSku, Integer status);

    //seach imei (codeImei , status)
    List<Imei> seachImeis(String codeImei, Integer status,  Long idSku);

    //tìm kiếm imei thất lạc
     List<ImeiThatLac> seachImeisThatLac(String codeImei);

     //update imei
     Boolean update(Imei imei, Integer id);

    Imei getOneImei(Integer idImei);
}
