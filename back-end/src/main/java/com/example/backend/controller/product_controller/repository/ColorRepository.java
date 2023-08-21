package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Category;
import com.example.backend.entity.Color;
import com.example.backend.repository.IColorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRepository extends IColorRepository {
    Page<Color> findAll(Pageable  pageable);
}
