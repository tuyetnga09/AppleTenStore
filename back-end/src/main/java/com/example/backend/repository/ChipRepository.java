package com.example.backend.repository;

import com.example.backend.entity.Chip;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChipRepository extends JpaRepository<Chip, Integer> {
    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  " +
            " FROM Chip WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Chip> findAll(Pageable pageable);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  " +
            " FROM Chip WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Chip> getAll();

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status " +
            " FROM Chip WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update " +
            " like %?1% or person_create like %?1% or person_update like %?1%) and Status = 1", nativeQuery = true)
    Page<Chip> deleteChip(Pageable pageable, String key);

    Chip findByCode(String code);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status " +
            " FROM Chip WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update " +
            " like %?1% or person_create like %?1% or person_update like %?1%) and Status = 0 " +
            " ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Chip> search(Pageable pageable, String key);

    Chip findByName(String name);

    @Query(value = "select code from chip", nativeQuery = true)
    List<String> getCode();

}