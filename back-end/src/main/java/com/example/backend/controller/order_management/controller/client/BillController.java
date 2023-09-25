package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.model.bill.request.BillRequest;
import com.example.backend.controller.order_management.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer/bill")
public class BillController {
    @Autowired
    private BillService billService;
    @PostMapping("")
    public ResponseObj create(@RequestBody BillRequest request)  {
        return new ResponseObj(billService.createBillCustomerOnlineRequest(request));
    }
}
