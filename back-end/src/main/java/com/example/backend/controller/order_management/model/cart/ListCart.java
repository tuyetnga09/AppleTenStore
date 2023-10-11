package com.example.backend.controller.order_management.model.cart;
import org.springframework.beans.factory.annotation.Value;

import java.util.Date;

public interface ListCart {
    @Value("#{target['Name Color']}")
    String getNameColor();
    @Value("#{target['Name Capacity']}")
    String getNameCapacity();
    @Value("#{target['Id Sku']}")
    Long getIdSKU();
    @Value("#{target['Id Cart Detail']}")
    Integer getIdCartDetail();

//    @Value("#{target.image}")
//    String getImage();

    @Value("#{target['Name Product']}")
    String getNameProduct();

    @Value("#{target['Capacity']}")
    String getCapacity();

    @Value("#{target['Color']}")
    String getColor();

    @Value("#{target['DATECREATE']}")
    Date getDateCreate();

    @Value("#{target['Price']}")
    String getPrice();

    @Value("#{target['Quantity']}")
    String getQuantity();


    @Value("#{target['Total']}")
    String getTotal();

    @Value("#{target['Id Product']}")
    Integer getIdProduct();
}
