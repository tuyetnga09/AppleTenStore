package com.example.backend.repository;

import com.example.backend.entity.Imei;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IImeiRepository extends JpaRepository<Imei, Integer> {
}
