package com.example.backend.controller.order_management.model.cart;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AddCart {
   private Integer idAccount;
    private Integer idProductDetail;
    private Integer quantity;
    private BigDecimal price;

}
