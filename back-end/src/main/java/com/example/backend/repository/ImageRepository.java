package com.example.backend.repository;

import com.example.backend.entity.Image;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImageRepository extends JpaRepository<Image, Integer> {

    Page<Image> findAll(Pageable pageable);

    @Transactional
    @Query(value = "select im.id, id_product, im.status, im.date_create, im.date_update, im.code, link, im.name, im.person_create, im.person_update from image im " +
            "inner join product p on im.id_product = p.id " +
            "where p.id = ?1 limit 1", nativeQuery = true)
    Image searchImageByIdProduct(int id);

    @Transactional
    @Query(value = "select * from image where id_product = 6",  nativeQuery = true)
    List<Image> getAllImagesByIdProduct(int id);

}
