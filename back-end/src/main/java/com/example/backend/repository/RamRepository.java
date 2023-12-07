package com.example.backend.repository;

import com.example.backend.entity.Ram;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RamRepository extends JpaRepository<Ram, Integer> {

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  " +
            " FROM RAM WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Ram> findAll(Pageable pageable);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM RAM WHERE Status = 1", nativeQuery = true)
    Page<Ram> deleteRam(Pageable pageable);

    Ram findByCode(String code);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM ram WHERE Code LIKE %?1% OR Name LIKE %?1% OR DateCreate LIKE %?1% OR DateUpdate LIKE %?1% OR PersonCreate LIKE %?1% OR PersonUpdate LIKE %?1% AND Status = 0", nativeQuery = true)
    Page<Ram> search(String search ,Pageable pageable);

    Ram findByName(String name);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  " +
            " FROM RAM WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Ram> getAll();

    @Query(value = "select code from ram", nativeQuery = true)
    List<String> getCode();

}
