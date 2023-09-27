package com.example.backend.controller.voucher_managment.model.request;

import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Getter
@Setter
public class FindVoucherRequest {

    private String code;

    private String name;

    private Date dateStart;

    private Date endDate;

    private BigDecimal conditionsApply;

    private BigDecimal valueMinimum;

    private BigDecimal valueVoucher;

    private BigDecimal valueMaximum;

    private Integer quantity;

    private Integer typeVoucher;

    private Integer status;

    private String keyword;

    private Integer pageNo;

    private Integer pageSize;

}
