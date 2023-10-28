package com.example.backend.controller.order_management.model.billOffLine;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString

public class BillOffLineModel {
    private Integer idBill;
    private String codeBill;
    private String codeAccount;
}
