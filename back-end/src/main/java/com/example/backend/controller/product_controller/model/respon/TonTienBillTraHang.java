package com.example.backend.controller.product_controller.model.respon;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface TonTienBillTraHang {
    @Value("#{target.idBill}")
    Integer getIdBill();

    @Value("#{target.idBillDetail}")
    Integer getIdBillDetail();

    @Value("#{target.idImeiDaBan}")
    Long getIdImeiDaBan();

    @Value("#{target.price}")
    BigDecimal getPrice();
}
