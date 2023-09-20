package com.example.backend.controller.order_management.controller;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.model.cartDetail.ChangeQuantity;
import com.example.backend.controller.order_management.model.cartDetail.ChangeSizeInCart;
import com.example.backend.controller.order_management.service.CartDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/cart-detail")
public class CartDetailController {
    @Autowired
    private CartDetailService cartDetailService;
    @PostMapping("/change-size")
    public ResponseObj changSize(@RequestBody ChangeSizeInCart changeSize) {
        return new ResponseObj(cartDetailService.changeSizeCartDetail(changeSize));
    }
    @DeleteMapping("/{id}")
    public ResponseObj deleteCartDetail(@PathVariable("id") Integer idCartDetail) {
        return new ResponseObj(cartDetailService.deleteCartDetail(idCartDetail));
    }
    @PostMapping("/change-quantity")
    public ResponseObj changeQuantity(@RequestBody ChangeQuantity changeQuantity) {
        return new ResponseObj(cartDetailService.changeQuantity(changeQuantity));
    }
}
