package com.example.backend.repository;

import com.example.backend.entity.Battery;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBatteryRepository extends JpaRepository<Battery, Integer> {
}
