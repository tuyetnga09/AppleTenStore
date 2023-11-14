package com.example.backend.repository;

import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
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
    @Query(value = "SELECT \n" +
            "          MONTH(date_create) AS  month , \n" +
            "              SUM(total_money) AS totalMoney, \n" +
            "              count(code) as quantity\n" +
            "              FROM bill \n" +
            "                WHERE YEAR(date_create) = 2023 and status_bill = 'DA_THANH_TOAN' \n" +
            "              GROUP BY month\n" +
            "               ORDER BY month", nativeQuery = true)
    List<AnnualRevenueIon> annualRevenueYear();

    //Customers

    // lấy râ số khách hàng đã đặt hàng hôm nay,
    @Query(value = "select account.id from bill join account on bill.id_account = account.id \n" +
            " where date(bill.date_create) = CURDATE() and bill.status_bill='CHO_XAC_NHAN'", nativeQuery = true)
    List<Integer> countCustomersOrderToday();

    //số khác hàng đã huỷ đơn hôm nay
    @Query(value = "select account.id from bill join account on bill.id_account = account.id \n" +
            " where date(bill.date_create) = CURDATE() and bill.status_bill='DA_HUY'", nativeQuery = true)
    List<Integer> countCustomersCanceledToday();
    //số khách hàng đã thanh toán hôm nay

    @Query(value = "select account.id from bill join account on bill.id_account = account.id \n" +
            " where date(bill.date_create) = CURDATE() and bill.status_bill='DA_HUY'", nativeQuery = true)
    List<Integer> countCustomersPaidToday();

    // số khách hàng trả đơn trong hôm nay

    @Query(value = "select account.id from bill join account on bill.id_account = account.id \n" +
            " where date(bill.date_create) = CURDATE() and bill.status_bill='TRA_HANG'", nativeQuery = true)
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

    @Modifying
    @Query(value = "update bill\n" +
            "set status_bill = 'CHO_VAN_CHUYEN', date_update = CURRENT_DATE(), person_update = ?1\n" +
            "where status_bill = 'CHO_XAC_NHAN';", nativeQuery = true)
    void updateAllChoVanChuyen(String personUpdate);

    @Query(value = "select b.id as 'id', b.quantity as 'quantity', b.price as 'price', b.status_bill as 'statusBillDetail',\n" +
            "             b.id_bill as 'bill', b2.code as 'CodeBill',\n" +
            "             b.person_create as  'personCreate', b.person_update as 'personUpdate', b.date_create as 'dateCreate',\n" +
            "             b.date_update as 'dateUpdate',\n" +
            "             s.id as 'idSKU', s.capacity as 'skuCapacity', s.color as 'skuColor' , s.price as 'skuPrice' ,\n" +
            "             p.id as 'idProduct', p.name as 'nameProduct', b.price * b.quantity  as 'totalManyOneBillDetail',\n" +
            "             count(i.code_imei) as 'soLuongImeiDaChon'\n" +
            "             from bill_detail b LEFT JOIN imei_da_ban i on b.id = i.id_bill_detail join sku s on b.id_sku = s.id\n" +
            "             join product p on s.product_id = p.id join bill b2 on b2.id = b.id_bill where b2.type = 'ONLINE' and b2.status_bill = 'CHO_XAC_NHAN'\n" +
            "             group by id, quantity, price, statusBillDetail, bill, CodeBill, personCreate, personUpdate, dateCreate,\n" +
            "             dateUpdate, idSKU, skuCapacity, skuColor, skuPrice, idProduct, nameProduct, totalManyOneBillDetail", nativeQuery = true)
    List<BillDetailOffLineIon> getAllBillChoXacNhan();
}
