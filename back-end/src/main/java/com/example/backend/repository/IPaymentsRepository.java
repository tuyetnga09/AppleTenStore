package com.example.backend.repository;

import com.example.backend.entity.Payments;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IPaymentsRepository extends JpaRepository<Payments, Integer> {
}
