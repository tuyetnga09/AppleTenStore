package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.model.bill.request.BillReturn;
import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerIon;
import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerResponse;
import com.example.backend.controller.order_management.service.BillDetailService;
import com.example.backend.controller.order_management.service.TraHangService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private TraHangService traHangService;

    @GetMapping("getAll")
    public List<BillDetailCustomerResponse> getAll(@RequestParam("id") Integer id){
        return billDetailService.getAll(id);
    }

    @GetMapping("getAllByCustomer")
    public List<BillDetailCustomerResponse> getAllByCustomer(@RequestParam("id") Integer id){
        return billDetailService.getAllByCustomer(id);
    }


    @GetMapping("/get-all-bill-detail")
    public ResponseEntity<List<BillDetailCustomerIon>> getAllBillDetail(@RequestParam("id") Integer id){
        List<BillDetailCustomerIon> billDetailCustomerIons = billDetailService.getBillDetailOfIdBill(id);
        return new ResponseEntity<>(billDetailCustomerIons, HttpStatus.OK);
    }

    @GetMapping("/yeu-cau-tra-hang")
    public ResponseEntity<List<BillDetailCustomerIon>> yeuCauTraHang(@RequestParam("idBillReturn")Integer idBillReturn,
                                                                     @RequestParam("noteBillReturn")String noteBillReturn,
                                                                     @RequestParam("idImeiDaBans") List<Long> idImeiDaBans){
        List<BillDetailCustomerIon> billDetailCustomerIons =
                traHangService.khachHangTraHang( idBillReturn, noteBillReturn, idImeiDaBans);
        return new ResponseEntity<>(billDetailCustomerIons, HttpStatus.OK);
    }
}
