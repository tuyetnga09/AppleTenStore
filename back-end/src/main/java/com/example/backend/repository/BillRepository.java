package com.example.backend.repository;

import com.example.backend.controller.product_controller.model.request.AnnualRevenue;
import com.example.backend.entity.Bill;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer> {
    Optional<Bill> findByCode(String code);

    @Query(value = "select bill.id, bill.address, bill.code, bill.completion_date, bill.confirmation_date, bill.date_create, bill.date_update, bill.delivery_date, bill.item_discount, bill.money_ship, bill.note, bill.person_create, bill.person_update, bill.phone_number, bill.receive_date, bill.status_bill, bill.total_money, bill.type, bill.user_name, bill.id_account, bill.id_customer, bill.id_employees from bill join account on bill.id_account = account.id join user on account.id_user = user.id where (bill.code like %?1% or bill.person_create like %?1%) and bill.status_bill like ?2% and user.id like %?3%", nativeQuery = true)
    Page<Bill> searchNoDate(Pageable pageable, String key, String status, String user);

    @Query(value = "select bill.id, bill.address, bill.code, bill.completion_date, bill.confirmation_date, bill.date_create, bill.date_update, bill.delivery_date, bill.item_discount, bill.money_ship, bill.note, bill.person_create, bill.person_update, bill.phone_number, bill.receive_date, bill.status_bill, bill.total_money, bill.type, bill.user_name, bill.id_account, bill.id_customer, bill.id_employees from bill join account on bill.id_account = account.id join user on account.id_user = user.id where (bill.code like %?1% or bill.person_create like %?1%) and bill.status_bill like ?2% and user.id like %?3% and (bill.date_create >= ?4 and bill.date_create <= ?5)", nativeQuery = true)
    Page<Bill> searchWithDate(Pageable pageable, String key, String status, String user, LocalDate dateStart, LocalDate dateEnd);

    @Modifying
    @Transactional
    @Query(value = "update Bill set statusBill = 'CHO_VAN_CHUYEN' where id = ?1")
    void updateBillStatus(int id);


    //    @Query(value = "select * from bill where DATE(date_create) = CURDATE()", nativeQuery = true)
    @Query(value = "SELECT * FROM bill WHERE CASE " +
            " WHEN date_update IS NULL AND DATE(date_create) = CURDATE() THEN 1\n" +
            " WHEN date_update IS NOT NULL AND DATE(date_update) = CURDATE() THEN 1\n" +
            " ELSE 0\n" +
            " END = 1", nativeQuery = true)
    List<Bill> listOfBillsForTheDay();

    //tổng tiền chưa trừ  đơn huỷ
    @Query(value = "SELECT SUM(total_money) FROM bill WHERE CASE " +
            "    WHEN date_update IS NULL AND DATE(date_create) = CURDATE() THEN 1\n" +
            "    WHEN date_update IS NOT NULL AND DATE(date_update) = CURDATE() THEN 1\n" +
            "    ELSE 0\n" +
            "    END = 1", nativeQuery = true)
    Long sumToTalMoneyOfBillsForTheDay();

    //tổng tiền đã trừ đơn huỷ
    @Query(value = "SELECT SUM(total_money) FROM bill WHERE CASE\n" +
            "    WHEN date_update IS NULL AND DATE(date_create) = CURDATE() AND status_bill NOT IN ('DA_HUY') THEN 1\n" +
            "    WHEN date_update IS NOT NULL AND DATE(date_update) = CURDATE() AND status_bill NOT IN ('DA_HUY') THEN 1\n" +
            "    ELSE 0\n" +
            "    END = 1", nativeQuery = true)
    Long sumToTalMoneyOfBillsForTheDayAndNotStatusBillDaHuy();

    //page bill "CHO_VAN_CHUYEN"
    @Query(value = " SELECT * FROM bill WHERE " +
            " (code LIKE %?1% \n" +
            "    OR " +
            "    total_money LIKE %?1% \n" +
            "    OR " +
            "    phone_number LIKE %?1%\n" +
            "    OR " +
            "    user_name LIKE %?1% )" +
            " ORDER BY " +
            " (" +
            "    CASE" +
            "        WHEN date_update IS NULL AND DATE(date_create) = CURDATE() AND status_bill = 'CHO_VAN_CHUYEN' THEN 1" +
            "        WHEN date_update IS NOT NULL AND DATE(date_update) = CURDATE() AND status_bill = 'CHO_VAN_CHUYEN' THEN 1" +
            "        ELSE 0" +
            "    END" +
            " ) DESC, date_create DESC, Id DESC", nativeQuery = true)
    Page<Bill> pageBillStatusChoVanChuyen(Pageable pageable, String key);


    // lấy ra list imei máy bán ra trong 30 ngày gần đây
    @Query(value = "select codeImei from Imei_DaBan join bill_detail on bill_detail.id = Imei_DaBan.IdBillDetail " +
            "    where (" +
            "      (bill_detail.date_update IS NULL AND DATEDIFF(CURDATE(), bill_detail.date_create) < 30)" +
            "    OR (bill_detail.date_update IS NOT NULL AND DATEDIFF(CURDATE(), bill_detail.date_update) < 30) " +
            "        )", nativeQuery = true)
    List<String> listImeiDaBanTrong30NgayGanDay();


    // lấy ra list imei máy bán ra trong 30 ngày gần đây
//    @Transactional
//    @Modifying
    @Query(value = "SELECT MONTH(date_create)  AS month, SUM(total_money) AS total_money, COUNT(code)  as quantity\n" +
            "    FROM bill " +
            "    WHERE YEAR(date_create) = 2023 AND status_bill = 'DA_THANH_TOAN' " +
            "    GROUP BY month " +
            "    ORDER BY month ", nativeQuery = true)
    List<AnnualRevenue> annualRevenueYear();

    Bill findById(int id);

}
