package com.example.backend.controller.voucher_managment.repository;

import com.example.backend.controller.voucher_managment.model.response.VoucherResponse;
import com.example.backend.entity.Voucher;
import com.example.backend.repository.IVoucherRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Date;
import java.util.List;

public interface VoucherRepository extends IVoucherRepository, CustomVoucherRepository {

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

}
