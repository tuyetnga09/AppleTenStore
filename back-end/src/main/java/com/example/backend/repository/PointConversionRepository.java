package com.example.backend.repository;

import com.example.backend.entity.PointConversion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PointConversionRepository extends JpaRepository<PointConversion, Integer> {

    @Query(value = "select * from point_conversion order by id desc limit 1", nativeQuery = true)
    PointConversion getOneLatest();

    PointConversion findByStatus(Integer status);
}
