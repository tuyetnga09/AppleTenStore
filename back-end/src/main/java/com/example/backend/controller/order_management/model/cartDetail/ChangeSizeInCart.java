package com.example.backend.controller.order_management.model.cartDetail;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
@Getter
@Setter
public class ChangeSizeInCart  {

     Integer idCartDetail;
     BigDecimal price;
     Integer quantity;
     Long idProductDetail;
}
