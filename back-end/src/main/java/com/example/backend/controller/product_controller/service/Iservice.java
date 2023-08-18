package com.example.backend.controller.product_controller.service;

import com.example.backend.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface Iservice<T> {
    Page<T> getAll(Pageable pageable);

    Category insert(T t);

    Category update(T t, Integer id);

    Category delete(String id);
}
