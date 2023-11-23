package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.service.PointConversionService;
import com.example.backend.repository.PointConversionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/admin/point")
@CrossOrigin("*")
public class PointConversionController {

    @Autowired
    private PointConversionService pointConversionService;

    @Autowired
    private PointConversionRepository pointConversionRepository;

    @GetMapping
    public ResponseObj getOne(){
        return new ResponseObj(pointConversionRepository.getOneLatest());
    }

    @PutMapping("/update")
    public ResponseObj updateMoney(@RequestParam("money") Integer money){
        return new ResponseObj(pointConversionService.updateMoney(money));
    }
}
