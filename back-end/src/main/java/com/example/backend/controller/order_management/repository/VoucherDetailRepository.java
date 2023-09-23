package com.example.backend.controller.order_management.repository;

import com.example.backend.entity.VoucherDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherDetailRepository extends JpaRepository<VoucherDetail, Integer> {
}
