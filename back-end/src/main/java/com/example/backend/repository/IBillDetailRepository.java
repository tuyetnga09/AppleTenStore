package com.example.backend.repository;

import com.example.backend.entity.BillDetails;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IBillDetailRepository  extends JpaRepository<BillDetails, Integer> {
}
