package com.example.backend.controller.order_management.model.billOffLine.ion;

import com.example.backend.untils.StatusBill;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigDecimal;
import java.util.Date;

public interface ListBillChoThanhToan {
    @Value("#{target.id}")
    Integer getId();

    @Value("#{target.quantity}")
    Integer getQuantity();

    @Value("#{target.price}")
    BigDecimal getPrice();


    @Value("#{target.statusBillDetail}")
    StatusBill getStatusBill();

//    @Value("#{target.product}")
//    Integer getProduct();

    @Value("#{target.bill}")
    Integer getBill();

    @Value("#{target.CodeBill}")
    String getCodeBill();

    @Value("#{target.IdBill}")
    Integer getIdBill();

    @Value("#{target.codeAccount}")
    String getCodeAccount();

    @Value("#{target.personCreate}")
    String getPersonCreate();

    @Value("#{target.personUpdate}")
    String getPersonUpdate();

    @Value("#{target.dateCreate}")
    Date getDateCreate();

    @Value("#{target.dateUpdate}")
    Date getDateUpdate();

    @Value("#{target.idSKU}")
    Long getIdSKU();

    @Value("#{target.skuCapacity}")
    String getSkuCapacity();

    @Value("#{target.skuPrice}")
    BigDecimal getSkuPrice();

    @Value("#{target.skuColor}")
    String getSkuColor();

    @Value("#{target.idProduct}")
    Integer getIdProduct();

    @Value("#{target.nameProduct}")
    String getNameProduct();

    @Value("#{target.totalManyOneBillDetail}")
    BigDecimal getTotalManyOneBillDetail();

    @Value("#{target.soLuongImeiDaChon}")
    Integer getSoLuongImeiDaChon();

}
