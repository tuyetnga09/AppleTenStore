package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.service.BillDetailService;
import com.example.backend.entity.BillDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/billDetail")
public class BillDetailController {

    @Autowired
    private BillDetailService billDetailService;

    @GetMapping("")
    public ResponseEntity getAll(Pageable pageable){
        return new ResponseEntity(billDetailService.getAll(null, pageable), HttpStatus.OK);
    }

    @PutMapping("/update-quantity/{id}")
    public void changeQuantityOff(@PathVariable("id") Integer id, @RequestParam("quantity") Integer newQuantity) {
        billDetailService.updateQuantity(id, newQuantity);
    }

    @GetMapping(value = "/findBillDetails")
    public List<BillDetailOffLineIon> findBillDetails(@RequestParam(name = "idBill") Integer id){
        return this.billDetailService.findBillDetails(id);
    }

}