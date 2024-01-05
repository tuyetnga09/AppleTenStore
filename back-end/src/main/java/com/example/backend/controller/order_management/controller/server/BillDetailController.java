package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.billDetail.response.BillDetailReturnAdmin;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.service.BillDetailService;
import com.example.backend.controller.product_controller.service.impl.SKUServiceImpl;
import com.example.backend.entity.BillDetails;
import com.example.backend.repository.SKURepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/billDetail")
public class BillDetailController {

    @Autowired
    private BillDetailService billDetailService;

    @Autowired
    private SKURepositoty skuRepositoty;

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

    @GetMapping("/getAllBillDetailReturn")
    public List<BillDetailReturnAdmin> getAllBillDetailReturn(@RequestParam("status") Integer status, @RequestParam("idBill") Integer idBill, @RequestParam("codeImei") String codeImei){
        return billDetailService.getAllBillDetailReturn(status, idBill, codeImei);
    }

    @PostMapping(value = "/save")
    public void saveBillDetail(@RequestBody BillDetails billDetails){
        this.skuRepositoty.updateQuantity(billDetails.getSku().getId(), 1);
        billDetails.setDateCreate(new Date());
        this.billDetailService.save(billDetails);
    }

}