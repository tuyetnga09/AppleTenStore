package com.example.backend.controller.order_management.model.billOffLine;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class VoucherShip {
    private Integer id;
    private BigDecimal value;
}
