package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.cartDetail.ChangeQuantity;
import com.example.backend.controller.order_management.model.cartDetail.ChangeSizeInCart;

public interface CartDetailService {
    String changeSizeCartDetail(ChangeSizeInCart changeSize);
    Boolean deleteCartDetail(Integer id);
    String changeQuantity(ChangeQuantity changeQuantity);
}
