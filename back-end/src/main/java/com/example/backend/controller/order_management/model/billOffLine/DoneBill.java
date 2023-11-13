package com.example.backend.controller.order_management.model.billOffLine;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class DoneBill {

    private Integer idBill;

    private List<String> codeImeiDaBan;

    private BigDecimal moneyShip;

    private BigDecimal totalMoney;

    private BigDecimal beforePrice;

    private String address;

    private String note;

    private String personUpdate;

    private LocalDate dateUpdate;

    private List<Long> idSku;

    private Integer idCustomer;

    private List<String> methodPayments;

    private BigDecimal moneyPayment;

    private String notePayment;

    private BigDecimal cash;

    private BigDecimal transfer;

    private String formOfReceipt;

    private BigDecimal itemDiscount;
    private BigDecimal itemDiscountFreeShip;

    private Integer idVoucher;
    private Integer idVoucherFreeShip;
}
