package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.model.cart.AddCart;
import com.example.backend.controller.order_management.model.cart.ListCart;
import com.example.backend.controller.order_management.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @PostMapping("/addToCart")
    public ResponseObj addCart(@RequestBody AddCart listAddToCart) {
        return new ResponseObj(cartService.addToCart(listAddToCart));
    }

    @GetMapping("/{idAccount}")
    public List<ListCart> getListCart(@PathVariable("idAccount") Integer idAccount) {
        return cartService.getListCart(idAccount);
    }

    @GetMapping("/quantityInCart/{idAccount}")
    public Integer getQuantityInCart(@PathVariable("idAccount") Integer idAccount) {
        return cartService.quantityInCart(idAccount);
    }
}
