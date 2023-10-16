package com.example.backend.controller.product_controller.model.request;

import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface ListSkuProduct {
    @Value("#{target['Price SKU']}")
    String getPrice();

    @Value("#{target['Product ID']}")
    Integer getIdProduct();

    @Value("#{target['SKU ID']}")
    Long getIdSKU();

    @Value("#{target['SKU Quantity']}")
    String getQuantitySKU();

    @Value("#{target['Capacity']}")
    String getNameCapacity();

    @Value("#{target['Color']}")
    String getNameColor();

    @Value("#{target['Name Product']}")
    String getNameProduct();
}
