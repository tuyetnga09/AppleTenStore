package com.example.backend.repository;

import com.example.backend.entity.Battery;
import com.example.backend.entity.Capacity;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CapacityRepository extends JpaRepository<Capacity, Integer> {
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

    @Modifying
    @Transactional
    @Query(value = "select capacity.id, capacity.status, capacity.date_create, capacity.date_update, capacity.code, capacity.name, capacity.person_create, capacity.person_update from capacity inner join product p on capacity.id = p.id_capacity where id_capacity = ?1", nativeQuery = true)
    List<Capacity> findCapacitiesByIdProduct(int id);

    @Query(value = "select code from capacity",  nativeQuery = true)
    List<String> getCode();

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM Capacity WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update like %?1% or person_create like %?1% or person_update like %?1%) and Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Capacity> search(Pageable pageable, String key);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM Capacity WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update like %?1% or person_create like %?1% or person_update like %?1%) and Status = 1", nativeQuery = true)
    Page<Capacity> deleteCapacityDisplay(Pageable pageable, String key);

}
