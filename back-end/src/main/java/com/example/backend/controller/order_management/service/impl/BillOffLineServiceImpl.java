package com.example.backend.controller.order_management.service.impl;

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
import com.example.backend.entity.Bill;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.Customer;
import com.example.backend.entity.Imei;
import com.example.backend.entity.ImeiDaBan;
import com.example.backend.entity.SKU;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.BillDetailRepository;
import com.example.backend.repository.BillRepository;
import com.example.backend.repository.CustomerRepository;
import com.example.backend.repository.ImeiDaBanRepository;
import com.example.backend.repository.ImeiRepository;
import com.example.backend.repository.SKURepositoty;
import com.example.backend.untils.Roles;
import com.example.backend.untils.StatusBill;
import com.example.backend.untils.TypeBill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
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

    @Autowired
    private ImeiDaBanRepository imeiDaBanRepository;

    @Autowired
    private CustomerRepository customerRepository;

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
        String stringRandomCode = formattedDateNow +"MPH"+ randomUUIDString;
        String truncatedString = stringRandomCode.toUpperCase(Locale.ROOT).substring(0, 20);
        Bill bill = billRepository.newBillOfNow();
        String codeBill = "";
        //nếu trong ngày đó chưa có bill nào thì mã bill được random +1
        if (bill == null) {
            codeBill = truncatedString + "HD" + "1";
        } else {
            //nếu trong ngày đó có bill rồi thì lấy mã bill random + với id hoá đơn tạo mới nhất + thêm 1
            String inputString = bill.getCode();
            // Sử dụng phương thức lastIndexOf để tìm vị trí cuối cùng của chữ 'D'
            int lastIndex = inputString.lastIndexOf("D");
            String targetString = inputString.substring(lastIndex + 1);
            Integer identityCodeBill = Integer.valueOf(targetString);
            codeBill = truncatedString + "HD" + (identityCodeBill + 1);
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
        bill.setPersonCreate(account.getCode() + " - " + account.getUser().getFullName());

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
        billOffLineModel.setCodeAccount(bill.getAccount().getCode() + " - " + bill.getAccount().getUser().getFullName());

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
                billDetail.setPersonCreate(account.getCode() + " - " + account.getUser().getFullName());
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

    //lấy ra list bill_detail của 1 billbill theo codeBill
    @Override
    public List<BillDetailOffLineIon> getBilDetailOfBill(String codeBill) {
        Bill bill = billRepository.findByCode(codeBill).get();
//        List<BillDetails> billDetailsList = billDetailRepository.findByBillDetailOfIdBill(bill.getId());
        List<BillDetailOffLineIon> billDetailsList = billDetailRepository.findByBillDetailOffLineIdBill(bill.getId());
        return billDetailsList;
    }
    //lấy ra list bill_detail của 1 bill theo id_bill
    @Override
    public List<BillDetailOffLineIon> getBilDetailOfBillWhereIdBill(Integer idBill) {
        List<BillDetailOffLineIon> billDetailsList = billDetailRepository.findByBillDetailOffLineIdBill(idBill);
        return billDetailsList;
    }

    //lấy ra list imei của 1 sku được chọn khi ấn thêm imei ở màn hình bán offline
    @Override
    public List<ImeiBillOffLineIonRespon> getImeisOfSkuSellOffLine(Long idSku) {
        List<ImeiBillOffLineIonRespon> imeis = imeiRepository.imeisSellOffLine(idSku);
        return imeis;
    }

    //lấy ra thông tin sku được chọn
    @Override
    public SkuBillOffLineIonRespon getOneSKU(Long idSKU) {
        SkuBillOffLineIonRespon sku = skuRepositoty.getOneSkuSellOffLine(idSKU);
        return sku;
    }

    //lấy ra list imei đã bán của sku trong bill_detail được chọn
    @Override
    public List<ImeiDaBanOffLineIonRespon> getImeiDaBanOfSku(Integer idBillDetail, Long idSku) {
        List<ImeiDaBanOffLineIonRespon> list = imeiDaBanRepository.imeisDaBanSellOffLine(idBillDetail, idSku);
        return list;
    }

    //add imei vvào billDetail ( vào bảng imei_da_ban)
    @Override
    public ImeiDaBan addImeiDaBanOffLine(ImeiDaBanOffLineRequest imeiDaBanOffLineRequest) {
        //kiểm tra xem imei thêm vào imei_da_ban đã có trong bill detail nào chưa, có rồi retunr null
        ImeiDaBan checkImeiDaBan = imeiDaBanRepository.findByCodeImei(imeiDaBanOffLineRequest.getCodeImei());
        if (checkImeiDaBan != null) {
            return null;
        }
        BillDetails billDetails = billDetailRepository.findById(imeiDaBanOffLineRequest.getIdBillDetail()).get();
        ImeiDaBan imeiDaBan = new ImeiDaBan();
        imeiDaBan.setCodeImei(imeiDaBanOffLineRequest.getCodeImei());
        imeiDaBan.setBillDetail(billDetails);
        imeiDaBan.setPersonSell(imeiDaBanOffLineRequest.getCodeAccount());
        LocalDate now = LocalDate.now();
        imeiDaBan.setDateSell(now);
        imeiDaBan.setStatus(2); // 2 - imei đang trong giỏ hàng

        //cập nhật lại imei trong bảng imei có status = 3 (3 là nằm trong giỏ hàng)
        Imei imeiUpdate = imeiRepository.findByCodeImei(imeiDaBanOffLineRequest.getCodeImei());
        imeiUpdate.setStatus(2);
        imeiRepository.save(imeiUpdate);

        return imeiDaBanRepository.save(imeiDaBan);
    }

    //delete imei_da_ban - xoá từng cái
    @Override
    public Boolean deleteImeiDaBanOffLine(Long idImeiDaban, String codeImeiDaBan) {
        Boolean isCheck = imeiDaBanRepository.existsById(idImeiDaban);
        if (isCheck) {
            //xoá imei ở trong bảng imei đã bán
            imeiDaBanRepository.deleteById(idImeiDaban);

            //cập nhật lại imei trong bảng imei -> status = 0 (0 là hoạt động)
            Imei imeiUpdate = imeiRepository.findByCodeImei(codeImeiDaBan);
            imeiUpdate.setStatus(0);
            imeiRepository.save(imeiUpdate);
            return true;
        }
        return false;
    }

    //seach imei thất lạc
    public List<CheckImeiDaBanIonSellOffLine> checkImeiThatLac(String codeImei) {
        if (codeImei.trim().equals("")) {
            return null;
        }
        List<CheckImeiDaBanIonSellOffLine> list = imeiDaBanRepository.checkImeiDaBan(codeImei);
        return list;
    }

    @Override
    public List<ListBillChoThanhToan> findBillByCodeBill(String codeBill) {
        return billDetailRepository.findBillbyCodeBill(codeBill);
    }

    @Override
    public ListBillChoThanhToanS2 findBillByCodeBillS2(String codeBill) {
        return billDetailRepository.findBillbyCodeBillS2(codeBill);
    }

    @Override
    public void thanhToan(DoneBill doneBill) {
        Customer customer = customerRepository.findById(doneBill.getIdCustomer()).get();
        Bill bill = billRepository.findById(doneBill.getIdBill()).orElse(null);
        bill.setDateUpdate(LocalDate.now());
        bill.setMoneyShip(doneBill.getMoneyShip());
        bill.setTotalMoney(doneBill.getTotalMoney());
        bill.setAddress(doneBill.getAddress());
        bill.setNote(doneBill.getNote());
        bill.setPersonUpdate(doneBill.getPersonUpdate());
        bill.setPhoneNumber(customer.getPhoneNumber());
        bill.setUserName(customer.getFullName());
        bill.setStatusBill(StatusBill.DA_THANH_TOAN);
        bill.setCustomer(customer);
        billRepository.save(bill);
        List<BillDetails> billDetails = billDetailRepository.findByBillDetailOfIdBill(doneBill.getIdBill());
        for (BillDetails bd : billDetails
             ) {
            bd.setStatusBill(StatusBill.DA_THANH_TOAN);
            bd.setPersonUpdate(doneBill.getPersonUpdate());
            bd.setDateUpdate(new Date());
            billDetailRepository.save(bd);
        }
        for (String codeImei : doneBill.getCodeImeiDaBan()
             ) {
            ImeiDaBan imeiDaBan = imeiDaBanRepository.findByCodeImei(codeImei);
            imeiDaBan.setStatus(3);
            imeiDaBanRepository.save(imeiDaBan);
            Imei imei = imeiRepository.findByCodeImei(codeImei);
            imei.setStatus(3);
            imei.setPersonSale(doneBill.getPersonUpdate());
            imei.setSaleDate(new Date());
            imeiRepository.save(imei);
        }
        for (Long idSku : doneBill.getIdSku()
             ) {
            skuRepositoty.updateQuantity(idSku, skuRepositoty.quantitySkuInBillDetails(idSku, doneBill.getIdBill()));
        }
    }

    //seach code imei đã bán trong bảng imei đã bán
    @Override
    public List<ImeiDaBanOffLineIonRespon> seachImeiDaBan(Integer idBillDetail, Long idSku, String codeImei) {
        if (codeImei.trim().equals("")) {
            return null;
        } else {
            List<ImeiDaBanOffLineIonRespon> list =
                    imeiDaBanRepository.seachImeiDaBanFindByCodeImei(idBillDetail, idSku, codeImei);
            return list;
        }
    }

    //seach imei theo codeImei
    @Override
    public List<ImeiBillOffLineIonRespon> seachImeiFindByCodeImei(Long idSku, String codeImei) {
        if (codeImei.trim().equals("")) {
            return null;
        } else {
            List<ImeiBillOffLineIonRespon> list = imeiRepository.seachImeiFindByCodeImei(idSku, codeImei);
            return list;
        }
    }

    //delete imei_da_ban - xoá danh sách imei đã bán được chọn (checkbox)
    @Override
    public Boolean deleteImeisDaBanOffLineCheckBox(List<String> codeImeis) {
        if (codeImeis.size() > 0) {
            for (String codeImei : codeImeis) {
                ImeiDaBan imeiDaBan = imeiDaBanRepository.findByCodeImei(codeImei);
                //xoá imei ở trong bảng imei đã bán
                imeiDaBanRepository.deleteById(imeiDaBan.getId());

                //cập nhật lại imei trong bảng imei -> status = 0 (0 là hoạt động)
                Imei imeiUpdate = imeiRepository.findByCodeImei(codeImei);
                imeiUpdate.setStatus(0);
                imeiRepository.save(imeiUpdate);
            }
            return true;
        }
        return false;
    }

    //delete imei_da_ban - xoá all imei đã bán  where idbillDetail
    @Override
    public Boolean deleteAllImeisDaBanOffLine(Integer idBillDetail) {
        List<ImeiDaBanOffLineIonRespon> listImei = imeiDaBanRepository.listAllImeiDaBanWhereIdBillDetail(idBillDetail);
        if (listImei.size() > 0) {
            for (ImeiDaBanOffLineIonRespon imei : listImei) {
                //xoá imei ở trong bảng imei đã bán
                imeiDaBanRepository.deleteById(imei.getIdImeiDaBan());

                //cập nhật lại imei trong bảng imei -> status = 0 (0 là hoạt động)
                Imei imeiUpdate = imeiRepository.findByCodeImei(imei.getCodeImeiDaBan());
                imeiUpdate.setStatus(0);
                imeiRepository.save(imeiUpdate);
            }
            return true;
        }
        return false;
    }


    //get imei_da_ban - get all imei đã bán  where idbillDetail
    @Override
    public List<ImeiDaBanOffLineIonRespon> getAllImeisDaBanOffLine(Integer idBillDetail) {
        List<ImeiDaBanOffLineIonRespon> listImei = imeiDaBanRepository.listAllImeiDaBanWhereIdBillDetail(idBillDetail);
        return listImei;
    }

    //xoá bill_detail -> xoá các imei_da_ban trong bảng imei_da_ban của bill_detail đó và hoàn lại status các của các imei
    //chỉ xoá được các bill_detail của bill chưa hoàn thành
    @Override
    public Boolean deleteBillDetail(Integer idBillDetail) {
        Boolean isCheck = billDetailRepository.existsById(idBillDetail);
        if (!isCheck) {
            return false;
        }
        BillDetails billDetail = billDetailRepository.findById(idBillDetail).get(); // đối tượng bill detail
        //list imei_da_ban
        List<ImeiDaBanOffLineIonRespon> listImei = imeiDaBanRepository.listAllImeiDaBanWhereIdBillDetail(idBillDetail);
        Integer size = listImei.size();


        if (billDetail.getBill().getStatusBill() == StatusBill.CHO_XAC_NHAN
                && billDetail.getBill().getTypeBill() == TypeBill.OFFLINE && size>0) {
            Boolean deleteImei = this.deleteAllImeisDaBanOffLine(billDetail.getId());
            if (deleteImei) {
                billDetailRepository.deleteById(billDetail.getId());
                return true;
            }
        }else {
//            billDetailRepository.deleteById(billDetail.getId());
            return false;
        }
        return false;
    }

    @Override
    public List<Bill> searchBillChoThanhToan(Integer idAccount, String codeBill) {
        return billRepository.searchBillChoThanhToan(idAccount,codeBill);
    }

    @Override
    public List<Bill> getListBillChoThanhToan() {
        return billRepository.listBillChoThanhToan();
    }

    //lấy ra 1  id_bill theo idBillDetail
    public Integer getIdBill(Integer idBillDetail){
        BillDetails billDetail = billDetailRepository.findById(idBillDetail).get();
        Integer idBill = billDetail.getBill().getId();
        return idBill;
    }

    @Override
    public List<Bill> billInDate() {
        return billRepository.billInDate();
    }

    @Override
    public List<ListBillChoThanhToan> findBillByCodeBillInDate(String codeBill) {
        return billDetailRepository.findBillbyCodeBillInDate(codeBill);
    }

    @Override
    public List<Bill> searchBillDaThanhToan(Integer idAccount, String codeBill) {
        return billRepository.searchBillDaThanhToan(idAccount,codeBill);
    }
}
