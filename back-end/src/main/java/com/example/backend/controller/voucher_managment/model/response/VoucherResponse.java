package com.example.backend.controller.voucher_managment.model.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public interface VoucherResponse {
    @Value("#{target.id}")
    String getId();

    @Value("#{target.code}")
    String getMa();

    @Value("#{target.name}")
    String getTen();

    @Value("#{target.quantity}")
    String getSoLuong();

    @Value("#{target.conditionsApply}")
    String getDieuKienApDung();

    @Value("#{target.typeVoucher}")
    Integer getLoaiVoucher();

    @Value("#{target.dateStart}")
    LocalDateTime getNgayBatDau();

    @Value("#{target.dateEnd}")
    LocalDateTime getNgayKetThuc();

    @Value("#{target.valueVoucher}")
    BigDecimal getGiaTriVoucher();

    @Value("#{target.valueMaximum}")
    BigDecimal getGiaTriToiDa();

    @Value("#{target.valueMinimum}")
    BigDecimal getGiaTriToiThieu();

    @Value("#{target.status}")
    Integer getTrangThai();
}
