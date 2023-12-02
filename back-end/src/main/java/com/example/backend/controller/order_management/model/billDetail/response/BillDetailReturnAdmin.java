package com.example.backend.controller.order_management.model.billDetail.response;

import java.math.BigDecimal;

public interface BillDetailReturnAdmin {

    Integer getProductId();

    String getNameProduct();

    String getCapacity();

    String getColor();

    BigDecimal getPrice();

    String getCodeImei();

}
