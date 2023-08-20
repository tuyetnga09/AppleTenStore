package com.example.backend.repository;

import com.example.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICategoeyRepository extends JpaRepository<Category, Integer> {
}
