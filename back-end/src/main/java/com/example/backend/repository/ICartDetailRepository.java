package com.example.backend.repository;

import com.example.backend.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ICartDetailRepository  extends JpaRepository<CartDetail, Integer> {
}
