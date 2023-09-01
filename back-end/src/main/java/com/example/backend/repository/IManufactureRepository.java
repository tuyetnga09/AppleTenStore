package com.example.backend.repository;

import com.example.backend.entity.Manufacture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IManufactureRepository extends JpaRepository<Manufacture, Integer> {
}
