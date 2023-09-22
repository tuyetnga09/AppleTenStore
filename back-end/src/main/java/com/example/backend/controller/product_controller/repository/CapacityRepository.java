package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Capacity;
import com.example.backend.repository.ICapacityRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CapacityRepository extends ICapacityRepository {
    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM Capacity WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Capacity> findAll(Pageable  pageable);
    Capacity findByCode(String code);
    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM Capacity WHERE Code LIKE %?1% OR Name LIKE %?1% OR DateCreate LIKE %?1% OR DateUpdate LIKE %?1% OR PersonCreate LIKE %?1% OR PersonUpdate LIKE %?1% AND Status = 0", nativeQuery = true)
    Page<Capacity> search(String search ,Pageable pageable);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM Capacity WHERE Status = 1", nativeQuery = true)
    Page<Capacity> deleteCapacity(Pageable pageable);

    Capacity findByName(String name);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  " +
            " FROM Capacity WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Capacity> getAll();
}
