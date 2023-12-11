package com.example.backend.repository;

import com.example.backend.entity.Battery;
import com.example.backend.entity.Screen;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScreenRepository extends JpaRepository<Screen, Integer> {

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM screen WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Screen> findAll(Pageable pageable);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM screen WHERE Status = 1", nativeQuery = true)
    Page<Screen> deleteScreen(Pageable pageable);

    Screen findByCode(String code);
    Screen findByName(String name);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  " +
            " FROM screen WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Screen> getAll();

    @Query(value = "select code from screen", nativeQuery = true)
    List<String> getCode();

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM screen WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update like %?1% or person_create like %?1% or person_update like %?1%) and Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Screen> searchGetAll(Pageable pageable, String key);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM screen WHERE (code like %?1% or name like %?1% or date_create like %?1% or date_update like %?1% or person_create like %?1% or person_update like %?1%) and Status = 1", nativeQuery = true)
    Page<Screen> deleteDisplayScreen(Pageable pageable, String key);

}
