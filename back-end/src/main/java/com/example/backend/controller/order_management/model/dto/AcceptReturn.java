package com.example.backend.controller.order_management.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AcceptReturn {

    private Integer idBill;

    private List<String> codeImeiDaBan;
}
