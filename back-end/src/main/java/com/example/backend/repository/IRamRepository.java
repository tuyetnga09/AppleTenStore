package com.example.backend.repository;

import com.example.backend.entity.Ram;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IRamRepository extends JpaRepository<Ram, Integer> {
}
