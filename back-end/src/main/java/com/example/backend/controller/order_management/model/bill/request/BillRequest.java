package com.example.backend.controller.order_management.model.bill.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

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

    private List<BillAskClient> billDetail;

    private BigDecimal afterPrice;

    private Integer idVoucher;

    private String wards;
}
