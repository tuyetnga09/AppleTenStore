package com.example.backend.repository;

import com.example.backend.entity.BillHistory;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BillHistoryRepository extends JpaRepository<BillHistory, Integer> {

    @Modifying
    @Transactional
    @Query(value = "update bill_history set status_bill = 'DA_HUY' where id_bill = ?1", nativeQuery = true)
    void deleteBillHistoriesByIdBill(Integer id);
}
