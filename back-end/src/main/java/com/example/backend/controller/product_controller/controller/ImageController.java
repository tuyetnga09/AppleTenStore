package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.ImageService;
import com.example.backend.entity.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/image")
public class ImageController {

    @Autowired
    private ImageService service;

    @GetMapping(value = "/display")
    public Page<Image> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page){
        Pageable pageable = PageRequest.of(page, 5);
        return this.service.getAll(pageable);
    }

    @PostMapping(value = "/save", produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody void save(@RequestParam("file") MultipartFile images) throws IOException {
        this.service.insert(images);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody MultipartFile image, @PathVariable("id") Integer id) throws IOException {
        this.service.update(image, id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id") Integer id) {
        this.service.delete(id);
    }

}
