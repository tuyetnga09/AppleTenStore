package com.example.backend.controller.voucher_managment.repository;

import com.example.backend.controller.voucher_managment.model.request.FindVoucherRequest;
import com.example.backend.entity.Voucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomVoucherRepository {
    Page<Voucher> findAll(Pageable pageable, FindVoucherRequest request);
}
