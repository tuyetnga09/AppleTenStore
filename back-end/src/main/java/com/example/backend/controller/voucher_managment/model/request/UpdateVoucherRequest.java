package com.example.backend.controller.voucher_managment.model.request;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.sql.results.spi.LoadContexts;

import java.math.BigDecimal;
import java.time.LocalDate;
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

    private LocalDate  dateStart;

    private LocalDate  dateEnd;

    private BigDecimal valueVoucher;

    private Integer status;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
