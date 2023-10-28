package com.example.backend.controller.order_management.model.cart;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface LisCartSession {
    @Value("#{target['nameProduct']}")
    String getNameProduct();

    @Value("#{target['color']}")
    String getColor();

    @Value("#{target['capacity']}")
    String getCapacity();

    @Value("#{target['price']}")
    BigDecimal getPrice();

    @Value("#{target['idSku']}")
    Integer getIdSku();

    @Value("#{target['QuantitySKU']}")
    Integer getQuantitySKU();
}
