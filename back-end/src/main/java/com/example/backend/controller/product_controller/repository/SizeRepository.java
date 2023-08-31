package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Size;
import com.example.backend.repository.ISizeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SizeRepository extends ISizeRepository {

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM size WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Size> findAll(Pageable pageable);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM size WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update like %?1% or person_create like %?1% or person_update like %?1%) and Status = 1", nativeQuery = true)
    Page<Size> deleteSize(Pageable pageable, String key);

    Size findByCode(String code);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM size WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update like %?1% or person_create like %?1% or person_update like %?1%) and Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Size> search(Pageable pageable, String key);
}