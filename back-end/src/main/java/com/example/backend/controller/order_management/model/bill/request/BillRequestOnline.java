package com.example.backend.controller.order_management.model.bill.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class BillRequestOnline {
    private String code;
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

    private Integer quantity;

    private BigDecimal afterPrice;

    private Integer idVoucher;

    private String wards;
}
