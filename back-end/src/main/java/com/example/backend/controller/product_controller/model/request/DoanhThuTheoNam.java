package com.example.backend.controller.product_controller.model.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DoanhThuTheoNam {
   private Integer month;

    private BigDecimal totalMoney;

    private Integer quantity;
}
