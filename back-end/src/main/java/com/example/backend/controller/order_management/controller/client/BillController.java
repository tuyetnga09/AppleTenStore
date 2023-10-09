package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.model.EmailService;
import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnline;
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
    @Autowired
    private EmailService emailService;
    @PostMapping("")
    public ResponseObj create(@RequestBody BillRequestOnline request)  {
        String userEmail = request.getEmail();
        String subject = "Hoá đơn của bạn đã được tạo thành công";
        String message = "Chúc mừng! Hoá đơn của bạn đã được tạo thành công.";



        emailService.sendEmail(userEmail, subject, message);
        return new ResponseObj(billService.createBillCustomerOnlineRequest(request));
    }

}
