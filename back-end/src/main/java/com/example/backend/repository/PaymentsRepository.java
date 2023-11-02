package com.example.backend.repository;

import com.example.backend.entity.Payments;
import com.example.backend.entity.Voucher;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentsRepository extends JpaRepository<Payments, Integer> {
    Payments findByCode(String code);

    @Modifying
    @Transactional
    @Query(value = "delete from payments where id_bill = ?1", nativeQuery = true)
    void deletePaymentsByBill(Integer id);

}
