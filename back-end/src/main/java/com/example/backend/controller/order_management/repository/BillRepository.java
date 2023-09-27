package com.example.backend.controller.order_management.repository;

import com.example.backend.controller.order_management.model.bill.request.BillRequest;
import com.example.backend.controller.order_management.model.bill.response.BillResponse;
import com.example.backend.repository.IBillRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepository extends IBillRepository {
    // hien thi tat ca hoa don

    @Query(value = " SELECT  ROW_NUMBER() OVER( ORDER BY bi.date_create  DESC ) AS stt, bi.id, bi.code, bi.date_create , bi.user_name AS userName ,  usem.full_name AS nameEmployees , bi.type, bi.status_bill, bi.total_money, bi.item_discount  FROM bill bi\n" +
            "                LEFT JOIN account ac ON ac.id = bi.id_account\n" +
            "                LEFT JOIN account em ON em.id = bi.id_employees\n" +
            "                LEFT JOIN customer c ON c.id = bi.id_customer\n" +
            "                LEFT JOIN user usac ON usac.id = ac.id_user\n" +
            "                LEFT JOIN user usem ON usem.id = em.id_user\n" +
            "                WHERE  ( :#{#request.startTime} = 0\n" +
            "                         OR bi.date_create  >= :#{#request.startTime}  )\n" +
            "                AND ( :#{#request.endTime} = 0\n" +
            "                         OR bi.date_create  <= :#{#request.endTime}  )\n" +
            "                 AND ( :#{#request.startDeliveryDate} = 0\n" +
            "                         OR bi.delivery_date >= :#{#request.startDeliveryDate}  )\n" +
            "                AND ( :#{#request.endDeliveryDate} = 0\n" +
            "                         OR bi.delivery_date <= :#{#request.endDeliveryDate}  )         \n" +
            "                AND ( :#{#request.convertStatus} IS NULL\n" +
            "                         OR :#{#request.convertStatus} LIKE '[]'\n" +
            "                         OR bi.status_bill IN (:#{#request.status}))\n" +
            "                AND ( :#{#request.key} IS NULL\n" +
            "                         OR :#{#request.key} LIKE ''\n" +
            "                         OR bi.code LIKE %:#{#request.key}% \n" +
            "                         OR bi.user_name LIKE %:#{#request.key}% \n" +
            "                         OR usem.full_name LIKE %:#{#request.key}% \n" +
            "                         OR bi.phone_number LIKE %:#{#request.key}% )\n" +
            "                AND ( :#{#request.type} IS NULL\n" +
            "                         OR :#{#request.type} LIKE ''\n" +
            "                         OR bi.type = :#{#request.type})\n" +
            "                ORDER BY bi.date_create DESC", nativeQuery = true)
    List<BillResponse> getAll(BillRequest request);



}
