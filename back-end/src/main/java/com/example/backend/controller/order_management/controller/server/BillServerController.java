package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.service.BillDetailService;
import com.example.backend.controller.order_management.service.BillService;
import com.example.backend.entity.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

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
    public Page<Bill> searchNoDate(Pageable pageable, @RequestParam("key") String key, @RequestParam("status") String status, @RequestParam("user") String user){
        return billService.searchNoDate(pageable, key, status, user);
    }

    @GetMapping("/searchWithDate")
    public Page<Bill> searchWithDate(Pageable pageable, @RequestParam("key") String key, @RequestParam("status") String status, @RequestParam("user") String user, @RequestParam("dateStart") LocalDate dateStart, @RequestParam("dateEnd") LocalDate dateEnd){
        return billService.searchWithDate(pageable, key, status, user, dateStart, dateEnd);
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
