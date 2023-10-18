package com.example.backend.controller.order_management.model.cart;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class AddCartOffline {

    private Integer idAccount;
    private Long idSKU;
    private Integer quantity;
    private BigDecimal price;

}
