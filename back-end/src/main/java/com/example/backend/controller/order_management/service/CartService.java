package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.cart.AddCart;
import com.example.backend.controller.order_management.model.cart.AddCartOffline;
import com.example.backend.controller.order_management.model.cart.LisCartSession;
import com.example.backend.controller.order_management.model.cart.ListCart;
import com.example.backend.controller.order_management.model.cart.ListCartOffline;
import com.example.backend.entity.Cart;

import java.util.List;


public interface CartService {
    Cart addToCart(AddCart listAddToCart);
    List<ListCart> getListCart(Integer idAccount);
    Integer quantityInCart(Integer idACcount);

    Cart addToCartOffline(AddCartOffline listAddToCart);
    List<ListCartOffline> getListCartOffline(Integer idAccount);

    List<LisCartSession> getListCartSession(Long idSku);

}
