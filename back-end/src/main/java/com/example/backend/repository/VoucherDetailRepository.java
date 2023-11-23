package com.example.backend.repository;

import com.example.backend.entity.VoucherDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoucherDetailRepository extends JpaRepository<VoucherDetail, Integer> {

    @Query(value = "select * from voucher_detail where id_bill = ?1", nativeQuery = true)
    List<VoucherDetail> listVoucherDetailByIdBill(Integer id);
}
