package com.example.backend.controller.order_management.model.bill.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;
@Getter
@Setter
public class BillRequestOnlineAccount {
    private String userName;
    private String phoneNumber;
    private String address;

    private BigDecimal moneyShip;
    private BigDecimal itemDiscount;

    private BigDecimal totalMoney;
    private String paymentMethod;

    private List<BillAskClient> billDetail;
    private BigDecimal afterPrice;

    private Integer idVoucher;
    private Integer idAccount;
}
