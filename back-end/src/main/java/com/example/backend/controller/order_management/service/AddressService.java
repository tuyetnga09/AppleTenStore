package com.example.backend.controller.order_management.service;

import com.example.backend.entity.Address;

import java.util.List;

public interface AddressService {

    List<Address> findByIdUser(Integer id);

    Address add(String address, String xaPhuong, String quanHuyen, String tinhThanhPho, String nameCustomer, String numberCustomer, Integer idUser);

    Address delete(Integer id);
}
