package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.service.BillDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
@RequestMapping("/billDetail")
public class BillDetailController {

    @Autowired
    private BillDetailService billDetailService;

    @GetMapping("")
    public ResponseEntity getAll(Pageable pageable){
        return new ResponseEntity(billDetailService.getAll(null, pageable), HttpStatus.OK);
    }
}
