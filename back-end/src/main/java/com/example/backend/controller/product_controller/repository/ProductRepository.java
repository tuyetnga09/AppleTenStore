package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Product;
import com.example.backend.repository.IProductRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends IProductRepository {

    @Query(value = "select a.code, a.name, b.name, c.name, c2.name, c3.name, c4.name, i.name, m.name, r.name, s.name, s2.name from Product a join battery b on a.id_battery = b.id join capacity c on a.id_capacity = c.id\n" +
            "join category c2 on a.id_category = c2.id join chip c3 on a.id_chip = c3.id join color c4 on a.id_color = c4.id\n" +
            "join image i on a.id_image = i.id join manufacture m on a.id_manufacture = m.id join ram r on a.id_ram = r.id\n" +
            "join screen s on a.id_screen = s.id join size s2 on a.id_size = s2.id where status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Product> getAllPage(Pageable pageable);


    @Query(value = "select * from product where status = 1", nativeQuery = true)
    Page<Product> getAllPageDelete(Pageable pageable);

    Product findProductById(Integer id);
}
