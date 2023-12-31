package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.model.cartDetail.ChangeQuantity;
import com.example.backend.controller.order_management.model.cartDetail.ChangeSizeInCart;
import com.example.backend.controller.order_management.service.CartDetailService;
import com.example.backend.entity.CartDetail;
import com.example.backend.entity.SKU;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer/cart-detail")
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

    @PutMapping("/update-quantity/{id}")
    public void changeQuantity(@PathVariable("id") Integer id, @RequestParam("quantity") Integer newQuantity) {
        cartDetailService.updateQuantity(id, newQuantity);
    }

    @GetMapping("/getCartDetail/{id}")
    public Integer getCartDetail(@PathVariable("id") Long id,@RequestParam("idAccount") Integer idAccount) {
        return cartDetailService.getQuantityCartDetailBySku(id, idAccount);
    }

    @DeleteMapping("/deleteAll/{id}")
    public ResponseObj deleteAllCartDetail(@PathVariable("id") Integer idAccount) {
        return new ResponseObj(cartDetailService.deleteAllCartDetail(idAccount));
    }
}
