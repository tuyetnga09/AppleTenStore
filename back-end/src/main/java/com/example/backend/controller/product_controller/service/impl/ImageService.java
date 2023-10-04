package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.repository.ImageRepository;
import com.example.backend.repository.ProductRepository;
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

    private static final String UPLOAD_DIRECTORY = System.getProperty("user.dir") + "/font-end/public/imageUpload";

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Page<Image> getAll(Pageable pageable) {
        return this.imageRepository.findAll(pageable);
    }

    @Override
    public void insert(Image image) {
        // null
    }


    public void insert(MultipartFile[] imageFile, String nameProduct) throws IOException {
        for (MultipartFile file : imageFile) {
            Path path = Paths.get(UPLOAD_DIRECTORY, file.getOriginalFilename());
            File fileImage = new File(path.toString());
            Files.write(path, file.getBytes());
            Image image = new Image(file.getOriginalFilename(), productRepository.findByName(nameProduct));
            this.imageRepository.save(image);
        }
    }

    @Override
    public void update(Image image, Integer id) {
        this.imageRepository.save(image);
    }

    @Override
    public void delete(Integer id) {
        this.imageRepository.deleteById(id);
    }

    @Override
    public void delete(Image image) {
        image.setStatus(1);
        this.imageRepository.delete(image);
    }

    @Override
    public void returnDelete(Image image) {
        image.setStatus(0);
        this.imageRepository.save(image);
    }

    public Image searchImageByIdProduct(int id){
        return this.imageRepository.searchImageByIdProduct(id);
    }

}
