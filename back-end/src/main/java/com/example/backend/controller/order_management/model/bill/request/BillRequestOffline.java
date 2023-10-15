package com.example.backend.controller.order_management.model.bill.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class BillRequestOffline {
    private String phoneNumber;

    private String idUser;

    private String address;

    private String userName;

    private String itemDiscount;

    private String totalMoney;

    private String note;

    private String typeBill;

    private String code;

    private String statusPayMent;

    private String deliveryDate;

    private boolean openDelivery;

    private String moneyShip;

    private List<CreateBillDetailRequest> billDetailRequest;

    private List<CreatePaymentsMethodRequest> paymentsMethodRequest;

    private List<CreateVoucherDetailRequest> voucher;
}
