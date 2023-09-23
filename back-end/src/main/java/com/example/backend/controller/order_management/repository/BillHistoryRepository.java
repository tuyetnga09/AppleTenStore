package com.example.backend.controller.order_management.repository;

import com.example.backend.entity.BillHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BillHistoryRepository extends JpaRepository<BillHistory, Integer> {
}
