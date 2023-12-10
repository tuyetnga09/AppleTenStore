package com.example.backend.controller.order_management.model.billOffLine.ion;

import org.springframework.beans.factory.annotation.Value;

public interface XoaHoaDonChoIon {
    @Value("#{target.idBill}")
    Integer getIdBill();

    @Value("#{target.idBillDetail}")
    Integer getIdBillDetail();

    @Value("#{target.idImeiDaBan}")
    Long getIdImeiDaBan();

    @Value("#{target.codeImei}")
    String getCodeImei();
}
