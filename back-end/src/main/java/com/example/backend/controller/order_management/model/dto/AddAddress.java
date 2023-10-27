package com.example.backend.controller.order_management.model.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class AddAddress {

    private String address;

    private String xaPhuong;

    private String quanHuyen;

    private String tinhThanhPho;

    private String nameCustomer;

    private String numberCustomer;

    private Integer idUser;
}
