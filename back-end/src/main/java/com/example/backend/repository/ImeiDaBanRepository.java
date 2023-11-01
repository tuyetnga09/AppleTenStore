package com.example.backend.repository;

import com.example.backend.controller.order_management.model.billOffLine.ion.CheckImeiDaBanIonSellOffLine;
import com.example.backend.controller.order_management.model.billOffLine.ion.ImeiDaBanOffLineIonRespon;
import com.example.backend.entity.ImeiDaBan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ImeiDaBanRepository extends JpaRepository<ImeiDaBan, Long> {

    @Query(value = "select i.id as 'idImeiDaBan', i.code_imei as 'codeImeiDaBan'" +
            "  from imei_da_ban i join bill_detail b on i.id_bill_detail = b.id join sku s on b.id_sku = s.id\n" +
            " where b.id = ?1 and s.id =?2 and i.status = 2 ORDER BY  i.id DESC", nativeQuery = true)
    List<ImeiDaBanOffLineIonRespon> imeisDaBanSellOffLine(Integer idBillDetail, Long idSku);

    ImeiDaBan findByCodeImei(String codeImei);

    //imei thất lạc
    @Query(value = "select b.code as 'codeBill' , p.name as 'nameProduct', s.capacity as 'capacitySKU',\n" +
            "    s.color as 'colorSKU', s.price as 'priceSKU', b.status_bill as 'statusBill'\n" +
            "    from bill b join bill_detail bd on b.id = bd.id_bill join sku s on bd.id_sku = s.id\n" +
            "    join imei_da_ban idb on bd.id = idb.id_bill_detail join product p on s.product_id = p.id\n" +
            "    where idb.code_imei = ?1", nativeQuery = true)
    List<CheckImeiDaBanIonSellOffLine> checkImeiDaBan(String codeImei);

    List<ImeiDaBan> findImeiDaBanByBillDetail_Id(Integer id);
    @Query(value = " select i.id as 'idImeiDaBan', i.code_imei as 'codeImeiDaBan'\n" +
            "             from imei_da_ban i join bill_detail b on i.id_bill_detail = b.id join sku s on b.id_sku = s.id\n" +
            "             where b.id = ?1 and s.id =?2 and i.code_imei =?3 and i.status = 2", nativeQuery = true)
    List<ImeiDaBanOffLineIonRespon> seachImeiDaBanFindByCodeImei(Integer idBillDetail, Long idSku, String codeImei);

    //xoá all imei trong bảng imei_da_ban where thieo idBillDetail
    //lấy ra danh sách và xoá all
    @Query(value = "select i.id as 'idImeiDaBan', i.code_imei as 'codeImeiDaBan' " +
            " from imei_da_ban i join bill_detail b on i.id_bill_detail = b.id where b.id =?1", nativeQuery = true)
    List<ImeiDaBanOffLineIonRespon> listAllImeiDaBanWhereIdBillDetail(Integer idBillDetail);
}
