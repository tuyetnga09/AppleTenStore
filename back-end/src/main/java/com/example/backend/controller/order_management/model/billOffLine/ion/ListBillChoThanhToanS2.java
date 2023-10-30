package com.example.backend.controller.order_management.model.billOffLine.ion;

import org.springframework.beans.factory.annotation.Value;

public interface ListBillChoThanhToanS2 {

    @Value("#{target.codeBill}")
    String getCodeBill();

    @Value("#{target.codeAccount}")
    String getCodeAccount();

    @Value("#{target.idBill}")
    Integer getIdBill();
}
