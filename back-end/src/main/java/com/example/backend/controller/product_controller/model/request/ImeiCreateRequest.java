package com.example.backend.controller.product_controller.model.request;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@ToString
public class ImeiCreateRequest {
   private String codeImei;
   private BigDecimal price;
   private Long idSku;
   private Integer idProduct;
}
