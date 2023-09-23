package com.example.backend.controller.order_management.model.cart;

import com.example.backend.entity.Cart;
import org.springframework.beans.factory.annotation.Value;

public interface ListCart {
    @Value("#{target['Name Color']}")
    String getNamColor();
    @Value("#{target['Name Capacity']}")
    String getNameCapacity();
    @Value("#{target['Id Product']}")
    Integer getIdProduct();
    @Value("#{target['Id Cart Detail']}")
    Integer getIdCartDetail();

//    @Value("#{target.image}")
//    String getImage();

    @Value("#{target['Name Product']}")
    String getNameProduct();

    @Value("#{target['Price']}")
    String getPrice();

    @Value("#{target['Quantity']}")
    String getQuantity();


    @Value("#{target['Total']}")
    String getTotal();
}
