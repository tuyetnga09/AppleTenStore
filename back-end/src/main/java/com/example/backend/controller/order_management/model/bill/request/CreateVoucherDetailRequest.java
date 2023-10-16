package com.example.backend.controller.order_management.model.bill.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateVoucherDetailRequest {
    private Integer idVoucher;

    private BigDecimal beforePrice;

    private BigDecimal afterPrice;

    private BigDecimal discountPrice;
}
