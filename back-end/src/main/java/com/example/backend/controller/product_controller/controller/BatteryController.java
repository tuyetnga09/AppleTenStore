package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.BatteryServiceImpl;
import com.example.backend.entity.Battery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin/battery/")
@CrossOrigin("*")
public class BatteryController {

    @Autowired
    private BatteryServiceImpl service;

    @GetMapping("{id}")
    public ResponseEntity<Battery> detail(@PathVariable("id") Integer id) {
        return new ResponseEntity<>(service.getOne(id), HttpStatus.OK);
    }

    @GetMapping("get-all-battery")
    public ResponseEntity<List<Battery>> getAllBattery() {
        return new ResponseEntity<>(service.getAll(), HttpStatus.OK);
    }

    @GetMapping("getAll")
    public ResponseEntity<Page<Battery>> paging(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Battery> batteryPage = service.search(pageable, key);
        return new ResponseEntity<>(batteryPage, HttpStatus.OK);
    }

    @GetMapping("displayDelete")
    public ResponseEntity<Page<Battery>> viewAllDelete(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Battery> batteryPage = service.getDelete(pageable, key);
        return new ResponseEntity<>(batteryPage, HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<String> add(@RequestBody Battery battery) {
        service.insert(battery);
        return new ResponseEntity<>("Add ok", HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> update(@RequestBody Battery battery, @PathVariable("id") Integer id) {
        service.update(battery, id);
        return new ResponseEntity<>("Update ok", HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Integer id) {
        Battery battery = service.getOne(id);
        service.delete(battery);
        return new ResponseEntity<>("Delete ok", HttpStatus.OK);
    }

    @PutMapping("return/{id}")
    public ResponseEntity<String> returnDelete(@PathVariable("id") Integer id) {
        Battery battery = service.getOne(id);
        service.returnDelete(battery);
        return new ResponseEntity<>("Return ok", HttpStatus.OK);
    }

    @PostMapping("import")
    public ResponseEntity<String> importBattery(@RequestParam("file") MultipartFile file) {
        try {
            service.importDataFromExcel(file);
            return ResponseEntity.ok("Import Thành Công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("Import Thất bại");
        }
    }

    @GetMapping(value = "getCode")
    public List<String> getCode(){
        return service.getCode();
    }

}