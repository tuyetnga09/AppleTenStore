package com.example.backend.controller.order_management.model.billOnline.response;

import com.example.backend.untils.StatusBill;
import com.example.backend.untils.TypeBill;

import java.math.BigDecimal;
import java.time.LocalDate;

public interface BillAndPayment {

    LocalDate getCompletionDate();

    LocalDate getConfirmationDate();

    LocalDate getDateCreate();

    LocalDate getDateUpdate();

    LocalDate getDeliveryDate();

    Integer getId();

    Integer getIdAccount();

    Integer getIdCustomer();

    BigDecimal getItemDiscount();

    BigDecimal getMoneyShip();

    Integer getNumberOfPointsUsed();

    BigDecimal getPointConversionAmount();

    LocalDate getReceiveDate();

    BigDecimal getTotalMoney();

    String getAddress();

    String getCode();

    String getNote();

    String getNoteReturn();

    String getPersonCreate();

    String getPersonUpdate();

    String getPhoneNumber();

    String getStatusBill();

    String getTypeBill();

    String getUserName();

    String getMethod();
}
