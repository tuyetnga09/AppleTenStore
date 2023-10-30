package com.example.backend.controller.order_management.model.billOffLine;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class ImeiDaBanOffLineRequest {
    private  String codeImei;
    private String codeAccount;
    private Integer idBillDetail;
}
