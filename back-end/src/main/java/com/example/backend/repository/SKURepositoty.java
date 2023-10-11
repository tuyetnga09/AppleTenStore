package com.example.backend.repository;

import com.example.backend.entity.Capacity;
import com.example.backend.entity.Product;
import com.example.backend.entity.SKU;
import com.example.backend.entity.Size;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SKURepositoty extends JpaRepository<SKU, Long> {
    @Query(value = "SELECT sku.id, sku.price, product_Id, sku.quantity, sku.capacity, sku.color " +
            " FROM sku join product on sku.product_Id = product.id\n" +
            " where product.id = (select  id from product ORDER BY id DESC limit 1) ;", nativeQuery = true)
    List<SKU> skuFindByProduct();

    List<SKU> findByProduct(Product product);
    SKU findByProductAndCapacityAndColor(Product product, String capacity, String color);
    List<SKU> findByProductAndCapacity(Product product, String capacity);
    List<SKU> findByProductAndColor(Product product, String color);

    @Query(value = "select product_id, quantity, id, capacity, color, price from sku where capacity like %?1% and color like %?2% and product_id like %?3%", nativeQuery = true)
    SKU skuProduct(String capacity, String color, Integer idProduct);
}
