package com.example.backend.repository;

import com.example.backend.entity.Screen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IScreenRepository extends JpaRepository<Screen, Integer> {
}
