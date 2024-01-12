package com.example.backend.controller.order_management.model.billOnline.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;

public interface VoucherHoaDonTruocKhiUpdate {

    @Value("#{target.idVC}")
    Integer getIdVC();

    @Value("#{target.nameVoucher}")
    String getNameVoucher();

    @Value("#{target.valueVoucher}")
    BigDecimal getValueVoucher();

    @Value("#{target.valueMin}")
    BigDecimal getValueMin();

}
