package com.example.backend.repository;

import com.example.backend.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail,Integer> {
    List<CartDetail> getCartDetailByCart_Id(Integer idCart);
}

