package com.example.backend.controller.product_controller.model.respon;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class ImeiThatLac {
    private String codeBill;
    private String nameProduct;
    private BigDecimal gia;
    private String capacity;
    private String color;
    private Integer statusImei;
    private String typeBill;
}
