package com.example.backend.controller.order_management.model.billOffLine.ion;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface SkuBillOffLineIonRespon {
    @Value("#{target.nameProduct}")
    String getNameProduct();

    @Value("#{target.colorSKU}")
    String getColorSKU();

    @Value("#{target.capacitySKU}")
    String getCapacitySKU();
}
