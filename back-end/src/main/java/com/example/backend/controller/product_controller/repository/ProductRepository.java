package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Product;
import com.example.backend.repository.IProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends IProductRepository {

    @Query(value = "select * from product where status = 0 ", nativeQuery = true)
    Page<Product> getAllPage(Pageable pageable);


    @Query(value = "select * from product where status = 1", nativeQuery = true)
    Page<Product> getAllPageDelete(Pageable pageable);

    // con serch and update

}
