package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.billOffLine.AddBillOffLineRequest;
import com.example.backend.controller.order_management.model.billOffLine.BillOffLineModel;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.model.billOffLine.ion.ImeiBillOffLineIonRespon;
import com.example.backend.controller.order_management.model.billOffLine.ion.ListBillChoThanhToan;
import com.example.backend.controller.order_management.model.billOffLine.ion.ListBillChoThanhToanS2;
import com.example.backend.controller.order_management.model.billOffLine.ion.SkuBillOffLineIonRespon;
import com.example.backend.entity.Account;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.SKU;

import java.util.List;

public interface BillOffLineService {
    BillOffLineModel createBill(Integer idAccount);
    Account getAccount(Integer idAccount);
    String checkRolesAccount(Integer idAccount);

    //add ản phẩm vào bill -> sinh ra bill_detail
    BillDetails addBillDetail(AddBillOffLineRequest addBillOffLineRequest);

    //lấy ra list bill_detail của 1 bill
    List<BillDetailOffLineIon> getBilDetailOfBill(String codeBill);

    //lấy ra list imei của 1 sku được chọn khi ấn thêm imei ở màn hình bán offline
    List<ImeiBillOffLineIonRespon> getImeisOfSkuSellOffLine(Long idSku);

    //lấy ra sku để hiển thị
    SkuBillOffLineIonRespon getOneSKU(Long idSKU);

    List<ListBillChoThanhToan> findBillByCodeBill(String codeBill);

    ListBillChoThanhToanS2 findBillByCodeBillS2(String codeBill);

}
