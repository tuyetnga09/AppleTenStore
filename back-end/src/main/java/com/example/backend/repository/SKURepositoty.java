package com.example.backend.repository;

import com.example.backend.entity.SKU;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SKURepositoty extends JpaRepository<SKU, Long> {

}
