package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.bill.request.BillRequest;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnline;
import com.example.backend.controller.order_management.model.bill.response.BillResponse;
import com.example.backend.entity.Bill;

import java.util.List;

public interface BillService {
    String createBillCustomerOnlineRequest( BillRequestOnline request) ;
    List<BillResponse> getAll(BillRequest request);
    Bill detail(Integer id);
}
