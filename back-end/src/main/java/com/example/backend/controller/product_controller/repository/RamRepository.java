package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Ram;
import com.example.backend.repository.IRamRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface RamRepository extends IRamRepository {
    Page<Ram> findAll(Pageable pageable);
}
