package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Battery;
import com.example.backend.entity.Capacity;
import com.example.backend.entity.Color;
import com.example.backend.entity.Ram;
import com.example.backend.repository.IColorRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ColorRepository extends IColorRepository {

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  " +
            " FROM Color WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Color> findAll(Pageable  pageable);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status " +
            " FROM Color WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update " +
            " like %?1% or person_create like %?1% or person_update like %?1%) and Status = 1", nativeQuery = true)
    Page<Color> deleteColor(Pageable pageable, String key);



<<<<<<<<< Temporary merge branch 1
    Color findByName(String name);
=========
    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status " +
            " FROM Color WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update " +
            " like %?1% or person_create like %?1% or person_update like %?1%) and Status = 0 " +
            " ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Color> search(Pageable pageable, String key);

    Color findByCode(String code);
>>>>>>>>> Temporary merge branch 2
}
