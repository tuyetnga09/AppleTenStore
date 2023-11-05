package com.example.backend.controller.voucher_managment.controller;

import com.example.backend.controller.voucher_managment.service.VoucherService;
import com.example.backend.entity.Voucher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin/voucher")
@CrossOrigin("*")
public class VoucherAdminController {
    @Autowired
    private VoucherService voucherService;

    @GetMapping("/search-voucher/{code}")
    public List<Voucher> searchNoDate(@PathVariable("code") String code){
        return voucherService.searchVoucher(code);
    }
}
