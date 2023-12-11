package com.example.backend.controller.product_controller.model.product_detail.ion;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface SkuIonAdmin {
    @Value("#{target.idSku}")
    Integer getIdSku();

    @Value("#{target.idProduct}")
    Long getIdProduct();

    @Value("#{target.nameProduct}")
    String getNameProduct();

    @Value("#{target.skuCapacity}")
    String getSkuCapacity();

    @Value("#{target.skuColor}")
    String getSkuColor();

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

    @Value("#{target.statusSku}")
    Integer getStatusSku();

    @Value("#{target.priceSKU}")
    BigDecimal getPriceSKU();

    @Value("#{target.sumImeiLoi}")
    Integer getSumImeiLoi();
}


