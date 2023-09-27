package com.example.backend.repository;

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
}
