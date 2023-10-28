package com.example.backend.repository;

import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerResponse;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.entity.BillDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillDetailRepository extends JpaRepository<BillDetails, Integer> {

    @Query(value = "select b.id AS 'IDBill', s.id AS 'IDSKU', p.name AS 'NameProduct', s.capacity AS 'Capacity', s.color AS 'Color', c.name AS 'Category', bd.quantity AS 'Quantity', bd.price AS 'Price', bd.quantity * bd.price AS 'TotalMoney' from bill b join account a on b.id_account = a.id join bill_detail bd on b.id = bd.id_bill join sku s on bd.id_sku = s.id join product p on s.product_id = p.id join category c on p.id_category = c.id where b.id = ?1", nativeQuery = true)
    List<BillDetailCustomerResponse> getAll(Integer id);


    @Query(value = "select * from bill_detail where id_bill =?1", nativeQuery = true)
    List<BillDetails> findByBillDetailOfIdBill(Integer idBill);

//    @Modifying
//    @Transactional
    @Query(value = "select b.id as 'id', b.quantity as 'quantity', b.price as 'price', b.status_bill as 'statusBillDetail', b.id_product as 'product', b.id_bill as 'bill', \n" +
            "             b.person_create as  'personCreate', b.person_update as 'personUpdate', b.date_create as 'dateCreate', b.date_update as 'dateUpdate',\n" +
            "            s.id as 'idSKU', s.capacity as 'skuCapacity', s.color as 'skuColor' , s.price as 'skuPrice' , " +
            "           p.id as 'idProduct', p.name as 'nameProduct', b.price * b.quantity  as 'totalManyOneBillDetail'   \n" +
            "            from bill_detail b join sku s on b.id_sku = s.id join product p on s.product_id = p.id where b.id_bill =?1", nativeQuery = true)
    List<BillDetailOffLineIon> findByBillDetailOffLineIdBill(Integer idBill);


}
