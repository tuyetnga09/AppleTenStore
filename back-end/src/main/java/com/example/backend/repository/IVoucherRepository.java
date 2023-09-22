package com.example.backend.repository;

import com.example.backend.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IVoucherRepository extends JpaRepository<Voucher, Integer> {
}
