package com.example.backend.controller.product_controller.model.respon;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface BillDetailDashboardIon {
    @Value("#{target.idProduct}")
    Integer getIdProduct();

    @Value("#{target.nameImage}")
    String getNameImage();

    @Value("#{target.nameProduct}")
    String getNameProduct();
    @Value("#{target.capacity}")
    String getCapacity();

    @Value("#{target.color}")
    String getColor();

    @Value("#{target.price}")
    BigDecimal getPrice();

    @Value("#{target.imei}")
    String getImei();

}
