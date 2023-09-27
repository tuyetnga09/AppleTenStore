package com.example.backend.repository;

import com.example.backend.entity.Color;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorRepository extends JpaRepository<Color, Integer> {

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  " +
            " FROM Color WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Color> findAll(Pageable  pageable);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  " +
            " FROM Color WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Color> getAll();

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status " +
            " FROM Color WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update " +
            " like %?1% or person_create like %?1% or person_update like %?1%) and Status = 1", nativeQuery = true)
    Page<Color> deleteColor(Pageable pageable, String key);

    Color findByName(String name);
    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status " +
            " FROM Color WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update " +
            " like %?1% or person_create like %?1% or person_update like %?1%) and Status = 0 " +
            " ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Color> search(Pageable pageable, String key);

    Color findByCode(String code);

}