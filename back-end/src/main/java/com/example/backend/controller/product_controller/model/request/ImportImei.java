package com.example.backend.controller.product_controller.model.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class ImportImei {
    private  String codeImei;
    private String color;
    private String capacity;
    private Integer quantity;
    private BigDecimal price;
    private String nameProduct;
    private Integer check; //=0 thì ok, = 1 thì trùng, = 2 là lỗi, = 3 là tất cả mã imei rỗng
}
