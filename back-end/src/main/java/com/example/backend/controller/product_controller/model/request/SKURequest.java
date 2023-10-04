package com.example.backend.controller.product_controller.model.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SKURequest {
    private String color;
    private String capacity;
    private Integer quantity;
    private BigDecimal price;
}
