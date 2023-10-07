package com.example.backend.controller.order_management.model.billDetail.response;

import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface BillDetailReponse {

    @Value("#{target.id}")
    String getId();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.idproduct.name}")
    String getNameProduct();

    @Value("#{target.quantity}")
    Integer getQuantity();

    @Value("#{target.price}")
    BigDecimal getPrice();

    @Value("#{target.address}")
    String getAddress();

    @Value("#{target.idbill.total_money}")
    BigDecimal getTotal();

    @Value("#{target.idbill.person_create}")
    String getPersonCreate();

    @Value("#{target.idbill.person_update}")
    String getPersonUpdate();

    @Value("#{target.idbill.date_create}")
    LocalDate getDateCreate();

    @Value("#{target.idbill.date_update}")
    LocalDate getDateUpdate();
}
