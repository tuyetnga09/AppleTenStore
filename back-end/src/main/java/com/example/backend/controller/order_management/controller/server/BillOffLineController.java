package com.example.backend.controller.order_management.controller.server;

import com.example.backend.controller.order_management.model.billOffLine.AddBillOffLineRequest;
import com.example.backend.controller.order_management.model.billOffLine.BillOffLineModel;
import com.example.backend.controller.order_management.model.billOffLine.ImeiDaBanOffLineRequest;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.model.billOffLine.ion.CheckImeiDaBanIonSellOffLine;
import com.example.backend.controller.order_management.model.billOffLine.ion.ImeiBillOffLineIonRespon;
import com.example.backend.controller.order_management.model.billOffLine.ion.ImeiDaBanOffLineIonRespon;
import com.example.backend.controller.order_management.model.billOffLine.ion.ListBillChoThanhToan;
import com.example.backend.controller.order_management.model.billOffLine.ion.ListBillChoThanhToanS2;
import com.example.backend.controller.order_management.model.billOffLine.ion.SkuBillOffLineIonRespon;
import com.example.backend.controller.order_management.service.BillOffLineService;
import com.example.backend.entity.Account;
import com.example.backend.entity.Bill;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.ImeiDaBan;
import com.example.backend.entity.SKU;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/admin/bill-offline")
public class BillOffLineController {
    @Autowired
    private BillOffLineService billOffLineService;

    @GetMapping("/create-bill")
    public ResponseEntity<BillOffLineModel> createBill(@RequestParam("idAccount") Integer idAccount) {
        BillOffLineModel billOffLineModel = billOffLineService.createBill(idAccount);
        return new ResponseEntity<>(billOffLineModel, HttpStatus.OK);
    }

    @GetMapping("/check-account")
    public ResponseEntity<Account> checkAccount(@RequestParam("idAccount") Integer idAccount) {
        Account account = billOffLineService.getAccount(idAccount);
        return new ResponseEntity<>(account, HttpStatus.OK);
    }

//    @GetMapping("/check-role-account")
//    public ResponseEntity<String> checkRolesAccount(@RequestParam("idAccount") Integer idAccount) {
//        String account = billOffLineService.checkRolesAccount(idAccount);
//        return new ResponseEntity<>(account, HttpStatus.OK);
//    }

    @PostMapping("/add-bill-detail")
    public ResponseEntity<BillDetails> addOrUpdateBillDetail(@RequestBody AddBillOffLineRequest addBillOffLineRequest) {
        BillDetails billDetailsList = billOffLineService.addBillDetail(addBillOffLineRequest);
        return new ResponseEntity<>(billDetailsList, HttpStatus.OK);
    }

    @GetMapping("/get-bill-detail")
    public ResponseEntity<List<BillDetailOffLineIon>> getBillDetailOfBill(@RequestParam("codeBill") String codeBill) {
        List<BillDetailOffLineIon> billDetailsList = billOffLineService.getBilDetailOfBill(codeBill);
        return new ResponseEntity<>(billDetailsList, HttpStatus.OK);
    }

    //lấy ra danh sách imei của sku được chọn
    @GetMapping("/get-imeis")
    public ResponseEntity<List<ImeiBillOffLineIonRespon>> getImeisOfSku(@RequestParam("idSKU") Long idSKU) {
        List<ImeiBillOffLineIonRespon> imeis = billOffLineService.getImeisOfSkuSellOffLine(idSKU);
        return new ResponseEntity<>(imeis, HttpStatus.OK);
    }

    //lấy ra sku được chọn
    @GetMapping("/get-sku")
    public ResponseEntity<SkuBillOffLineIonRespon> getOneSkuSelected(@RequestParam("idSKU") Long idSKU) {
        SkuBillOffLineIonRespon sku = billOffLineService.getOneSKU(idSKU);
        return new ResponseEntity<>(sku, HttpStatus.OK);
    }

