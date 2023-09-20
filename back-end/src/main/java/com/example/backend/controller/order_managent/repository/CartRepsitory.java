package com.example.backend.controller.order_managent.repository;

import com.example.backend.entity.Cart;

public interface CartRepsitory extends GenericRepsitory<Cart, Integer>{
    Cart getCartByOrderId(Integer id);
}
