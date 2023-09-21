package com.example.backend.controller.order_management.model.bill.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BillRequest {
    private String userName;
    private String phoneNumber;
    private String email;
    private String address;
    private String province;
    private String district;
    private BigDecimal moneyShip;
    private BigDecimal itemDiscount;

    private BigDecimal totalMoney;
    private String paymentMethod;

}
