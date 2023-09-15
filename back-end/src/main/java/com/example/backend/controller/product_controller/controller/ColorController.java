package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.ColorServiceImpl;
import com.example.backend.entity.Color;
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

@CrossOrigin("*")
@RestController
@RequestMapping("/color/")
public class ColorController {
    @Autowired
    private ColorServiceImpl colorService;

    //1
    @GetMapping("{id}")
    public ResponseEntity<Color> detail(@PathVariable("id") Integer id){
        return new ResponseEntity<>(colorService.getOne(id), HttpStatus.OK);
    }

    @GetMapping("getAll")
    public ResponseEntity<Page<Color>> paging(@RequestParam(value = "page", defaultValue = "0", required = false) Integer page,
                                             @RequestParam(value = "key", required = false) String key){
        Pageable pageable = PageRequest.of(page, 5);
        Page<Color> colorPage = colorService.search(pageable, key);
        return new ResponseEntity<>(colorPage, HttpStatus.OK);
    }

    @GetMapping("displayDelete")
    public ResponseEntity<Page<Color>> viewAllDelete(@RequestParam(value = "page",defaultValue = "0", required = false) Integer page,
                                                    @RequestParam(value = "key", required = false) String key) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Color> colorPage = colorService.getDelete(pageable, key);
        return new ResponseEntity<>(colorPage, HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<String> add(@RequestBody Color color){
        colorService.insert(color);
        return new ResponseEntity<>("Add ok", HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> update(@RequestBody Color color, @PathVariable("id") Integer id){
        colorService.update(color, id);
        return new ResponseEntity<>("Update ok", HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Integer id){
        Color color = colorService.getOne(id);
        colorService.delete(color);
        return new ResponseEntity<>("Delete ok", HttpStatus.OK);
    }

    @PutMapping("return/{id}")
    public ResponseEntity<String> returnDelete(@PathVariable("id")  Integer id) {
        Color color = colorService.getOne(id);
        colorService.returnDelete(color);
        return new ResponseEntity<>("Return ok", HttpStatus.OK);
    }

    @PostMapping("import")
    public ResponseEntity<String>  importSize(@RequestParam("file") MultipartFile file){
        try {
            colorService.importDataFromExcel(file);
            return ResponseEntity.ok("Import Thành Công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("Import Thất bại");
        }
    }

}
