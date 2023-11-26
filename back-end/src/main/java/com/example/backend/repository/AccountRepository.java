package com.example.backend.repository;

import com.example.backend.entity.Account;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    @Query("SELECT ac FROM Account ac WHERE ac.email =:email")
    Account getOneByEmail(@Param("email") String email);

    Account findByEmail(String code);

    @Query(value = "SELECT SUM(CASE WHEN MONTH(date_create) = MONTH(CURRENT_DATE) - 1 AND YEAR(date_create) = YEAR(CURRENT_DATE) THEN 1 ELSE 0 END) from account", nativeQuery = true)
    Integer numberOfCustomersLastMonth();

    @Query(value = "SELECT SUM(CASE WHEN MONTH(date_create) = MONTH(CURRENT_DATE) AND YEAR(date_create) = YEAR(CURRENT_DATE) THEN 1 ELSE 0 END) from account", nativeQuery = true)
    Integer numberOfCustomersThisMonth();

    @Query("SELECT ac FROM Account ac WHERE ac.email =:email AND ac.user.phoneNumber =:phoneNumber")
    Account resetPassword(@Param("email") String email , @Param("phoneNumber") String phoneNumber);

    Account findByUser_Id(Integer id);

    @Query(value = "SELECT * FROM account ORDER BY id DESC LIMIT 1", nativeQuery = true)
    Account latestAccount();

    @Query(value = "select * from account where date_create BETWEEN ?1 and ?2", nativeQuery = true)
    List<Account> getSeachKhoangNgay(String dateBefore, String dateAfter);

    @Query(value = "SELECT COUNT(*)\n" +
            "FROM account\n" +
            "WHERE YEAR(date_create) = year(?1) AND YEAR(date_create) = year(?2) AND MONTH(date_create) BETWEEN month(?1) " +
            "AND month(?2) and roles = 'CUSTOMER'", nativeQuery = true)
    Long seachKhoangNgayTaiKhoanTrongThang(Date dateBefore, Date dateAfter);


    //tong tai khoang trong tháng hiẹn tại
    @Query(value = "SELECT COUNT(*)\n" +
            "FROM account\n" +
            "WHERE YEAR(date_create) = year(CURDATE()) AND MONTH(CURDATE()) BETWEEN month(CURDATE()) " +
            " AND month(CURRENT_DATE) and roles = 'CUSTOMER'", nativeQuery = true)
    Long tongTaiKhoanTrongThangHienTai();

    // tong tai khoan dang su dung toi hienj tai
    @Query(value = "SELECT COUNT(*)\n" +
            " FROM account\n" +
            " WHERE status='DANG_SU_DUNG' and roles = 'CUSTOMER'", nativeQuery = true)
    Long tongTaiKhoanHoatDongHienTai();


    // tong tai khoan  toi hienj tai
    @Query(value = "SELECT COUNT(*)\n" +
            "    FROM account\n" +
            "    WHERE    roles = 'CUSTOMER'", nativeQuery = true)
    Long tongTaiKhoanHienTai();



    // tong tai khoan  moi hom nay
    @Query(value = "SELECT COUNT(*)\n" +
            "    FROM account\n" +
            "    WHERE date(date_create)= curdate() and  roles = 'CUSTOMER'", nativeQuery = true)
    Long tongTaiKhoanMoiHomNay();
}
