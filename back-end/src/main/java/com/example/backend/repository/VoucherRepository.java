package com.example.backend.repository;

import com.example.backend.controller.order_management.model.billOnline.response.VoucherHoaDonTruocKhiUpdate;
import com.example.backend.controller.voucher_managment.model.request.FindVoucherRequest;
import com.example.backend.controller.voucher_managment.model.response.VoucherResponse;
import com.example.backend.entity.User;
import com.example.backend.entity.Voucher;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

public interface VoucherRepository extends CustomVoucherRepository, JpaRepository<Voucher, Integer> {

    @Query(value = "select v.id as 'id', v.code as 'code', v.name as 'name', v.quantity as 'quantity', v.value_maximum as 'valueMaximum', v.value_minimum as 'valueMinimum',\n" +
            "v.type_voucher as 'typeVoucher', v.date_start as 'dateStart', v.date_end as 'dateEnd', v.value_voucher as 'valueVoucher', v.conditions_apply as 'conditionsApply', v.status as 'status'\n" +
            "from voucher v WHERE v.id = ?1", nativeQuery = true)
    VoucherResponse getOneVoucher(Integer id);

    @Transactional
    @Modifying
    @Query(value = "update voucher v set v.status = CASE WHEN v.status = 1 then 2\n" +
            "                                     WHEN v.status = 2 then 1\n" +
            "                                     WHEN v.status = 3 then 1\n" +
            "                                     ELSE v.status \n" +
            "END \n" +
            "WHERE v.id = :idRecord", nativeQuery = true)
    void changStatus(@Param("idRecord") Integer id);

    @Query(value = "select v from voucher v where :date1 BETWEEN v.date_start AND v.date_end and v.status <> :status", nativeQuery = true)
    List<Voucher> checkToStartBeforeDateNowAndStatus(@Param("date1") Date dateTime, @Param("status") Integer status);

    @Query(value = "SELECT v FROM voucher v WHERE v.date_end < ?1 AND v.status <> ?2", nativeQuery = true)
    List<Voucher> checkEndDateAndStatus(@Param("dateTime") Date dateTime, Integer status);

    @Query(value = "SELECT v FROM Voucher v WHERE v.date_start > ?1 AND v.status <> ?2", nativeQuery = true)
    List<Voucher> checkToStartAfterAndStatus(@Param("dateTime") Date dateTime, Integer status);

    Voucher findByCode(String code);

    @Query(value = "SELECT\n" +
            "    conditions_apply, date_end, date_start, id, quantity, status,\n" +
            "    type_voucher, value_maximum, value_minimum, value_voucher,\n" +
            "    date_create, date_update, code, name, person_create, person_update\n" +
            "FROM voucher WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Voucher> findAllVoucher(FindVoucherRequest request);

    @Query(value = "SELECT\n" +
            "    conditions_apply, date_end, date_start, id, quantity, status,\n" +
            "    type_voucher, value_maximum, value_minimum, value_voucher,\n" +
            "    date_create, date_update, code, name, person_create, person_update\n" +
            "FROM voucher\n" +
            "WHERE value_voucher > 100000\n" +
            "  AND CURRENT_DATE BETWEEN date_start AND date_end AND status = 0;", nativeQuery = true)
    List<Voucher> getVoucherGiamGia(Voucher voucher);

    @Query(value = "SELECT\n" +
            "    conditions_apply, date_end, date_start, id, quantity, status,\n" +
            "    type_voucher, value_maximum, value_minimum, value_voucher,\n" +
            "    date_create, date_update, code, name, person_create, person_update\n" +
            "FROM voucher\n" +
            "WHERE value_voucher < 100000\n" +
            "  AND CURRENT_DATE BETWEEN date_start AND date_end AND status = 0;", nativeQuery = true)
    List<Voucher> getVoucherFreeShip(Voucher voucher);

    @Query(value = "select * from voucher where (code like %?1% or name like %?1%) and status like %?2% ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Voucher> searchNoDate(String key, String status);

    @Query(value = "select * from voucher where (code like %?1% or name like %?1%) and status like %?2% and (date_start = ?3 and date_end = ?4) ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Voucher> searchWithDate(String key, String status, LocalDate dateStart, LocalDate dateEnd);

    @Query(value = "SELECT conditions_apply, date_end, date_start, id, quantity, status,\n" +
            "              type_voucher, value_maximum, value_minimum, value_voucher,\n" +
            "               date_create, date_update, code, name, person_create, person_update\n" +
            "            FROM voucher\n" +
            "            WHERE CURRENT_DATE BETWEEN date_start AND date_end AND code like %?1% ", nativeQuery = true)
    List<Voucher> searchVoucher(String codeVoucher);

    @Query(value = "select v.id as 'idVC', v.name as 'nameVoucher' , v.value_voucher as 'valueVoucher' , v.value_minimum as 'valueMin' from voucher v join voucher_detail vd on v.id = vd.id_voucher join bill b on vd.id_bill = b.id \n" +
            "where b.id=?1", nativeQuery = true)
    List<VoucherHoaDonTruocKhiUpdate> findVoucherKhiUpdateHoaDon(Integer idHoaDon);


}
