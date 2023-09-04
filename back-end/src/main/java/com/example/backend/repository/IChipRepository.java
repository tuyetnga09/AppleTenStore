package com.example.backend.repository;

import com.example.backend.entity.Chip;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IChipRepository extends JpaRepository<Chip, Integer> {
}
