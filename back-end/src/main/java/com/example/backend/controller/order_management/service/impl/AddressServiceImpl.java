package com.example.backend.controller.order_management.service.impl;

import com.example.backend.controller.order_management.service.AddressService;
import com.example.backend.entity.Address;
import com.example.backend.entity.User;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.untils.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImpl implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<Address> findByIdUser(Integer id) {
        return addressRepository.findByIdUser(id);
    }

    @Override
    public Address add(String address, String xaPhuong, String quanHuyen, String tinhThanhPho, String nameCustomer, String numberCustomer, Integer idUser) {
        User user = userRepository.findById(idUser).orElse(null);
        Address address1 = Address.builder().address(address).xaPhuong(xaPhuong).quanHuyen(quanHuyen).tinhThanhPho(tinhThanhPho).user(user).status(Status.DANG_SU_DUNG).nameCustomer(nameCustomer).numberCustomer(numberCustomer).build();
        return addressRepository.save(address1);
    }

    @Override
    public Address delete(Integer id) {
        Address address = addressRepository.findById(id).orElse(null);
        address.setStatus(Status.KHONG_SU_DUNG);
        return addressRepository.save(address);
    }
}
