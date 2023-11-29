package com.example.backend.controller.order_management.model.billDetail.response;

import java.math.BigDecimal;

public interface BillDetailCustomerIon {
    Integer getIdBill();

    Integer getIdBillDetail();

    Long getIdImei();

    Long getIdSku();

    Integer getIdProduct();

    String getNameProduct();

    String getCapacity();

    String getColor();

    String getCategory();

    Integer getQuantity();

    BigDecimal getPrice();

    String getImei();

    String getStatusImei();


}
