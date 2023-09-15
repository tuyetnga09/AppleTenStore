package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.ImeiServiceImpl;
import com.example.backend.entity.Imei;
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

@RestController
@RequestMapping("/imei/")
@CrossOrigin("*")
public class ImeiController {

    @Autowired
    private ImeiServiceImpl service;

    @GetMapping("{id}")
    public ResponseEntity<Imei> detail(@PathVariable("id") Integer id){
        return new ResponseEntity<>(service.getOne(id), HttpStatus.OK);
    }

    @GetMapping("getAll")
    public ResponseEntity<Page<Imei>> paging(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key){
        Pageable pageable = PageRequest.of(page, 5);
        Page<Imei> imeiPage = service.search(pageable, key);
        return new ResponseEntity<>(imeiPage, HttpStatus.OK);
    }

    @GetMapping("displayDelete")
    public ResponseEntity<Page<Imei>> viewAllDelete(@RequestParam(value = "page",defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Imei> imeiPage = service.getDelete(pageable, key);
        return new ResponseEntity<>(imeiPage, HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<String> add(@RequestBody Imei imei){
        service.insert(imei);
        return new ResponseEntity<>("Add ok", HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> update(@RequestBody Imei imei, @PathVariable("id") Integer id){
        service.update(imei, id);
        return new ResponseEntity<>("Update ok", HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Integer id){
        Imei imei = service.getOne(id);
        service.delete(imei);
        return new ResponseEntity<>("Delete ok", HttpStatus.OK);
    }

    @PutMapping("return/{id}")
    public ResponseEntity<String> returnDelete(@PathVariable("id")  Integer id) {
        Imei imei = service.getOne(id);
        service.returnDelete(imei);
        return new ResponseEntity<>("Return ok", HttpStatus.OK);
    }

    @PostMapping("import")
    public ResponseEntity<String>  importSize(@RequestParam("file") MultipartFile file){
        try {
            service.importDataFromExcel(file);
            return ResponseEntity.ok("Import Thành Công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("Import Thất bại");
        }
    }
}
