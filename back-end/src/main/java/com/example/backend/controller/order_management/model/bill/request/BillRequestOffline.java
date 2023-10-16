package com.example.backend.controller.order_management.model.bill.request;

<<<<<<< HEAD
import com.example.backend.controller.order_management.model.cart.ListCart;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
public class BillRequestOffline {

    private String userName;

    private String phoneNumber;

    private String email;

    private String address;

    private String province;

    private String district;

    private BigDecimal itemDiscount;

    private BigDecimal totalMoney;

    private List<BillAskClient> billDetail;

    private String paymentMethod;

    private BigDecimal afterPrice;

    private Integer idVoucher;

    private String wards;


=======
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

    private String statusPayMents;

    private String deliveryDate;

    private boolean openDelivery;

    private String moneyShip;

    private List<CreateBillDetailRequest> billDetailRequest;

    private List<CreatePaymentsMethodRequest> paymentsMethodRequest;

    private List<CreateVoucherDetailRequest> voucher;
>>>>>>> 0f10eaa0ce21f087a2b5d202ee14eb6fbd3c7eab
}
