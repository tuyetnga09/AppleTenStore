package com.example.backend.controller.order_management.service.impl;

import com.example.backend.controller.order_management.model.billDetail.request.FindBillDetailRequest;
import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerResponse;
import com.example.backend.controller.order_management.service.BillDetailService;
import com.example.backend.entity.BillDetails;
import com.example.backend.repository.BillDetailRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillDetailServiceImpl implements BillDetailService {

    @Autowired
    private BillDetailRepository billDetailRepository;

    @Override
    public Page<BillDetails> getAll(FindBillDetailRequest request, Pageable pageable) {
        return billDetailRepository.findAll(pageable);
    }

    @Override
    public List<BillDetailCustomerResponse> getAll(Integer id) {
        return billDetailRepository.getAll(id);
    }
}
