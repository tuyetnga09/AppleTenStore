package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Capacity;
import com.example.backend.entity.Color;
import com.example.backend.repository.ICapacityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface CapacityRepository extends ICapacityRepository {
    Page<Capacity> findAll(Pageable pageable);
}
