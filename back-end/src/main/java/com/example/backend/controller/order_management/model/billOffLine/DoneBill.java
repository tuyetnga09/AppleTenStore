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

    private String address;

    private String note;

    private String personUpdate;

    private String phoneNumber;

    private String userName;

    private LocalDate dateUpdate;

    private List<Long> idSku;
}
