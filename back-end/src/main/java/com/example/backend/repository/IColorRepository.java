package com.example.backend.repository;

import com.example.backend.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IColorRepository extends JpaRepository<Color, Integer> {
}
