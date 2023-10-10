package com.example.backend.controller.voucher_managment.controller;
import com.example.backend.controller.voucher_managment.model.request.CreateVoucherRequest;
import com.example.backend.controller.voucher_managment.model.request.FindVoucherRequest;
import com.example.backend.controller.voucher_managment.model.request.UpdateVoucherRequest;
import com.example.backend.controller.voucher_managment.service.VoucherService;
import com.example.backend.entity.Voucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/voucher")
@CrossOrigin("*")
public class VoucherRestController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping("/get-by-id/{id}")
    public ResponseEntity getOneVoucher(@PathVariable("id") Integer id) {
        return new ResponseEntity(voucherService.getOne(id), HttpStatus.OK);
    }

    @PostMapping("/addVoucher")
    public ResponseEntity addVoucher(@RequestBody CreateVoucherRequest request) {
        return new ResponseEntity(voucherService.addVoucher(request), HttpStatus.CREATED);
    }

    @PutMapping("/updateVoucher/{id}")
    public ResponseEntity updateVoucher(@PathVariable("id") Integer id,@RequestBody UpdateVoucherRequest request) {
        return new ResponseEntity(voucherService.updateVoucher(request, id), HttpStatus.OK);
    }

    @DeleteMapping("/deleteVoucher/{id}")
    public ResponseEntity deleteVoucher(@PathVariable("id") Integer id) {
        return new ResponseEntity(voucherService.deleteVoucher(id), HttpStatus.OK);
    }

    @PutMapping("/deleteStatusVoucher/{id}")
    public ResponseEntity deleteTrangThaiVoucher(@PathVariable("id") Integer id) {
        return new ResponseEntity(voucherService.changeStatus(id), HttpStatus.OK);
    }

    @GetMapping("/vouchers")
    public ResponseEntity hienThiVoucher(@ModelAttribute FindVoucherRequest request, Pageable pageable) {
        return new ResponseEntity(voucherService.getAll(request, pageable ), HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity detailVoucher(@PathVariable("id") Integer id) {
        return new ResponseEntity(voucherService.findByIdVoucher(id) , HttpStatus.OK);
    }

    @GetMapping("/getVoucher")
    public ResponseEntity<List<Voucher>> hienThiVoucher(Voucher voucher) {
        return new ResponseEntity(voucherService.getVoucher(voucher), HttpStatus.OK);
    }

    @GetMapping("/getVoucherFreeShip")
    public ResponseEntity<List<Voucher>> hienThiVoucherFreeShip(Voucher voucher) {
        return new ResponseEntity(voucherService.getVoucherFreeShip(voucher), HttpStatus.OK);
    }

}
