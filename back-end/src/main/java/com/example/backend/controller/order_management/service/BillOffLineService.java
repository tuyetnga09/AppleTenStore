package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.billOffLine.AddBillOffLineRequest;
import com.example.backend.controller.order_management.model.billOffLine.BillOffLineModel;
import com.example.backend.controller.order_management.model.billOffLine.DoneBill;
import com.example.backend.controller.order_management.model.billOffLine.ImeiDaBanOffLineRequest;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.model.billOffLine.ion.CheckImeiDaBanIonSellOffLine;
import com.example.backend.controller.order_management.model.billOffLine.ion.ImeiBillOffLineIonRespon;
import com.example.backend.controller.order_management.model.billOffLine.ion.ImeiDaBanOffLineIonRespon;
import com.example.backend.controller.order_management.model.billOffLine.ion.ListBillChoThanhToan;
import com.example.backend.controller.order_management.model.billOffLine.ion.ListBillChoThanhToanS2;
import com.example.backend.controller.order_management.model.billOffLine.ion.SkuBillOffLineIonRespon;
import com.example.backend.entity.Account;
import com.example.backend.entity.Bill;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.ImeiDaBan;
import com.example.backend.entity.SKU;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BillOffLineService {
    BillOffLineModel createBill(Integer idAccount);

    Account getAccount(Integer idAccount);

    String checkRolesAccount(Integer idAccount);

    //add ản phẩm vào bill -> sinh ra bill_detail
    BillDetails addBillDetail(AddBillOffLineRequest addBillOffLineRequest);

    //lấy ra list bill_detail của 1 bill theo codeBill
    List<BillDetailOffLineIon> getBilDetailOfBill(String codeBill);

    //lấy ra list bill_detail của 1 bill theo id_bill
    List<BillDetailOffLineIon> getBilDetailOfBillWhereIdBill(Integer idBill);

    //lấy ra list imei của 1 sku được chọn khi ấn thêm imei ở màn hình bán offline
    List<ImeiBillOffLineIonRespon> getImeisOfSkuSellOffLine(Long idSku);

    //lấy ra sku để hiển thị
    SkuBillOffLineIonRespon getOneSKU(Long idSKU);

    //lấy ra list imei đã bán của sku trong bill_detail được chọn
    List<ImeiDaBanOffLineIonRespon> getImeiDaBanOfSku(Integer idBillDetail, Long idSku);

    //add imei vvào billDetail ( vào bảng imei_da_ban)
    ImeiDaBan addImeiDaBanOffLine(ImeiDaBanOffLineRequest imeiDaBanOffLineRequest);

    //xoa bảng imei_da_ban của sku được chọn trong bill_detail
    Boolean deleteImeiDaBanOffLine(Long idImeiDaban, String codeImei);

    //seach imei thất lạc
    List<CheckImeiDaBanIonSellOffLine> checkImeiThatLac(String codeImei);

    List<ListBillChoThanhToan> findBillByCodeBill(String codeBill);

    ListBillChoThanhToanS2 findBillByCodeBillS2(String codeBill);

    void thanhToan(DoneBill doneBill);
    //seach imei_da_ban theo codeimei
    List<ImeiDaBanOffLineIonRespon> seachImeiDaBan(Integer idBillDetail, Long idSku, String codeImei);

    //seach imei theo codeImei
    List<ImeiBillOffLineIonRespon> seachImeiFindByCodeImei(Long idSku, String codeImei);

    //delete imei_da_ban - xoá danh sách imei đã bán được chọn (checkbox)
    Boolean deleteImeisDaBanOffLineCheckBox(List<String> codeImeis);

    //delete imei_da_ban - xoá all imei đã bán được chọn trong sku and where idbillDetail
    Boolean deleteAllImeisDaBanOffLine(Integer idBillDetail);

    //get imei_da_ban - get all imei đã bán  where idbillDetail
    List<ImeiDaBanOffLineIonRespon> getAllImeisDaBanOffLine(Integer idBillDetail);

    //xoá bill_detail -> xoá các imei_da_ban trong bảng imei_da_ban của bill_detail đó và hoàn lại status các của các imei
    //chỉ xoá được các bill_detail của bill chưa hoàn thành
     Boolean deleteBillDetail(Integer idBillDetail);

    List<Bill> searchBillChoThanhToan(Integer idAccount, String codeBill);

    List<Bill> getListBillChoThanhToan(Integer idAccount);

    //lấy ra 1  id_bill theo idBillDetail
    Integer getIdBill(Integer idBillDetail);

    List<Bill> billInDate();

    List<ListBillChoThanhToan> findBillByCodeBillInDate(String codeBill);

    List<Bill> searchBillDaThanhToan(Integer idAccount, String codeBill);


}
