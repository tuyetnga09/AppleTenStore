package com.example.backend.controller.order_management.model.billOffLine.ion;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface ImeiBillOfflinePDF {

    @Value("#{target.codeImei}")
    String getCodeImei();

    @Value("#{target.capacity}")
    String getCapacity();

    @Value("#{target.color}")
    String getColor();

    @Value("#{target.price}")
    BigDecimal getPrice();

    @Value("#{target.nameProduct}")
    String getNameProduct();
}
