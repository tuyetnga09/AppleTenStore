package com.example.backend.controller.order_management.model.bill.response;

import com.example.backend.entity.Bill;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.Capacity;
import com.example.backend.entity.Color;
import com.example.backend.entity.Product;
import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.math.BigDecimal;

@Projection(types = {Bill.class, BillDetails.class, Product.class, Product.class, Color.class, Capacity.class})
public interface BillResponse {
    @Value("#{target.stt}")
    String getStt();

    @Value("#{target.id_product}")
    Integer getIdProduct();

    @Value("#{target.id_bill}")
    String getIdBill();

    @Value("#{target.id}")
    Integer getId();

    @Value("#{target.image}")
    String getImage();

    @Value("#{target.code}")
    String getCodeProduct();

    @Value("#{target.product_name}")
    String getProductName();

    @Value("#{target.name_color}")
    String getNameColor();

    @Value("#{target.name_size}")
    String getNameSize();

    @Value("#{target.name_sole}")
    String getNameSole();

    @Value("#{target.name_material}")
    String getNameMaterial();

    @Value("#{target.name_category}")
    String getNameCategory();

    @Value("#{target.price}")
    BigDecimal getPrice();

    @Value("#{target.quantity}")
    Integer getQuantity();

    @Value("#{target.max_quantity}")
    Integer getMaxQuantity();

    @Value("#{target.status_bill}")
    String getStatus();
}
