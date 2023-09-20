package com.example.backend.controller.order_managent.repository;

import com.example.backend.entity.CartDetail;
import com.example.backend.repository.ICartDetailRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartDetailRepository  extends ICartDetailRepository {
    @Query("select g from CartDetail g where g.cart.id = ?1")
    List<CartDetail> getAllByIdCart(String id);

}
