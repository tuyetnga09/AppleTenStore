package com.example.backend.repository;

import com.example.backend.entity.Payments;
import com.example.backend.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentsRepository extends JpaRepository<Payments, Integer> {
    Payments findByCode(String code);
}
