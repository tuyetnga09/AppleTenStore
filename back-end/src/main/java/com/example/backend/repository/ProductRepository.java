package com.example.backend.repository;

import com.example.backend.entity.Product;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {

    @Query(value = "select * from product where status = 0 ", nativeQuery = true)
    Page<Product> getAllPage(Pageable pageable);


    @Query(value = "select * from product where status = 1", nativeQuery = true)
    Page<Product> getAllPageDelete(Pageable pageable);

    @Modifying
    @Transactional
    @Query(value = "select pr from Product pr where pr.status = 0")
    List<Product> selectAll();

    @Modifying
    @Transactional
    @Query(value = "select pr from Product pr where pr.name = ?1")
    Product search(String name);

    Product findByName(String nameProduct);

    // con serch and update

}
