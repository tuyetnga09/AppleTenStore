package com.example.backend.controller.product_controller.service;

import com.example.backend.entity.Category;
import com.example.backend.entity.Screen;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public interface Iservice<T> {
    Page<T> getAll(Pageable pageable);

    void insert(T t);

    void update(T t, Integer id);

    void delete(Integer id);
    void delete(T t);

    void returnDelete(T t);
}
