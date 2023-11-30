package com.example.backend.controller.order_management.model.billDetail.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface BillDetailCustomerResponse {
    Integer getIdProduct();

    Integer getIdBill();

    Integer getIdSku();

    String getNameProduct();

    String getCapacity();

    String getColor();

    String getCategory();

    Integer getQuantity();

    BigDecimal getPrice();

    BigDecimal getTotalMoney();
}
