package com.example.backend.controller.product_controller.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@ToString
public class CreateProduct {
    private String codeProduct;
    private String nameProduct;
    private BigDecimal price;
    private String description;
    private String battery;
    private List<String>  capacity;
    private String category;
    private String chip;
    private List<String> color; // Sử dụng List<String> thay vì String
    private String manufacturer;
    private String ram;
    private String screen;
    private String size;
    private List<SKURequest> skus;

}
