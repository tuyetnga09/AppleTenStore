package com.example.backend.controller.order_management.model.billDetail.request.response;

import com.example.backend.entity.Bill;
import com.example.backend.entity.User;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(types = {Bill.class, User.class})
public interface BillResponse {
    String getStt();
    String getId();
    String getCode();
    String getDateCreate();
    String getUserName();
    String getNameEmployee();
    String getType();
    String getStatusBill();
    BigDecimal getTotalMoney();
    BigDecimal getItemDiscount();
}