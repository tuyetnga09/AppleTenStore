package com.example.backend.controller.order_management.model.bill.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreateBillDetailRequest {
    private Integer idBill;
    private Integer idProduct;

    private String color;
    private String capacity;
    private Integer quantity;

    private BigDecimal totalMoney;

    private BigDecimal price;
}
