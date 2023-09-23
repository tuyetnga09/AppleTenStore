package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.bill.request.BillRequest;

public interface BillService {
    String createBillCustomerOnlineRequest( BillRequest request) ;
}
