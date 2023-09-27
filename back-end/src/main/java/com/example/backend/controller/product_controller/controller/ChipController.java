package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.ChipServiceIpml;
import com.example.backend.entity.Chip;
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
@CrossOrigin("*")
@RequestMapping("/chip/")
public class ChipController {
    @Autowired
    private ChipServiceIpml chipServiceIpml;


    @GetMapping("{id}")
    public ResponseEntity<Chip> detail(@PathVariable("id") Integer id){
        return new ResponseEntity<>(chipServiceIpml.getOne(id), HttpStatus.OK);
    }
    @GetMapping("get-all-chip")
    public ResponseEntity<List<Chip>> getAllChip(){
        return new ResponseEntity<>(chipServiceIpml.getAll(), HttpStatus.OK);
    }

    @GetMapping("getAll")
    public ResponseEntity<Page<Chip>> paging(@RequestParam(value = "page", defaultValue = "0", required = false) Integer page,
                                             @RequestParam(value = "key", required = false) String key){
        Pageable pageable = PageRequest.of(page, 5);
        Page<Chip> chipPage = chipServiceIpml.search(pageable, key);
        return new ResponseEntity<>(chipPage, HttpStatus.OK);
    }

    @GetMapping("displayDelete")
    public ResponseEntity<Page<Chip>> viewAllDelete(@RequestParam(value = "page",defaultValue = "0", required = false) Integer page,
                                                    @RequestParam(value = "key", required = false) String key) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Chip> chipPage = chipServiceIpml.getDelete(pageable, key);
        return new ResponseEntity<>(chipPage, HttpStatus.OK);
    }

    @PostMapping("add")
    public ResponseEntity<String> add(@RequestBody Chip chip){
        chipServiceIpml.insert(chip);
        return new ResponseEntity<>("Add ok", HttpStatus.CREATED);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<String> update(@RequestBody Chip chip, @PathVariable("id") Integer id){
        chipServiceIpml.update(chip, id);
        return new ResponseEntity<>("Update ok", HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<String> delete(@PathVariable("id") Integer id){
        Chip chip = chipServiceIpml.getOne(id);
        chipServiceIpml.delete(chip);
        return new ResponseEntity<>("Delete ok", HttpStatus.OK);
    }

    @PutMapping("return/{id}")
    public ResponseEntity<String> returnDelete(@PathVariable("id")  Integer id) {
        Chip chip = chipServiceIpml.getOne(id);
        chipServiceIpml.returnDelete(chip);
        return new ResponseEntity<>("Return ok", HttpStatus.OK);
    }

    @PostMapping("import")
    public ResponseEntity<String>  importSize(@RequestParam("file") MultipartFile file){
        try {
            chipServiceIpml.importDataFromExcel(file);
            return ResponseEntity.ok("Import Thành Công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("Import Thất bại");
        }
    }
}
