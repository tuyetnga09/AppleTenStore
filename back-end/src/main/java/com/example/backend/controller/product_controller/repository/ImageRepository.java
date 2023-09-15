package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Battery;
import com.example.backend.entity.Image;
import com.example.backend.repository.IImageRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ImageRepository extends IImageRepository {

    Page<Image> findAll(Pageable pageable);
    Image findByLink(String link);

}
