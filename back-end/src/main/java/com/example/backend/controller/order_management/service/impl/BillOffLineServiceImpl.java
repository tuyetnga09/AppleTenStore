package com.example.backend.controller.order_management.service.impl;

import com.example.backend.controller.order_management.model.billOffLine.AddBillOffLineRequest;
import com.example.backend.controller.order_management.model.billOffLine.BillOffLineModel;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.model.billOffLine.ion.ImeiBillOffLineIonRespon;
import com.example.backend.controller.order_management.model.billOffLine.ion.SkuBillOffLineIonRespon;
import com.example.backend.controller.order_management.service.BillOffLineService;
import com.example.backend.entity.Account;
import com.example.backend.entity.Bill;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.SKU;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.BillDetailRepository;
import com.example.backend.repository.BillRepository;
import com.example.backend.repository.ImeiRepository;
import com.example.backend.repository.SKURepositoty;
import com.example.backend.untils.Roles;
import com.example.backend.untils.StatusBill;
import com.example.backend.untils.TypeBill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

@Service
public class BillOffLineServiceImpl implements BillOffLineService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillDetailRepository billDetailRepository;

    @Autowired
    private SKURepositoty skuRepositoty;

    @Autowired
    private ImeiRepository imeiRepository;

    @Override
    public Account getAccount(Integer idAccount) {
        //idAccount truyền vào là null hoăck rỗng thì retunr null
        if (idAccount == null || idAccount.equals("")) {
            return null;
        }

        Account account = accountRepository.findById(idAccount).get();
        //account nếu lấy ra theo idAccount là null thì return null
        if (account == null) {
            return null;
        }
        return account;
    }

    @Override
    public String checkRolesAccount(Integer idAccount) {
        //check role account khi tạo hoá đơn
        Roles rolesCustmer = Roles.CUSTOMER;
        Roles rolesAdmin = Roles.ADMIN;
        Roles rolesNhanVien = Roles.NHAN_VIEN;

        //idAccount truyền vào là null hoăck rỗng thì retunr null

        Account account = accountRepository.findById(idAccount).get();
        //kiem tra roles cuar account
        if (account.getRoles() == rolesCustmer) {
            return "CUSTOMER";
        }
        if (account.getRoles() == rolesAdmin) {
            return "ADMIN";
        }
        if (account.getRoles() == rolesNhanVien) {
            return "NHAN_VIEN";
        }
        return null;
    }

    private String randomMaHoaDon() {
        //tạo code bill theo quy tắc (này hiện tại + mã ramdom VD: 20231025MHAVGGVJ)
        LocalDate now = LocalDate.now();
        // Định dạng theo "yyyyMMdd"
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
        String formattedDateNow = now.format(formatter);

        UUID uuid = UUID.randomUUID();
        String randomUUIDString = uuid.toString().replaceAll("-", "");
        String stringRandomCode = formattedDateNow + randomUUIDString;
        String truncatedString = stringRandomCode.toUpperCase(Locale.ROOT).substring(0, 20);
        Bill bill = billRepository.newBillOfNow();
        String codeBill = "";
        //nếu trong ngày đó chưa có bill nào thì mã bill được random +1
        if (bill == null) {
            codeBill = truncatedString + "1";
        } else {
            //nếu trong ngày đó có bill rồi thì lấy mã bill random + với id hoá đơn tạo mới nhất + thêm 1
            codeBill = truncatedString + (bill.getId() + 1);
        }
        return codeBill;
    }

    @Override
    public BillOffLineModel createBill(Integer idAccount) {


        //idAccount truyền vào là null hoăck rỗng thì retunr null
        if (idAccount == null || idAccount.equals("")) {
            return null;
        }

        Account account = accountRepository.findById(idAccount).get();
        //account nếu lấy ra theo idAccount là null thì return null
        if (account == null) {
            return null;
        }


        Bill bill = new Bill();
        bill.setAccount(account);

//        //tạo code bill theo quy tắc (này hiện tại + mã ramdom VD: 20231025MHAVGGVJ)
        LocalDate now = LocalDate.now();
//        // Định dạng theo "yyyyMMdd"
//        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMdd");
//        String formattedDateNow = now.format(formatter);
//
//        UUID uuid = UUID.randomUUID();
//        String randomUUIDString = uuid.toString().replaceAll("-", "");
//        String codeBill = formattedDateNow + randomUUIDString;
        String codeBill = this.randomMaHoaDon();

        bill.setCode(codeBill);

        // tạm thời để người tạo là id account -> sau này chuyển thành mã account
        bill.setPersonCreate(idAccount.toString());

        //ngày tạo bill
        bill.setDateCreate(now);

        //trạng thái bill khi tạo là "CHO_XAC_NHAN"
        StatusBill statusBill = StatusBill.CHO_XAC_NHAN;
        bill.setStatusBill(statusBill);
        //kiểu bill bán offline
        TypeBill typeBill = TypeBill.OFFLINE;
        bill.setTypeBill(typeBill);

        billRepository.save(bill);

//        System.out.println(bill.getId() + " jhihihihi ------------");
        BillOffLineModel billOffLineModel = new BillOffLineModel();
        billOffLineModel.setIdBill(bill.getId());
        billOffLineModel.setCodeBill(bill.getCode());
        billOffLineModel.setCodeAccount(bill.getAccount().getEmail());

        return billOffLineModel;
    }

    @Override
    public BillDetails addBillDetail(AddBillOffLineRequest addBillOffLineRequest) {
        //TH1: chưa có bill thì retunr null để báo ra tạo bill
        //lấy ra bill theo codeBill truyền vào
        Bill bill = billRepository.findByCode(addBillOffLineRequest.getCodeBill()).get();

        //lấy ra thông tin account thêm sp vào
        Account account = accountRepository.findById(addBillOffLineRequest.getIdAccount()).get();

        //TH2: có bill rồi và chưa có sku thì cứ thêm vào sku đó vào bill_detail
        //kiểm tra bill xem có bill_detail noà chưa

        if (bill != null) { //bill khác null ( bill có giá trị)
            //TH2-1: có bill rồi và bill_detail rỗng
            List<BillDetails> billDetailsList = billDetailRepository.findByBillDetailOfIdBill(bill.getId());
            System.out.println(billDetailsList.size() + " ------------------------ billDetailsList.size()");

            SKU skuAddBillDetail = skuRepositoty.findById(addBillOffLineRequest.getIdSKU()).get();
            System.out.println(skuAddBillDetail.toString() + " ------------------------ code bill");
            // ngày hiện tại
            Date newDate = new Date();
            if (billDetailsList.size() == 0) {
                // tạo bill_detail mới
                BillDetails billDetail = new BillDetails();
                billDetail.setBill(bill);
//                billDetail.setProduct(skuAddBillDetail.getProduct());
                billDetail.setPrice(addBillOffLineRequest.getPrice());
                billDetail.setQuantity(addBillOffLineRequest.getQuantity());

                billDetail.setDateCreate(newDate);
                //billDetail.setDateUpdate(); chưa có cập nhật lại nên là null
                billDetail.setSku(skuAddBillDetail);
                // tạm thời lấy email account vào -> sau này truyền vào đây là code Account
                billDetail.setPersonCreate(account.getEmail());
                //billDetail.setPersonUpdate(); chưa có cập nhật lại nên là null
                StatusBill statusBill = StatusBill.CHO_XAC_NHAN;
                billDetail.setStatusBill(statusBill);
                return billDetailRepository.save(billDetail);
            } else {
                //TH2-2: có bill rồi và bill_detail có dữ liệu
                // kiểm tra xem đã có skuAddBillDetail trong bill_detal nào chưa
                Boolean checkSkuOfBillDetail = billDetailsList.stream()
                        .anyMatch(billDetail -> billDetail.getSku().getId() == skuAddBillDetail.getId());

                if (!checkSkuOfBillDetail) {
                    ////TH2-2-1: nếu checkSkuOfBillDetail == false có nghĩa là chưa có sku đó trong bill_detail
                    //-> add thẳng vào bill_detail mà không cần check nữa
                    // tạo bill_detail mới
                    BillDetails billDetail = new BillDetails();
                    billDetail.setBill(bill);
//                    billDetail.setProduct(skuAddBillDetail.getProduct());
                    billDetail.setPrice(addBillOffLineRequest.getPrice());
                    billDetail.setQuantity(addBillOffLineRequest.getQuantity()); // xem lại phần này ở FE xem thử quntity này là như nào

                    billDetail.setDateCreate(newDate);
                    //billDetail.setDateUpdate(); chưa có cập nhật lại nên là null
                    billDetail.setSku(skuAddBillDetail);
                    // tạm thời lấy email account vào -> sau này truyền vào đây là code Account
                    billDetail.setPersonCreate(account.getEmail());
                    //billDetail.setPersonUpdate(); chưa có cập nhật lại nên là null
                    StatusBill statusBill = StatusBill.CHO_XAC_NHAN;
                    billDetail.setStatusBill(statusBill);
                    return billDetailRepository.save(billDetail);

                } else {
                    ////TH2-2-2: nếu checkSkuOfBillDetail == true có nghĩa là đã có sku trong bill_detal rồi
                    // -> chỉ cần update số lượng bill_detail có sku đó là được

                    BillDetails billDetailUpdate = null;
                    for (BillDetails billDetail : billDetailsList) {
                        if (billDetail.getSku().getId() == addBillOffLineRequest.getIdSKU()) {
                            billDetailUpdate = billDetail;
                        }
                    }

                    //cập nhật số lượng
                    Integer quantityUpdate = billDetailUpdate.getQuantity() + addBillOffLineRequest.getQuantity();
                    billDetailUpdate.setQuantity(quantityUpdate);

//                    //tính tiền khi update số lượng sp sku
//                    BigDecimal priceUpdate = addBillOffLineRequest.getPrice().multiply(BigDecimal.valueOf(quantityUpdate));
//                    billDetailUpdate.setPrice(priceUpdate);

                    // cập nhật giờ update
                    billDetailUpdate.setDateUpdate(newDate);

                    // người cập nhật
                    billDetailUpdate.setPersonUpdate(account.getEmail());
                    return billDetailRepository.save(billDetailUpdate);
                }
            }
        }

        //bill == null return null luôn
        return null;

    }

    //lấy ra list bill_detail của 1 bill
    @Override
    public List<BillDetailOffLineIon> getBilDetailOfBill(String codeBill) {
        Bill bill = billRepository.findByCode(codeBill).get();
//        List<BillDetails> billDetailsList = billDetailRepository.findByBillDetailOfIdBill(bill.getId());
        List<BillDetailOffLineIon> billDetailsList = billDetailRepository.findByBillDetailOffLineIdBill(bill.getId());
        return billDetailsList;
    }

    //lấy ra list imei của 1 sku được chọn khi ấn thêm imei ở màn hình bán offline
    @Override
    public List<ImeiBillOffLineIonRespon> getImeisOfSkuSellOffLine(Long idSku) {
        List<ImeiBillOffLineIonRespon> imeis = imeiRepository.imeisSellOffLine(idSku);
        return imeis;
    }

    @Override
    public SkuBillOffLineIonRespon getOneSKU(Long idSKU) {
        SkuBillOffLineIonRespon sku = skuRepositoty.getOneSkuSellOffLine(idSKU);
        return sku;
    }

}
