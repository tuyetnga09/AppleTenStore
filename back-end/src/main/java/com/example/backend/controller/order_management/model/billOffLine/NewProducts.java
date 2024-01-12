package com.example.backend.controller.order_management.model.billOffLine;

import com.example.backend.untils.StatusBill;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class NewProducts {
    private Integer bill;
    private Integer id;
    private Integer idProduct;
    private String nameProduct;
    private BigDecimal price;
    private Integer quantity;
    private Long sku;
    private StatusBill status;
    private String version;

    public NewProducts() {
    }

    public NewProducts(Integer bill, Integer id, Integer idProduct, String nameProduct, BigDecimal price,
                       Integer quantity, Long sku, StatusBill status, String version) {
        this.bill = bill;
        this.id = id;
        this.idProduct = idProduct;
        this.nameProduct = nameProduct;
        this.price = price;
        this.quantity = quantity;
        this.sku = sku;
        this.status = status;
        this.version = version;
    }
}
