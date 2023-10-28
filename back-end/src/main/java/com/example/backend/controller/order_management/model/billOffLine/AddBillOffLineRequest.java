package com.example.backend.controller.order_management.model.billOffLine;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class AddBillOffLineRequest {

    private String codeBill;
    private Long idSKU;
    private BigDecimal price;
    private  Integer quantity;
    private Integer idAccount;
}
