package com.example.backend.controller.product_controller.model.respon;

import org.springframework.beans.factory.annotation.Value;

public interface IdBillTheoThang {
    @Value("#{target.idBill}")
    Integer getIdBill();

    @Value("#{target.month}")
    Integer getMonth();
}
