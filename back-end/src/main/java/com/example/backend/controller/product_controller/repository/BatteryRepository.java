package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Battery;
import com.example.backend.repository.IBatteryRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

public interface BatteryRepository extends IBatteryRepository {

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM Battery WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Battery> findAll(Pageable pageable);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM Battery WHERE Status = 1", nativeQuery = true)
    Page<Battery> deleteBattery(Pageable pageable);

    Battery findByCode(String code);
}
