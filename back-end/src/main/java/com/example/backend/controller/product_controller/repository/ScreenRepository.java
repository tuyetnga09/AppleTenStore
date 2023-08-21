package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Screen;
import com.example.backend.repository.IScreenRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

@Repository
public interface ScreenRepository extends IScreenRepository {
    Page<Screen> findAll(Pageable pageable);

}
