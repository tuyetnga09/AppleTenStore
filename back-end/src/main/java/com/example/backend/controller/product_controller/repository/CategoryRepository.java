package com.example.backend.controller.product_controller.repository;

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
}
