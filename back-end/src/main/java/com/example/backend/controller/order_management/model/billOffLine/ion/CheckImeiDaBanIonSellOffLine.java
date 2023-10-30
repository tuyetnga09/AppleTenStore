package com.example.backend.controller.order_management.model.billOffLine.ion;

import com.example.backend.untils.StatusBill;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface CheckImeiDaBanIonSellOffLine {
    @Value("#{target.codeBill}")
    String getCodeBill();

    @Value("#{target.nameProduct}")
    String getNameProduct();

    @Value("#{target.capacitySKU}")
    String getCapacitySKU();

    @Value("#{target.colorSKU}")
    String getColorSKU();

    @Value("#{target.priceSKU}")
    BigDecimal getPriceSKU();

    @Value("#{target.statusBill}")
    StatusBill getStatusBill();
}
