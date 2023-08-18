package com.example.backend.controller.product_controller.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface Iservice<T> {
    Page<T> getAll(Pageable pageable);

    void insert(T t);

    void update(T t,String id);

    void delete(String id);
}
