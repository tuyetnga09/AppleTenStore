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
public class AnnualRevenue {

    private Integer month;
    private BigDecimal total_money;
    private Long quantity;
}
