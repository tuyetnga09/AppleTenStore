package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.bill.request.BillReturn;
import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerIon;
import com.example.backend.entity.Bill;

import java.util.List;

public interface TraHangService {
    //viet tra hang - khach hang
    List<BillDetailCustomerIon> khachHangTraHang( Integer idBillReturn, String noteBillReturn, List<Long> idImeiDaBans);
    Integer checkTraHang(Integer idBill);
    List<BillDetailCustomerIon> khachHangTraTatCaHang( Integer idBillReturn, String noteBillReturn, List<BillDetailCustomerIon> billDetailCustomerIons);
    List<BillDetailCustomerIon> khachHuyYeuCauTraHang(Integer idBillReturn, String noteBillReturn);
}
