package com.example.backend.controller.order_management.model.billOffLine.ion;

import org.springframework.beans.factory.annotation.Value;

public interface ImeiBillOffLineIonRespon {
    @Value("#{target.idImei}")
    Integer getIdImei();

    @Value("#{target.codeImei}")
    String getCodeImei();

    @Value("#{target.idSKU}")
    Long getIdSKU();

    @Value("#{target.quantityImei}")
    Integer getQuantityImei();

    @Value("#{target.capacitySKU}")
    String getCapacitySKU();

    @Value("#{target.colorSKU}")
    String getColorSKU();

    @Value("#{target.nameProduct}")
    String getNameProduct();
}
