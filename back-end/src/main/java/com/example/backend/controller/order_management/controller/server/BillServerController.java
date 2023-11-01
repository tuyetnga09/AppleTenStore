package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.service.BillService;
import com.example.backend.entity.Bill;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Bill> searchNoDate(@RequestParam("key") String key, @RequestParam("status") String status, @RequestParam("user") String user){
        return billService.searchNoDate(key, status, user);
    }

    @GetMapping("/searchWithDate")
    public List<Bill> searchWithDate(@RequestParam("key") String key, @RequestParam("status") String status, @RequestParam("user") String user, @RequestParam("dateStart") LocalDate dateStart, @RequestParam("dateEnd") LocalDate dateEnd){
        return billService.searchWithDate(key, status, user, dateStart, dateEnd);
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