    //lấy ra list imei đã bán của sku trong bill_detail được chọn
    @GetMapping("/get-imei-da-ban")
    public ResponseEntity<List<ImeiDaBanOffLineIonRespon>> getListImeiDaBanOfSku(@RequestParam("idBillDetail") Integer idBillDetail,
                                                                                 @RequestParam("idSKU") Long idSKU) {
        List<ImeiDaBanOffLineIonRespon> list = billOffLineService.getImeiDaBanOfSku(idBillDetail, idSKU);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //add imei vvào billDetail ( vào bảng imei_da_ban)
    @PostMapping("/add-imei-da-ban")
    public ResponseEntity<ImeiDaBan> addImeiDaBan(@RequestBody ImeiDaBanOffLineRequest imeiDaBanOffLineRequest) {
        ImeiDaBan imeiDaBan = billOffLineService.addImeiDaBanOffLine(imeiDaBanOffLineRequest);
        return new ResponseEntity<>(imeiDaBan, HttpStatus.OK);
    }

    //delete imei_da_ban -> đang chưa hoà lại status cho imei...
    @DeleteMapping("/delete-imei-da-ban")
    public ResponseEntity<Boolean> deleteImeiDaBan(@RequestParam("idImeiDaBan") Long idImeiDaBan,
                                                   @RequestParam("codeImeiDaBan") String codeImeiDaBan) {
        Boolean check = billOffLineService.deleteImeiDaBanOffLine(idImeiDaBan, codeImeiDaBan);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    // tìm imei thất lạc
    @GetMapping("/get-imei-that-lac")
    public ResponseEntity<List<CheckImeiDaBanIonSellOffLine>> getListImeiThatLac(@RequestParam("codeImei") String codeImei) {
        List<CheckImeiDaBanIonSellOffLine> list = billOffLineService.checkImeiThatLac(codeImei);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/get-bill-CTT/{codeBill}")
    public ResponseEntity<List<ListBillChoThanhToan>> getBillByCodeBy(@PathVariable("codeBill") String codeBill) {
        List<ListBillChoThanhToan> billList = billOffLineService.findBillByCodeBill(codeBill);
        return new ResponseEntity<>(billList, HttpStatus.OK);
    }

    @GetMapping("/get-bill-CTT-S2/{codeBill}")
    public ResponseEntity<ListBillChoThanhToanS2> getBillByCodeByS2(@PathVariable("codeBill") String codeBill) {
        ListBillChoThanhToanS2 billList = billOffLineService.findBillByCodeBillS2(codeBill);
        return new ResponseEntity<>(billList, HttpStatus.OK);
    }

    //seach Imei Da Ban
    @GetMapping("/get-seach-imei-da-ban")
    public ResponseEntity<List<ImeiDaBanOffLineIonRespon>> seachImeisDaBan(@RequestParam("idBillDetail") Integer idBillDetail,
                                                                  @RequestParam("idSKU") Long idSKU,
                                                                  @RequestParam("codeImei") String codeImei) {
        List<ImeiDaBanOffLineIonRespon> list = billOffLineService.seachImeiDaBan(idBillDetail, idSKU, codeImei);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //seach imei theo codeImei
    @GetMapping("/get-seach-imeis")
    public ResponseEntity<List<ImeiBillOffLineIonRespon>> seachImeis(@RequestParam("idSKU") Long idSKU,
                                                                      @RequestParam("codeImei") String codeImei) {
        List<ImeiBillOffLineIonRespon> list = billOffLineService.seachImeiFindByCodeImei(idSKU, codeImei);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //delete imei_da_ban - xoá danh sách imei đã bán được chọn (checkbox)
    @DeleteMapping("/delete-imeis-da-ban-check-box")
    public ResponseEntity<Boolean> deleteImeisDaBanOffLineCheckBox(@RequestParam("codeImeis") List<String> codeImeis) {
        Boolean check = billOffLineService.deleteImeisDaBanOffLineCheckBox(codeImeis);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    //delete imei_da_ban - xoá all imei đã bán  where idbillDetail
    @DeleteMapping("/delete-all-imeis-da-ban")
    public ResponseEntity<Boolean> deleteAllImeisDaBanOffLine(@RequestParam("idBillDetail") Integer idBillDetail) {
        Boolean check = billOffLineService.deleteAllImeisDaBanOffLine(idBillDetail);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    //all imei da ban cua bill_detail
    @GetMapping("/get-all-imeis-da-ban")
    public ResponseEntity<List<ImeiDaBanOffLineIonRespon>> getAllImeisDaBanOffLine(@RequestParam("idBillDetail") Integer idBillDetail) {
        List<ImeiDaBanOffLineIonRespon> list = billOffLineService.getAllImeisDaBanOffLine(idBillDetail);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //xoá bill_detail -> xoá các imei_da_ban trong bảng imei_da_ban của bill_detail đó và hoàn lại status các của các imei
    //chỉ xoá được các bill_detail của bill chưa hoàn thành
    @DeleteMapping("/delete-bill-detail")
    public ResponseEntity<Boolean> deleteBillOneDetail(@RequestParam("idBillDetail") Integer idBillDetail) {
        Boolean check = billOffLineService.deleteBillDetail(idBillDetail);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    @GetMapping("/searchBill-CTT")
    public ResponseEntity<List<Bill>> seachBillChoThanhToan(@RequestParam("idAccount") Integer idAccount,
                                                                           @RequestParam("codeBill") String codeBill) {
        List<Bill> list = billOffLineService.searchBillChoThanhToan(idAccount, codeBill);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/getBillCTT/{idAccount}")
    public List<Bill> getBillChoThanhToan(@PathVariable("idAccount") Integer idAccount){
        return billOffLineService.getListBillChoThanhToan(idAccount);
    }
}
