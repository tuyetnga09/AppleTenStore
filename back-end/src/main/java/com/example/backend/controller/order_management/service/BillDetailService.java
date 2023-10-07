package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.billDetail.request.FindBillDetailRequest;
import com.example.backend.entity.BillDetails;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BillDetailService {

    Page<BillDetails> getAll(FindBillDetailRequest request, Pageable pageable);
}
