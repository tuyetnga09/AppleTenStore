package com.example.backend.controller.product_controller.model.product_detail.ion;

import org.springframework.beans.factory.annotation.Value;

public interface ProductDetailIonAdmin {
    @Value("#{target.idProduct}")
    Integer getIdProduct();

    @Value("#{target.nameProduct}")
    String getNameProduct();

    @Value("#{target.sumSKU}")
    Integer getSumSKU();

    @Value("#{target.sumImei}")
    Integer getSumImei();

    @Value("#{target.sumImeiDaBan}")
    Integer getSumImeiDaBan();

    @Value("#{target.sumImeiTrongGioHang}")
    Integer getSumImeiTrongGioHang();

    @Value("#{target.sumImeiTrongKho}")
    Integer getSumImeiTrongKho();

    @Value("#{target.sumImeiNgungHoatDong}")
    Integer getSumImeiNgungHoatDong();

    @Value("#{target.statusProduct}")
    Integer getStatusProduct();

}
