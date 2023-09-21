package com.example.backend.controller.voucher_managment.model.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class CreateVoucherRequest {

    private String code;

    private Integer status;

    private String name;

    private BigDecimal valueMinimum;

    private BigDecimal valueMaximum;

    private Integer quantity;

    private BigDecimal conditionsApply;

    private Integer typeVoucher;

    private Date dateStart;

    private Date dateEnd;


    private BigDecimal valueVoucher;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}
