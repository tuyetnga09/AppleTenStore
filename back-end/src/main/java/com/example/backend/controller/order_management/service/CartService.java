package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.cart.AddCart;
import com.example.backend.controller.order_management.model.cart.ListCart;
import com.example.backend.entity.Cart;

import java.util.List;


public interface CartService {
    Cart addToCart(AddCart listAddToCart);
    List<ListCart> getListCart(Integer idAccount);
    Integer quantityInCart(Integer idACcount);
}
