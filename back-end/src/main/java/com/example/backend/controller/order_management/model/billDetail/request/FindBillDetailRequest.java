package com.example.backend.controller.order_management.model.billDetail.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
public class FindBillDetailRequest {

    private String nameProduct;

    private Integer quantity;

    private BigDecimal price;

    private String address;

    private BigDecimal total;

    private String personCreate;

    private String personUpdate;

    private LocalDate dateCreate;

    private LocalDate dateUpdate;

    private Integer status;

    private String keyword;

    private Integer pageNo;

    private Integer pageSize;
}
