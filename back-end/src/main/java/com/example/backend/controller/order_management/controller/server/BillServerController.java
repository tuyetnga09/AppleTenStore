package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.service.BillService;
import com.example.backend.entity.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/manager/bill")
public class BillServerController {
    @Autowired
    private BillService billService;

    @GetMapping("/detail/{id}")
    public ResponseObj detail(@PathVariable("id") Integer id){
        return  new ResponseObj(billService.detail(id));
    }

    @GetMapping("/searchNoDate")
    public List<Bill> searchNoDate(@RequestParam("key") String key, @RequestParam("status") String status){
        return billService.searchNoDate(key, status);
    }

    @GetMapping("/searchWithDate")
    public List<Bill> searchWithDate(@RequestParam("key") String key, @RequestParam("status") String status, @RequestParam("dateStart") LocalDate dateStart, @RequestParam("dateEnd") LocalDate dateEnd){
        return billService.searchWithDate(key, status, dateStart, dateEnd);
    }

    @PutMapping("/updateAll/{personUpdate}")
    public void updateAllCVC(@PathVariable("personUpdate") String personUpdate){
         billService.updateAllChoThanhToan(personUpdate);
    }

    @GetMapping("/getAll-bill-detail-CXN")
    public ResponseEntity<List<BillDetailOffLineIon>> getAllBillChoXacNhan() {
        List<BillDetailOffLineIon> billDetailsList = billService.getAllBillChoXacNhan();
        return new ResponseEntity<>(billDetailsList, HttpStatus.OK);
    }

    @GetMapping("/getAccountBillCXN")
    public Integer getCountBillCXN() {
        return billService.getCountBillCXN();
    }

    @GetMapping("/getAll-billOffline-detail-CXN")
    public ResponseEntity<List<Bill>> getAllBillOfflineChoXacNhan() {
        List<Bill> billDetailsList = billService.getBillOfflineCXN();
        return new ResponseEntity<>(billDetailsList, HttpStatus.OK);
    }
//    @RestController
//    @CrossOrigin("*")
//    @RequestMapping("/admin/billDetail")
//    public static class BillDetailController {
//
//        @Autowired
//        private BillDetailService billDetailService;
//
//        @GetMapping("")
//        public ResponseEntity getAll(Pageable pageable){
//            return new ResponseEntity(billDetailService.getAll(null, pageable), HttpStatus.OK);
//        }
//    }
}
