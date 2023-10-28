package com.example.backend.repository;

import com.example.backend.controller.order_management.model.billOffLine.ion.ImeiBillOffLineIonRespon;
import com.example.backend.entity.Imei;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ImeiRepository extends JpaRepository<Imei, Integer> {

    @Query(value = "SELECT code_imei, id_product, Status FROM imei WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Imei> findAll(Pageable pageable);

    @Query(value = "SELECT * FROM Imei WHERE (Code_Imei like %?1% or id_product like %?1%) and Status = 1", nativeQuery = true)
    Page<Imei> deleteImei(Pageable pageable, String key);

    Imei findByCodeImei(String code);

    @Query(value = "SELECT * FROM imei WHERE (Code_Imei like %?1% or id_product like %?1%) and Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Imei> search(Pageable pageable, String key);



    @Query(value = "select i.id as 'idImei', i.code_imei as 'codeImei', s.id as 'idSKU'," +
            " s.quantity as 'quantityImei', s.capacity as 'capacitySKU', \n" +
            " s.color as 'colorSKU', p.name as 'nameProduct'\n" +
            " from imei i join sku s on i.sku_id = s.id join product p on s.product_id = p.id  " +
            " where i.status = 'DANG_SU_DUNG' and s.id=?1", nativeQuery = true)
    List<ImeiBillOffLineIonRespon> imeisSellOffLine(Long idSku);
}
