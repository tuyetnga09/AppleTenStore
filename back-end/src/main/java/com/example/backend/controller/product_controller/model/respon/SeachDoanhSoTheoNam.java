package com.example.backend.controller.product_controller.model.respon;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
public class SeachDoanhSoTheoNam {
    private Boolean chechSeach;

    private Integer month;

    private BigDecimal totalMoney;

    private Integer quantity;
}
