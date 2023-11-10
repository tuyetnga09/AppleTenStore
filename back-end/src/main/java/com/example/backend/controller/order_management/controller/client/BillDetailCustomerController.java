package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerResponse;
import com.example.backend.controller.order_management.service.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer/billDetail")
public class BillDetailCustomerController {

    @Autowired
    private BillDetailService billDetailService;

    @GetMapping("getAll")
    public List<BillDetailCustomerResponse> getAll(@RequestParam("id") Integer id){
        return billDetailService.getAll(id);
    }

    @GetMapping("getAllByCustomer")
    public List<BillDetailCustomerResponse> getAllByCustomer(@RequestParam("id") Integer id){
        return billDetailService.getAllByCustomer(id);
    }
}
