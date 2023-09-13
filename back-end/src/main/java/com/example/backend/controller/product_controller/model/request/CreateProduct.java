package com.example.backend.controller.product_controller.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class CreateProduct {
    private String codeProduct;
    private String nameProduct;
    private Float price;
    private String description;
    private String battery;
    private String capacity;
    private String category;
    private String chip;
    private String color;
    private String image;
    private String manufacturer;
    private String ram;
    private String screen;
    private String size;

}
