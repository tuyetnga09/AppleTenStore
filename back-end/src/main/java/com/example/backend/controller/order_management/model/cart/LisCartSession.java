package com.example.backend.controller.order_management.model.cart;

import org.springframework.beans.factory.annotation.Value;

public interface LisCartSession {
    @Value("#{target['nameProduct']}")
    String getNameProduct();

    @Value("#{target['color']}")
    String getColor();

    @Value("#{target['capacity']}")
    String getCapacity();

    @Value("#{target['price']}")
    String getPrice();

    @Value("#{target['idProduct']}")
    Integer getIdProduct();

    @Value("#{target['QuantitySKU']}")
    String getQuantitySKU();
}
