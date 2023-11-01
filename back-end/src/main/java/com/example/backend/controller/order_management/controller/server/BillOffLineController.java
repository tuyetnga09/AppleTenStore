package com.example.backend.controller.order_management.controller.server;

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
import com.example.backend.controller.order_management.service.BillOffLineService;
import com.example.backend.entity.Account;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.ImeiDaBan;
import com.example.backend.entity.SKU;
import com.example.backend.repository.ImeiDaBanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
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

    @Autowired
    private ImeiDaBanRepository imeiDaBanRepository;

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
    public ResponseEntity<List<ImeiDaBanOffLineIonRespon>> getListImeiDaBanOfSku(@RequestParam("idBillDetail") Integer idBillDetail ,
                                                                             @RequestParam("idSKU") Long idSKU) {
        List<ImeiDaBanOffLineIonRespon> list = billOffLineService.getImeiDaBanOfSku(idBillDetail, idSKU);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //add imei vvào billDetail ( vào bảng imei_da_ban)
    @PostMapping("/add-imei-da-ban")
    public ResponseEntity<ImeiDaBan> addImeiDaBan(@RequestBody ImeiDaBanOffLineRequest imeiDaBanOffLineRequest) {
        ImeiDaBan  imeiDaBan= billOffLineService.addImeiDaBanOffLine(imeiDaBanOffLineRequest);
        return new ResponseEntity<>(imeiDaBan, HttpStatus.OK);
    }

    //delete imei_da_ban -> đang chưa hoà lại status cho imei...
    @DeleteMapping("/delete-imei-da-ban")
    public ResponseEntity<Boolean> deleteImeiDaBan(@RequestParam("idImeiDaBan") Long idImeiDaBan ) {
        Boolean check = billOffLineService.deleteImeiDaBanOffLine(idImeiDaBan);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    // tìm imei thất lạc
    @GetMapping("/get-imei-that-lac")
    public ResponseEntity<List<CheckImeiDaBanIonSellOffLine>> getListImeiThatLac(@RequestParam("codeImei") String codeImei ) {
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

    @PutMapping("/done-bill")
    public void doneBill(@RequestBody DoneBill doneBill){
        billOffLineService.thanhToan(doneBill);
    }

    @GetMapping("/get-code-imei-da-ban")
    public List<ImeiDaBan> getListImeiDaBanByIdBillDetaill(@RequestParam("idBillDetail") Integer idBillDetail){
        return imeiDaBanRepository.findImeiDaBanByBillDetail_Id(idBillDetail);
    }
}
