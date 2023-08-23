package com.example.backend.repository;

import com.example.backend.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ISizeRepository extends JpaRepository<Size, Integer> {
}