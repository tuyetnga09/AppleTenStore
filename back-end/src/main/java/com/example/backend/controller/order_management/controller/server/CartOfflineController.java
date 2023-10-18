package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.model.cart.AddCart;
import com.example.backend.controller.order_management.model.cart.AddCartOffline;
import com.example.backend.controller.order_management.model.cart.ListCart;
import com.example.backend.controller.order_management.model.cart.ListCartOffline;
import com.example.backend.controller.order_management.service.CartService;
import com.example.backend.repository.SKURepositoty;
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
@RequestMapping("/admin/cart")
public class CartOfflineController {
    @Autowired
    private CartService cartService;
    @Autowired
    private SKURepositoty skuRepositoty;

    @PostMapping("/addToCartOff")
    public ResponseObj addCart(@RequestBody AddCartOffline listAddToCart) {
        return new ResponseObj(cartService.addToCartOffline(listAddToCart));
    }

    @GetMapping("/{idAccount}")
    public List<ListCartOffline> getListCart(@PathVariable("idAccount") Integer idAccount) {
        return cartService.getListCartOffline(idAccount);
    }
}
