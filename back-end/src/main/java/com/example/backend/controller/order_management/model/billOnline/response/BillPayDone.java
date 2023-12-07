package com.example.backend.controller.order_management.model.billOnline.response;

import java.math.BigDecimal;

public interface BillPayDone {

    Integer getIdBill();

    String getPaymentMethod();

    String getAddress();

    String getPhoneNumber();

    String getCode();

    BigDecimal getTotalMoney();

    String getStatusBill();
}
