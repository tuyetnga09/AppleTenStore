package com.example.backend.controller.product_controller.model.request;

import com.example.backend.entity.Product;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class Top8ProductMonthlyTrending {
    private  Long id;
    private Product product;
    private String color;
    private  String capacity;
    private BigDecimal price;
    private Long sumSku;
}
