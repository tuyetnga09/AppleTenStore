package com.example.backend.controller.order_management.model.bill.request;

import com.example.backend.untils.StatusPayment;
import com.example.backend.untils.TypePayment;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CreatePaymentsMethodRequest {
    private String actionDescription;

    private BigDecimal totalMoney;

    private TypePayment method;

    private StatusPayment status;

}
