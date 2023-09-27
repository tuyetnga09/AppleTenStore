package com.example.backend.controller.voucher_managment.service;

import com.example.backend.controller.voucher_managment.model.request.CreateVoucherRequest;
import com.example.backend.controller.voucher_managment.model.request.FindVoucherRequest;
import com.example.backend.controller.voucher_managment.model.request.UpdateVoucherRequest;
import com.example.backend.controller.voucher_managment.model.response.VoucherResponse;
import com.example.backend.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VoucherService {

    VoucherResponse getOne(Integer id);

    Voucher addVoucher( CreateVoucherRequest request);

    Voucher updateVoucher(UpdateVoucherRequest request, Integer id);

    Boolean deleteVoucher(Integer id);

    Boolean changeStatus(Integer id);

    Page<Voucher> getAll(FindVoucherRequest request, Pageable pageable);

    Voucher findByIdVoucher(Integer id);

}
