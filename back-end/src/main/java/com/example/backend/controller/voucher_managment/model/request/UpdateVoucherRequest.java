package com.example.backend.controller.voucher_managment.model.request;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
public class UpdateVoucherRequest {

    private String code;

    private String name;

    private BigDecimal valueMinimum ;

    private BigDecimal valueMaximum ;

    private Integer quantity;

    private Integer typeVoucher;

    private BigDecimal conditionsApply;

    private Date dateStart;

    private Date dateEnd;

    private BigDecimal valueVoucher;

    private Integer status;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
