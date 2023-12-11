package com.example.backend.repository;

import com.example.backend.entity.Battery;
import com.example.backend.entity.Manufacture;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ManufactureRepository extends JpaRepository<Manufacture, Integer> {
    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM Manufacture WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Manufacture> findAll(Pageable pageable);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM Manufacture WHERE Status = 1", nativeQuery = true)
    Page<Manufacture> deleteManufacture(Pageable pageable);

    Manufacture findByCode(String code);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM Manufacture WHERE Code LIKE %?1% OR Name LIKE %?1% OR DateCreate LIKE %?1% OR DateUpdate LIKE %?1% OR PersonCreate LIKE %?1% OR PersonUpdate LIKE %?1% AND Status = 0", nativeQuery = true)
    Page<Manufacture> search(String search ,Pageable pageable);
    Manufacture findByName(String name);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  " +
            " FROM Manufacture WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Manufacture> getAll();

    @Query(value = "select code from manufacture", nativeQuery = true)
    List<String> getCode();

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM Manufacture WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update like %?1% or person_create like %?1% or person_update like %?1%) and Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Manufacture> searchAll(Pageable pageable, String key);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM Manufacture WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update like %?1% or person_create like %?1% or person_update like %?1%) and Status = 1", nativeQuery = true)
    Page<Manufacture> deleteManufactureDisplay(Pageable pageable, String key);

}
