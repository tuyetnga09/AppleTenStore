package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Battery;
import com.example.backend.entity.Screen;
import com.example.backend.repository.IScreenRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ScreenRepository extends IScreenRepository {

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM screen WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Screen> findAll(Pageable pageable);

    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM screen WHERE Status = 1", nativeQuery = true)
    Page<Screen> deleteScreen(Pageable pageable);

    Screen findByCode(String code);
    Screen findByName(String name);

}
