package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.model.dto.AddAddress;
import com.example.backend.controller.order_management.service.AddressService;
import com.example.backend.entity.Address;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("")
    public List<Address> findByIdUser(@RequestParam("id") Integer id){
        return addressService.findByIdUser(id);
    }

    @PostMapping("/add")
    public Address add(@RequestBody AddAddress address){
        return addressService.add(address.getAddress(), address.getXaPhuong(), address.getQuanHuyen(), address.getTinhThanhPho(), address.getNameCustomer(), address.getNumberCustomer(), address.getIdUser());
    }

    @DeleteMapping("/delete/{id}")
    public Address delete(@PathVariable("id") Integer id){
        return addressService.delete(id);
    }
}
