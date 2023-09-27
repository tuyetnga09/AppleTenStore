package com.example.backend.repository;

import com.example.backend.entity.Battery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BatteryRepository extends JpaRepository<Battery, Integer> {

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM Battery WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Battery> findAll(Pageable pageable);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM Battery WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update like %?1% or person_create like %?1% or person_update like %?1%) and Status = 1", nativeQuery = true)
    Page<Battery> deleteBattery(Pageable pageable, String key);

    Battery findByCode(String code);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM Battery WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update like %?1% or person_create like %?1% or person_update like %?1%) and Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Battery> search(Pageable pageable, String key);

    Battery findByName(String name);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  " +
            " FROM Battery WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Battery> getAll();
}
