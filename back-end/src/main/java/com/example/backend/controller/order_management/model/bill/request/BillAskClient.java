package com.example.backend.controller.order_management.model.bill.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BillAskClient {
    private Long idProductDetail;
    private BigDecimal price;
    private Integer quantity;
}
