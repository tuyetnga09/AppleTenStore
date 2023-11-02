package com.example.backend.repository;

import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerResponse;
import com.example.backend.entity.BillDetails;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillDetailRepository extends JpaRepository<BillDetails, Integer> {

    @Query(value = "select b.id AS 'IDBill', s.id AS 'IDSKU', p.name AS 'NameProduct', s.capacity AS 'Capacity', s.color AS 'Color', c.name AS 'Category', bd.quantity AS 'Quantity', bd.price AS 'Price', bd.quantity * bd.price AS 'TotalMoney' from bill b join account a on b.id_account = a.id join bill_detail bd on b.id = bd.id_bill join sku s on bd.id_sku = s.id join product p on s.product_id = p.id join category c on p.id_category = c.id where b.id = ?1", nativeQuery = true)
    List<BillDetailCustomerResponse> getAll(Integer id);

    @Transactional
    @Modifying
    @Query(value = "delete from bill_detail where id_bill = ?1", nativeQuery = true)
    void deleteBillDetailsByBill(Integer id);

}
