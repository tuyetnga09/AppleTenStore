package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Image;
import com.example.backend.repository.IImageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

public interface ImageRepository extends IImageRepository {

    @Query(value = "select im.id, im.code, im.name, im.link, im.dateCreate from Image im where im.status = 0")
    Page<Image> findAll(Pageable pageable);



}
