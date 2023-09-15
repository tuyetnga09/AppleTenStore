package com.example.backend.controller.product_controller.repository;

import com.example.backend.entity.Imei;
import com.example.backend.repository.IImeiRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ImeiRepository extends IImeiRepository {

    @Query(value = "SELECT code_imei, id_product, Status FROM imei WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Imei> findAll(Pageable pageable);

    @Query(value = "SELECT * FROM Imei WHERE (Code_Imei like %?1% or id_product like %?1%) and Status = 1", nativeQuery = true)
    Page<Imei> deleteImei(Pageable pageable, String key);

    Imei findByCodeImei(String code);

    @Query(value = "SELECT * FROM imei WHERE (Code_Imei like %?1% or id_product like %?1%) and Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Imei> search(Pageable pageable, String key);

//    code_imei, id_product, Status
}
