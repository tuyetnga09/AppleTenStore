package com.example.backend.controller.product_controller.model.product_detail.ion;

import org.springframework.beans.factory.annotation.Value;

public interface SkuOfBillDetails {

    @Value("#{target.id}")
    Integer getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.product_id}")
    Integer getProductId();

    @Value("#{target.color}")
    String getColor();

    @Value("#{target.capacity}")
    String getCapacity();

    @Value("#{target.quantity}")
    Integer getQuantity();

    @Value("#{target.price}")
    Long getPrice();

}
