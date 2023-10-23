package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.service.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/cart-detail")
public class CartDetailOfflineController {
    @Autowired
    private CartDetailService cartDetailService;

    @DeleteMapping("/{id}")
    public ResponseObj deleteCartDetailOff(@PathVariable("id") Integer idCartDetail) {
        return new ResponseObj(cartDetailService.deleteCartDetailOff(idCartDetail));
    }

    @PutMapping("/update-quantity/{id}")
    public void changeQuantityOff(@PathVariable("id") Integer id, @RequestParam("quantity") Integer newQuantity) {
        cartDetailService.updateQuantityCartOff(id, newQuantity);
    }
}
