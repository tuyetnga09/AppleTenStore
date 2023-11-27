package com.example.backend.controller.voucher_managment.service;

import com.example.backend.controller.voucher_managment.model.request.CreateVoucherRequest;
import com.example.backend.controller.voucher_managment.model.request.FindVoucherRequest;
import com.example.backend.controller.voucher_managment.model.request.UpdateVoucherRequest;
import com.example.backend.controller.voucher_managment.model.response.VoucherResponse;
import com.example.backend.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.time.LocalDate;

public interface VoucherService {

    VoucherResponse getOne(Integer id);

    Voucher addVoucher( CreateVoucherRequest request);

    Voucher updateVoucher(UpdateVoucherRequest request, Integer id);

    Boolean deleteVoucher(Integer id);

    Boolean changeStatus(Integer id);

    List<Voucher> getAll(FindVoucherRequest request);

    Voucher findByIdVoucher(Integer id);

    List<Voucher> getVoucher(Voucher voucher);
    List<Voucher> searchNoDate(String key, String status);

    List<Voucher> searchWithDate(String key, String status, LocalDate dateStart, LocalDate dateEnd);

    List<Voucher> getVoucherFreeShip(Voucher voucher);

    List<Voucher> searchVoucher(String codeVoucher);

    Voucher updateStatusVoucher(Integer id);

    Voucher returnStatusVoucher(Integer id);

}
