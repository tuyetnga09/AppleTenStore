package com.example.backend.repository;

import com.example.backend.controller.order_management.model.billOffLine.ion.ImeiBillOffLineIonRespon;
import com.example.backend.entity.Imei;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

    //danh sách imei theo idSKU
    @Query(value = "select i.id as 'idImei', i.code_imei as 'codeImei', s.id as 'idSKU'," +
            " s.quantity as 'quantityImei', s.capacity as 'capacitySKU', \n" +
            " s.color as 'colorSKU', p.name as 'nameProduct'\n" +
            " from imei i join sku s on i.sku_id = s.id join product p on s.product_id = p.id  " +
            " where i.status = 0 and s.id=?1", nativeQuery = true)
    List<ImeiBillOffLineIonRespon> imeisSellOffLine(Long idSku);


    //seach imei theo codeImei
    @Query(value = "select i.id as 'idImei', i.code_imei as 'codeImei', s.id as 'idSKU',\n" +
            "             s.quantity as 'quantityImei', s.capacity as 'capacitySKU', \n" +
            "             s.color as 'colorSKU', p.name as 'nameProduct'\n" +
            "             from imei i join sku s on i.sku_id = s.id join product p on s.product_id = p.id  \n" +
            "             where i.status = 0 and s.id=?1 and i.code_imei =?2", nativeQuery = true)
    List<ImeiBillOffLineIonRespon> seachImeiFindByCodeImei(Long idSku, String codeImei);


    //laays ra lisst imei theo idsku
    @Query(value = "select * from imei i where i.sku_id=?1 ORDER BY Id DESC ", nativeQuery = true)
    List<Imei> getAllImeiWherIdSku(Long idSku);

    //laays ra lisst imei theo idsku and status
    @Query(value = "select * from imei i where i.sku_id=?1 and i.status =?2 ORDER BY Id DESC", nativeQuery = true)
    List<Imei> getAllImeiWherIdSkuAndStatus(Long idSku, Integer status);

    //update status imei where id_product
    @Modifying
    @Transactional
    @Query(value = "update imei set status =?1 where id_product =?2 and status =?3", nativeQuery = true)
    void updateStatusImeiWhereIdProduct(Integer status, Integer idProduct, Integer statusWhere);

    //update status imei where sku_id
    @Modifying
    @Transactional
    @Query(value = "update imei set status =?1 where sku_id =?2 and status =?3", nativeQuery = true)
    void updateStatusImeiWhereIdSku(Integer status, Long idSku, Integer statusWhere);

    //update status imei where sku_id
    @Modifying
    @Transactional
    @Query(value = "update imei set status =?1 where id=?2", nativeQuery = true)
    void updateStatusImei(Integer status, Integer idImei);

    //laays ra update imei có status  theo idsku
    @Modifying
    @Transactional
    @Query(value = "update imei set status =?1 where sku_id=?2 and status =?3", nativeQuery = true)
    void updateImeiStatusWherIdSku(Integer statusUpdate, Long idSku, Integer status);

    @Modifying
    @Transactional
    @Query(value = "update imei set status = 3 where code_imei in \n" +
            "                                 (select code_imei from imei_da_ban where id_bill_detail in \n" +
            "                                 (select id from bill_detail where id_bill = ?1))", nativeQuery = true)
    void updateStatusImeiWhereIdBill(Integer idBill);

    //seach imei -> list imei (co where status)
    @Query(value = "select * from imei where code_imei  like %?1% and status =?2 and sku_id=?3 ORDER BY Id DESC", nativeQuery = true)
    List<Imei> seachImeisWhereStatus(String codeImei, Integer status, Long idSku);

    //seach all imei
    @Query(value = "select * from imei where code_imei  like %?1% and sku_id=?2  ORDER BY Id DESC", nativeQuery = true)
    List<Imei> seachAllImeis(String codeImei,  Long idSku);

    @Modifying
    @Transactional
    @Query(value = "update imei set status = ?1 where code_imei = ?2", nativeQuery = true)
    void updateStatusImeiByCodeImei(Integer status, String codeImei);
}
