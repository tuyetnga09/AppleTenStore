package com.example.backend.repository;

import com.example.backend.entity.Image;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Integer> {

    Page<Image> findAll(Pageable pageable);
    Image findByLink(String link);

}
