package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.service.impl.ImageService;
import com.example.backend.entity.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@CrossOrigin("*")
@RequestMapping(value = "/admin/image")
public class ImageController {

    @Autowired
    private ImageService service;

    @GetMapping(value = "/display")
    public Page<Image> viewAll(@RequestParam(value = "page", defaultValue = "0") Integer page){
        Pageable pageable = PageRequest.of(page, 5);
        return this.service.getAll(pageable);
    }

    @PostMapping(value = "/save")
    public @ResponseBody void save(@RequestParam("file") MultipartFile[] images, @RequestParam("name") String name) throws IOException {
        this.service.insert(images, name);
    }

    @PutMapping("/update/{id}")
    public void update(@RequestBody Image image, @PathVariable("id") Integer id) {
        image.setId(id);
        this.service.update(image, id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestParam("id") Integer id) {
        this.service.delete(id);
    }

    @GetMapping(value = "/search/{id}")
    public Image searchImage(@PathVariable int id){
        return this.service.searchImageByIdProduct(id);
    }

}
