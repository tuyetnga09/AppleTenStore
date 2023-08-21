package com.example.backend.repository;

import com.example.backend.entity.Capacity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICapacityRepository extends JpaRepository<Capacity, Integer> {
}
