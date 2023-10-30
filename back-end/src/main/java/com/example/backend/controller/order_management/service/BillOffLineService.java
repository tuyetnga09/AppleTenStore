package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.billOffLine.AddBillOffLineRequest;
import com.example.backend.controller.order_management.model.billOffLine.BillOffLineModel;
import com.example.backend.controller.order_management.model.billOffLine.ImeiDaBanOffLineRequest;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.model.billOffLine.ion.CheckImeiDaBanIonSellOffLine;
import com.example.backend.controller.order_management.model.billOffLine.ion.ImeiBillOffLineIonRespon;
import com.example.backend.controller.order_management.model.billOffLine.ion.ImeiDaBanOffLineIonRespon;
import com.example.backend.controller.order_management.model.billOffLine.ion.SkuBillOffLineIonRespon;
import com.example.backend.entity.Account;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.ImeiDaBan;
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

    //lấy ra list imei đã bán của sku trong bill_detail được chọn
    List<ImeiDaBanOffLineIonRespon> getImeiDaBanOfSku(Integer idBillDetail, Long idSku);

    //add imei vvào billDetail ( vào bảng imei_da_ban)
     ImeiDaBan addImeiDaBanOffLine(ImeiDaBanOffLineRequest imeiDaBanOffLineRequest);

    //xoa bảng imei_da_ban của sku được chọn trong bill_detail
    Boolean deleteImeiDaBanOffLine(Long idImeiDaban);

    //seach imei thất lạc
     List<CheckImeiDaBanIonSellOffLine> checkImeiThatLac(String codeImei);
}
