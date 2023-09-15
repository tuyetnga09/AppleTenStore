package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Battery;
import com.example.backend.entity.Capacity;
import com.example.backend.entity.Category;
import com.example.backend.repository.ICategoeyRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends ICategoeyRepository {
    Page<Category> findAll(Pageable  pageable);
    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status  FROM Category WHERE Status = 1", nativeQuery = true)
    Page<Category> deleteCategory(Pageable pageable);
    Category findByCode(String code);
    @Query(value = "SELECT Id, Code, Name, date_create, date_update, person_create, person_update, Status FROM Category WHERE Code LIKE %?1% OR Name LIKE %?1% OR DateCreate LIKE %?1% OR DateUpdate LIKE %?1% OR PersonCreate LIKE %?1% OR PersonUpdate LIKE %?1% AND Status = 0", nativeQuery = true)
    Page<Category> search(String search ,Pageable pageable);
    Category findByName(String name);

}
