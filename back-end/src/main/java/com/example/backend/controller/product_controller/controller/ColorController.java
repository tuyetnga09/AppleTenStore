package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.repository.ColorRepository;
import com.example.backend.controller.product_controller.service.impl.ColorServiceImpl;
import com.example.backend.entity.Color;
import com.example.backend.entity.Ram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
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

    @Autowired
    private ColorRepository colorRepository;

    @GetMapping("{id}")
    public ResponseEntity<Color> detail(@PathVariable("id") Integer id){
        return new ResponseEntity<>(colorRepository.findById(id).orElse(null), HttpStatus.OK);
    }

    @GetMapping("display")
    public Page<Color> viewAll(@RequestParam(value = "page",defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Color> listColor = colorService.getAll(pageable);
        return listColor;
    }

    @GetMapping("displayDelete")
    public Page<Color> viewAllDelete(@RequestParam(value = "page",defaultValue = "0") Integer page) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Color> listColor = colorService.getAll(pageable);
        return listColor;
    }

    @PostMapping("save")
    public void save(@RequestBody Color color) {
        colorService.insert(color);
    }

    @PutMapping("update/{id}")
    public void update(@RequestBody  Color color ,@PathVariable("id") Integer id) {
        color.setId(id);
        colorService.insert(color);
    }

    @PutMapping("delete/{id}")
    public void delete(@PathVariable("id")  Integer id) {
        Color color = colorRepository.findById(id).orElse(null);
        colorService.delete(color);
    }

    @PutMapping("return/{id}")
    public void returnDelete(@PathVariable("id")  Integer id) {
        Color color = colorRepository.findById(id).orElse(null);
        colorService.returnDelete(color);
    }

    @PostMapping("import")
    public ResponseEntity<String>  importRam(@RequestParam("file") MultipartFile file){
        try {
            colorService.importDataFromExcel(file);
            return ResponseEntity.ok("Import Thành Công");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("Import Thất bại");
        }
    }

    @GetMapping("search")
    public Page<Color> search(@RequestParam(value = "page",defaultValue = "0") Integer page,
                            @RequestParam(value = "search",required = false) String search) {
        Pageable pageable = PageRequest.of(page, 5);
        Page<Color> listColor = colorService.getAll(pageable);
        return listColor;
    }



}
