package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.ImageRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class ImageService implements Iservice<Image> {

    private static final String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/font-end/src/imageUpload";

    @Autowired
    private ImageRepository repository;

    @Override
    public Page<Image> getAll(Pageable pageable) {
        return this.repository.findAll(pageable);
    }

    @Override
    public void insert(Image image) {
        // null
    }


    public void insert(MultipartFile imageFile) throws IOException {
        Path path = Paths.get(UPLOAD_DIRECTORY, imageFile.getOriginalFilename());
        File fileImage = new File(path.toString());
        Files.write(path, imageFile.getBytes());
        Image image = new Image(imageFile.getOriginalFilename(), fileImage.getAbsolutePath());
        this.repository.save(image);
    }

    @Override
    public void update(Image image, Integer id) {
        this.repository.save(image);
    }

    @Override
    public void delete(Integer id) {
        this.repository.deleteById(id);
    }

    @Override
    public void delete(Image image) {
        image.setStatus(1);
        this.repository.delete(image);
    }

    @Override
    public void returnDelete(Image image) {
        image.setStatus(0);
        this.repository.save(image);
    }

}
