package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.SizeServiceImpl;
import com.example.backend.entity.Size;
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

@RestController
@RequestMapping("/size/")
@CrossOrigin(origins = "http://localhost:3000")
public class SizeController {

    @Autowired
    private SizeServiceImpl service;

    @GetMapping("{id}")
    public ResponseEntity<Size> detail(@PathVariable("id") Integer id){
        return new ResponseEntity<>(service.getOne(id), HttpStatus.OK);
    }

    @GetMapping("getAll")
    public ResponseEntity<Page<Size>> paging(@RequestParam(value = "page", defaultValue = "0") Integer page){
        Pageable pageable = PageRequest.of(page, 5);
        Page<Size> sizePage = service.getAll(pageable);
        return new ResponseEntity<>(sizePage, HttpStatus.OK);
    }

    @GetMapping("displayDelete")
    public ResponseEntity<Page<Size>> viewAllDelete(@RequestParam(value = "page",defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Size> sizePage = service.getDelete(pageable);
        return new ResponseEntity<>(sizePage, HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<String> add(@RequestBody Size size){
        service.insert(size);
        return new ResponseEntity<>("Add ok", HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> update(@RequestBody Size size, @PathVariable("id") Integer id){
        service.update(size, id);
        return new ResponseEntity<>("Update ok", HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Integer id){
        Size size = service.getOne(id);
        service.delete(size);
        return new ResponseEntity<>("Delete ok", HttpStatus.OK);
    }

    @PutMapping("return/{id}")
    public ResponseEntity<String> returnDelete(@PathVariable("id")  Integer id) {
        Size size = service.getOne(id);
        service.returnDelete(size);
        return new ResponseEntity<>("Return ok", HttpStatus.OK);
    }
}