package com.example.backend.repository;

import com.example.backend.entity.Bill;
import com.example.backend.entity.projectIon.AnnualRevenueIon;
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
@Transactional
public interface BillRepository extends JpaRepository<Bill, Integer> {
    Optional<Bill> findByCode(String code);

//    @Query(value = "select bill.id, bill.address, bill.code, bill.completion_date, bill.confirmation_date, bill.date_create, bill.date_update, bill.delivery_date, bill.item_discount, bill.money_ship, bill.note, bill.person_create, bill.person_update, bill.phone_number, bill.receive_date, bill.status_bill, bill.total_money, bill.type, bill.user_name, bill.id_account, bill.id_customer from bill join account on bill.id_account = account.id join user on account.id_user = user.id where (bill.code like %?1% or bill.person_create like %?1%) and bill.status_bill like ?2% and user.id like %?3% ORDER BY date_create DESC, Id DESC", nativeQuery = true)
@Query(value = "select bill.id, bill.address, bill.code, bill.completion_date, bill.confirmation_date, bill.date_create, bill.date_update, bill.delivery_date, bill.item_discount, bill.money_ship, bill.note, bill.person_create, bill.person_update, bill.phone_number, bill.receive_date, bill.status_bill, bill.total_money, bill.type, bill.user_name, bill.id_account, bill.id_customer from bill where (bill.code like %?1% or bill.person_create like %?1%) and bill.status_bill like ?2% ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Bill> searchNoDate(String key, String status);

//    @Query(value = "select bill.id, bill.address, bill.code, bill.completion_date, bill.confirmation_date, bill.date_create, bill.date_update, bill.delivery_date, bill.item_discount, bill.money_ship, bill.note, bill.person_create, bill.person_update, bill.phone_number, bill.receive_date, bill.status_bill, bill.total_money, bill.type, bill.user_name, bill.id_account, bill.id_customer from bill join account on bill.id_account = account.id join user on account.id_user = user.id where (bill.code like %?1% or bill.person_create like %?1%) and bill.status_bill like ?2% and user.id like %?3% and (bill.date_create >= ?4 and bill.date_create <= ?5) ORDER BY date_create DESC, Id DESC", nativeQuery = true)
@Query(value = "select bill.id, bill.address, bill.code, bill.completion_date, bill.confirmation_date, bill.date_create, bill.date_update, bill.delivery_date, bill.item_discount, bill.money_ship, bill.note, bill.person_create, bill.person_update, bill.phone_number, bill.receive_date, bill.status_bill, bill.total_money, bill.type, bill.user_name, bill.id_account, bill.id_customer from bill where (bill.code like %?1% or bill.person_create like %?1%) and bill.status_bill like ?2% and (bill.date_create >= ?3 and bill.date_create <= ?4) ORDER BY date_create DESC, Id DESC", nativeQuery = true)
List<Bill> searchWithDate(String key, String status, LocalDate dateStart, LocalDate dateEnd);

    @Modifying
    @Transactional
    @Query(value = "update Bill set statusBill = 'CHO_VAN_CHUYEN' where id = ?1")
    void updateBillStatus(int id);


    //    @Query(value = "select * from bill where DATE(date_create) = CURDATE()", nativeQuery = true)
    @Query(value = "SELECT * FROM bill WHERE DATE(date_create) = CURDATE()", nativeQuery = true)
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
    @Query(value = "select code_imei from imei_da_ban join bill_detail on bill_detail.id = imei_da_ban.id_bill_detail \n" +
            "                where (\n" +
            "                  (bill_detail.date_update IS NULL AND DATEDIFF(CURDATE(), bill_detail.date_create) < 30)\n" +
            "               OR (bill_detail.date_update IS NOT NULL AND DATEDIFF(CURDATE(), bill_detail.date_update) < 30) \n" +
            "                   )", nativeQuery = true)
    List<String> listImeiDaBanTrong30NgayGanDay();


    // lấy ra list imei máy bán ra trong 30 ngày gần đây
//    @Transactional
//    @Modifying
    @Query(value = "SELECT\n" +
            "  MONTH(date_create) AS month,\n" +
            "  SUM(total_money) AS totalMoney,\n" +
            "  COUNT(code) AS quantity\n" +
            "FROM bill\n" +
            "WHERE YEAR(date_create) = 2023 AND status_bill = 'DA_THANH_TOAN'\n" +
            "GROUP BY month\n" +
            "UNION\n" +
            "SELECT\n" +
            "  Months.MonthNumber AS month,\n" +
            "  0 AS totalMoney,\n" +
            "  0 AS quantity\n" +
            "FROM (SELECT 1 AS MonthNumber UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6\n" +
            "      UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) Months\n" +
            "LEFT JOIN bill ON Months.MonthNumber = MONTH(bill.date_create) AND YEAR(bill.date_create) = 2023 AND bill.status_bill = 'DA_THANH_TOAN'\n" +
            "WHERE bill.code IS NULL\n" +
            "ORDER BY month", nativeQuery = true)
    List<AnnualRevenueIon> annualRevenueYear();

    //Customers

    // lấy râ số khách hàng đã đặt hàng hôm nay,
    @Query(value = "select account.id from bill join account on bill.id_account = account.id \n" +
            " where date(bill.date_create) = CURDATE() and bill.status_bill='CHO_XAC_NHAN' group by  account.id", nativeQuery = true)
    List<Integer> countCustomersOrderToday();

    //số khác hàng đã huỷ đơn hôm nay
    @Query(value = "select account.id from bill join account on bill.id_account = account.id \n" +
            " where date(bill.date_create) = CURDATE() and bill.status_bill='DA_HUY' group by  account.id", nativeQuery = true)
    List<Integer> countCustomersCanceledToday();

    //số khách hàng đã thanh toán hôm nay

    @Query(value = "select account.id from bill join account on bill.id_account = account.id \n" +
            " where date(bill.date_create) = CURDATE() and bill.status_bill='DA_THANH_TOAN' group by  account.id", nativeQuery = true)
    List<Integer> countCustomersPaidToday();

    // số khách hàng trả đơn trong hôm nay

    @Query(value = "select account.id from bill join account on bill.id_account = account.id \n" +
            " where date(bill.date_create) = CURDATE() and bill.status_bill='TRA_HANG' group by  account.id", nativeQuery = true)
    List<Integer> countCustomersReturnedToday();

    @Query(value = "select * from bill where id_account = ?1 and type = 'ONLINE'", nativeQuery = true)
    List<Bill> listBillByIdAccount(Integer id);

    @Query(value = "select * from bill where id_account = ?1 and status_bill = 'CHO_XAC_NHAN' and type = 'ONLINE'", nativeQuery = true)
    List<Bill> listBillByIdAccountCXN(Integer id);

    @Query(value = "select * from bill where id_account = ?1 and status_bill = 'CHO_VAN_CHUYEN' and type = 'ONLINE'", nativeQuery = true)
    List<Bill> listBillByIdAccountCVC(Integer id);

    @Query(value = "select * from bill where id_account = ?1 and status_bill = 'VAN_CHUYEN' and type = 'ONLINE'", nativeQuery = true)
    List<Bill> listBillByIdAccountVC(Integer id);

    @Query(value = "select * from bill where id_account = ?1 and status_bill = 'DA_THANH_TOAN' and type = 'ONLINE'", nativeQuery = true)
    List<Bill> listBillByIdAccountDTT(Integer id);

    @Query(value = "select * from bill where id_account = ?1 and status_bill = 'DA_HUY' and type = 'ONLINE'", nativeQuery = true)
    List<Bill> listBillByIdAccountDH(Integer id);

    @Modifying
    @Query(value = "update bill set status_bill = 'DA_HUY' where id = ?1", nativeQuery = true)
    void deleteBill(Integer id);

    //lấy ra bill mới nhất trong ngày
    @Query(value = "select * from bill where date_create = CURDATE() and type = 'OFFLINE' ORDER BY date_create DESC, Id DESC limit 1", nativeQuery = true)
    Bill newBillOfNow();

    @Query(value = "select * from bill where status_bill = 'CHO_XAC_NHAN' and type = 'OFFLINE' ORDER BY id DESC", nativeQuery = true)
    List<Bill> listBillChoThanhToan();

    //search bill cho thanh toan
    @Query(value = "select * from bill where status_bill = 'CHO_XAC_NHAN' and type = 'OFFLINE' and id_account = ?1 and code like %?2% ORDER BY id DESC", nativeQuery = true)
    List<Bill> searchBillChoThanhToan(Integer id, String codeBill);

    @Query(value = "SELECT * FROM bill\n" +
            "WHERE status_bill = 'DA_THANH_TOAN' and type = 'OFFLINE' and date_create = CURRENT_DATE or date_update = CURRENT_DATE ORDER BY id DESC", nativeQuery = true)
    List<Bill> billInDate();

    @Query(value = "select * from bill where status_bill = 'DA_THANH_TOAN' and type = 'OFFLINE' and date_create = CURDATE() and id_account = ?1 and code like %?2%  ORDER BY id DESC", nativeQuery = true)
    List<Bill> searchBillDaThanhToan(Integer id, String codeBill);

    @Query(value = "SELECT * FROM bill WHERE code like ?1", nativeQuery = true)
    List<Bill> getThongTinThanhToan(String codeBill);

    @Query(value = "SELECT * FROM bill\n" +
            "    WHERE DATE(date_create) = CURDATE() AND status_bill = 'CHO_VAN_CHUYEN'\n" +
            "    ORDER BY   date_create DESC, Id DESC", nativeQuery = true)
    List<Bill> listHoaDonChoVanChuyenTrongNgay();

    //lấy ra tổng số bill của các bill có tài khoản trong ngày hôm nay
    @Query(value = "select * from bill join account on bill.id_account = account.id\n" +
            "    where date(bill.date_create) = CURDATE()", nativeQuery = true)
    List<Bill> getAllBillOfAccountToDay();

    // lấy ra list bill trong khoảng ngày a- ngày b
    @Query(value = "select * from bill where date_create BETWEEN ?1 and ?2", nativeQuery = true)
    List<Bill> getBillSeach(LocalDate dateBefore, LocalDate dateAfter);

    // lấy râ số khách hàng đã đặt hàng khoang ngay
    @Query(value = "select account.id from bill join account on bill.id_account = account.id \n" +
            " where bill.date_create  BETWEEN ?1 and ?2  and bill.status_bill='CHO_XAC_NHAN' group by  account.id", nativeQuery = true)
    List<Integer> getListKhachHangDatHangHomNay(LocalDate dateBefore, LocalDate dateAfter);

    // lấy râ số khách hàng đã thanh toan trong khoang ngay
    @Query(value = "select account.id from bill join account on bill.id_account = account.id \n" +
            " where bill.date_create  BETWEEN ?1 and ?2 and bill.status_bill='DA_THANH_TOAN' group by  account.id", nativeQuery = true)
    List<Integer> getListKhachHangDaThanhToanTrongKhoangNgay(LocalDate dateBefore, LocalDate dateAfter);

    // số khách hàng huy đơn trong khoang ngay
    @Query(value = "select account.id from bill join account on bill.id_account = account.id " +
            "   where bill.date_create  BETWEEN ?1 and ?2 and bill.status_bill='DA_HUY' group by  account.id", nativeQuery = true)
    List<Integer> getListKhachHangDaHuyDonTrongKhoangNgay(LocalDate dateBefore, LocalDate dateAfter);

    // list năm
    @Query(value = "select year(date_create) from bill where status_bill='DA_THANH_TOAN' group by year(date_create)", nativeQuery = true)
    List<Integer> getListYearOfBill();

    @Query(value = "SELECT\n" +
            "  MONTH(date_create) AS month,\n" +
            "  SUM(total_money) AS totalMoney,\n" +
            "  COUNT(code) AS quantity\n" +
            "FROM bill\n" +
            "WHERE YEAR(date_create) =?1 AND status_bill = 'DA_THANH_TOAN'\n" +
            "GROUP BY month\n" +
            "UNION\n" +
            "SELECT\n" +
            "  Months.MonthNumber AS month,\n" +
            "  0 AS totalMoney,\n" +
            "  0 AS quantity\n" +
            "FROM (SELECT 1 AS MonthNumber UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6\n" +
            "      UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12) Months\n" +
            "LEFT JOIN bill ON Months.MonthNumber = MONTH(bill.date_create) AND YEAR(bill.date_create) = 2023 AND bill.status_bill = 'DA_THANH_TOAN'\n" +
            "WHERE bill.code IS NULL\n" +
            "ORDER BY month", nativeQuery = true)
    List<AnnualRevenueIon> seachDoanhSoTheoNam(Integer year);
}
