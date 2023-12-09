package com.example.backend.controller.order_management.service.impl;

import com.example.backend.controller.order_management.model.bill.request.BillAskClient;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOffline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnlineAccount;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.model.billOnline.response.BillPayDone;
import com.example.backend.controller.order_management.model.dto.AcceptReturn;
import com.example.backend.controller.order_management.service.BillService;
import com.example.backend.entity.*;
import com.example.backend.repository.*;
import com.example.backend.untils.*;
import com.example.backend.untils.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BillServiceImpl implements BillService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AccountRepository acountRepository;
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private BillRepository billRepository;
    @Autowired
    private BillHistoryRepository billHistoryRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private BillDetailRepository billDetailRepository;
    @Autowired
    private PaymentsRepository paymentsRepository;
    @Autowired
    private SKURepositoty skuRepositoty;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private VoucherDetailRepository voucherDetailRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ImeiDaBanRepository imeiDaBanRepository;

    @Autowired
    private ImeiRepository imeiRepository;

    // CLIENT
    @Override
    public Bill createBillCustomerOnlineRequest(BillRequestOnline request) {
        BigDecimal value1 = new BigDecimal(String.valueOf(request.getItemDiscount()));
        BigDecimal value2 = new BigDecimal(String.valueOf(request.getItemDiscountFreeShip()));

        Customer customer = Customer.builder()
                .fullName(request.getUserName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail()).build();
        customerRepository.save(customer);
        // tạo người dùng
//        User user = User.builder()
//                .fullName(request.getUserName())
//                .phoneNumber(request.getPhoneNumber())
//                .email(request.getEmail())
//                .status(Status.DANG_SU_DUNG)
//                .dateCreate(new Date(new java.util.Date().getTime()))
//                .points(0).build();
//        userRepository.save(user);
//        // account khách hàng
//        Account account = Account.builder()
//                .user(user)
//                .email(request.getEmail())
//                .status(Status.DANG_SU_DUNG)
//                .dateCreate(new Date(new java.util.Date().getTime()))
//                .password(new Random().randomPassword())
//                // sau cho them roles vao day nua
//                .build();
//        acountRepository.save(account);

//        // địa chỉ giao hàng của khách hàng mua hàng
//        Address address = Address.builder()
//                .status(Status.DANG_SU_DUNG)
//                .user(user)
//                .address(request.getAddress())
//                .quanHuyen(request.getDistrict())
//                .tinhThanhPho(request.getProvince())
//                .dateCreate(new Date(new java.util.Date().getTime()))
//                .xaPhuong(request.getWards()).build();
//        addressRepository.save(address);

        // thông tin hoá đơn
        Bill bill = Bill.builder()
                .code(request.getCode())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress() + '-' + request.getWards() + '-' + request.getDistrict() + '-' + request.getProvince())
                .userName(request.getUserName())
                .moneyShip(request.getMoneyShip())
                .itemDiscount(value1.add(value2))
                .totalMoney(request.getAfterPrice())
                .dateCreate(LocalDate.now())
                .typeBill(TypeBill.ONLINE)
                .statusBill(StatusBill.CHO_XAC_NHAN)
                .dateCreate(LocalDate.now())
//                .account(account).
        .customer(customer).
                build();
        billRepository.save(bill);

        // lịch sử thông tin hoá đơn
        BillHistory billHistory = BillHistory.builder()
                .bill(bill)
                .statusBill(StatusBill.CHO_XAC_NHAN)
                .dateCreate(new Date(new java.util.Date().getTime()))
                .actionDescription(request.getPaymentMethod().equals("OFFLINE") ? "Chờ thanh toán" : "Đã thanh toán").build();
        billHistoryRepository.save(billHistory);

        for (BillAskClient x : request.getBillDetail()) {
//            if (productDetail.getQuantity() < x.getQuantity()) {
//                throw new RestAPIRunTime(Message.ERROR_QUANTITY);
//            }
//            if (productDetail.getStatus() != Status.DANG_SU_DUNG) {
//                throw new RestAPIRunTime(Message.NOT_PAYMENT_PRODUCT);
//            }
            BillDetails billDetail = BillDetails.builder()
                    .statusBill(StatusBill.CHO_XAC_NHAN)
                    .sku(skuRepositoty.findById(x.getSku()).get())
                    .price(x.getPrice())
                    .quantity(x.getQuantity())
                    .dateCreate(new Date(new java.util.Date().getTime()))
                    .bill(bill).build();
            billDetailRepository.save(billDetail);
            skuRepositoty.updateQuantity(x.getSku(), x.getQuantity());
        }

        // hình thức thanh toán của hoá đơn
        Payments payments = Payments.builder()
                .method(request.getPaymentMethod().equals("TIEN_MAT") ? TypePayment.TIEN_MAT : TypePayment.CHUYEN_KHOAN)
                .bill(bill)
                .moneyPayment(request.getTotalMoney())
                .dateCreate(new Date(new java.util.Date().getTime()))
                .typePayment(StatusPayment.THANH_TOAN).build();
        paymentsRepository.save(payments);

//        // thông tin voucher
//        Optional<Voucher> optionalVoucher = voucherRepository.findById(request.getIdVoucher());
//        if (optionalVoucher.isPresent()) {
//            Voucher voucher = optionalVoucher.get();
//
//            VoucherDetail voucherDetail = VoucherDetail.builder()
//                    .voucher(voucher)
//                    .bill(bill)
//                    .beforePrice(request.getTotalMoney())
//                    .afterPrice(request.getAfterPrice())
//                    .discountPrice(request.getItemDiscount())
//                    .build();
//            voucherDetailRepository.save(voucherDetail);
//        } else {
//            return null;
//        }
//        // thông tin voucher freeship
//        Optional<Voucher> optionalVoucherFreeShip = voucherRepository.findById(request.getIdVoucherFreeShip());
//        if (optionalVoucherFreeShip.isPresent()) {
//            Voucher voucher = optionalVoucherFreeShip.get();
//
//            VoucherDetail voucherDetail = VoucherDetail.builder()
//                    .voucher(voucher)
//                    .bill(bill)
//                    .beforePrice(request.getTotalMoney())
//                    .afterPrice(request.getAfterPrice())
//                    .discountPrice(request.getItemDiscountFreeShip())
//                    .build();
//            voucherDetailRepository.save(voucherDetail);
//        } else {
//            return null;
//        }
        if(request.getIdVoucher() != null){
            Voucher voucher = voucherRepository.findById(request.getIdVoucher()).get();

            VoucherDetail voucherDetail = VoucherDetail.builder()
                    .voucher(voucher)
                    .bill(bill)
                    .beforePrice(request.getTotalMoney())
                    .afterPrice(request.getAfterPrice())
                    .discountPrice(request.getItemDiscount())
                    .build();
            voucherDetailRepository.save(voucherDetail);
        }
        //lấy thoong tin voucher freeship
        if(request.getIdVoucherFreeShip() != null){
            Voucher voucher = voucherRepository.findById(request.getIdVoucherFreeShip()).get();

            VoucherDetail voucherDetail = VoucherDetail.builder()
                    .voucher(voucher)
                    .bill(bill)
                    .beforePrice(request.getTotalMoney())
                    .afterPrice(request.getAfterPrice())
                    .discountPrice(request.getItemDiscountFreeShip())
                    .build();
            voucherDetailRepository.save(voucherDetail);
        }
        //trừ số lượng voucher - voucher freeship
        if(request.getIdVoucher() != null){
            Voucher voucher = voucherRepository.getOne(request.getIdVoucher());
            voucher.setQuantity(voucher.getQuantity() - 1);
            voucherRepository.save(voucher);
        }
        if(request.getIdVoucherFreeShip() != null) {
            Voucher voucherFreeShip = voucherRepository.getOne(request.getIdVoucherFreeShip());
            voucherFreeShip.setQuantity(voucherFreeShip.getQuantity() - 1);
            voucherRepository.save(voucherFreeShip);
        }

        return bill;

    }

    @Override
    public Bill createBillAccountOnlineRequest(BillRequestOnlineAccount request) {
        Optional<Account> accountOptional = acountRepository.findById(request.getAccount());
        BigDecimal value1 = new BigDecimal(String.valueOf(request.getItemDiscount()));
        BigDecimal value2 = new BigDecimal(String.valueOf(request.getItemDiscountFreeShip()));
        BigDecimal value3 = new BigDecimal(String.valueOf(request.getPoint()));

        if (accountOptional.isPresent()) {
            Account account = accountOptional.get();
            Bill bill = Bill.builder()
                    .code(request.getCode())
                    .phoneNumber(request.getPhoneNumber())
                    .address(request.getAddress())
                    .userName(request.getUserName())
                    .moneyShip(request.getMoneyShip())
                    .itemDiscount(value1.add(value2).add(value3))
                    .totalMoney(request.getAfterPrice())
                    .typeBill(TypeBill.ONLINE)
                    .statusBill(StatusBill.CHO_XAC_NHAN)
                    .dateCreate(LocalDate.now())
                    .account(account)
                    .numberOfPointsUsed(request.getPoint())
                    .pointConversionAmount(request.getPointConversionAmount())
                    .build();
            billRepository.save(bill);

            BillHistory billHistory = BillHistory.builder()
                    .bill(bill)
                    .statusBill(StatusBill.CHO_XAC_NHAN)
                    .actionDescription("Đã thanh toán").build();
            billHistoryRepository.save(billHistory);

            for (BillAskClient d : request.getBillDetail()) {
                BillDetails billDetail = BillDetails.builder()
                        .statusBill(StatusBill.CHO_XAC_NHAN)
                        .sku(skuRepositoty.findById(d.getSku()).orElse(null))
                        .price(d.getPrice())
                        .quantity(d.getQuantity())
                        .bill(bill).build();
                billDetailRepository.save(billDetail);
                skuRepositoty.updateQuantity(d.getSku(), d.getQuantity());
                cartDetailRepository.deleteByIdSku(d.getSku(), request.getAccount());
            }

            Payments payments = Payments.builder()
                    .method(request.getPaymentMethod().equals("TIEN_MAT") ? TypePayment.TIEN_MAT : TypePayment.CHUYEN_KHOAN)
                    .bill(bill)
                    .moneyPayment(request.getTotalMoney())
                    .typePayment(StatusPayment.THANH_TOAN).build();
            paymentsRepository.save(payments);

            if(request.getIdVoucher() != null){
                Voucher voucher = voucherRepository.findById(request.getIdVoucher()).get();

                VoucherDetail voucherDetail = VoucherDetail.builder()
                        .voucher(voucher)
                        .bill(bill)
                        .beforePrice(request.getTotalMoney())
                        .afterPrice(request.getAfterPrice())
                        .discountPrice(request.getItemDiscount())
                        .build();
                voucherDetailRepository.save(voucherDetail);
            }
            //lấy thoong tin voucher freeship
            if(request.getIdVoucherFreeShip() != null){
                Voucher voucher = voucherRepository.findById(request.getIdVoucherFreeShip()).get();

                VoucherDetail voucherDetail = VoucherDetail.builder()
                        .voucher(voucher)
                        .bill(bill)
                        .beforePrice(request.getTotalMoney())
                        .afterPrice(request.getAfterPrice())
                        .discountPrice(request.getItemDiscountFreeShip())
                        .build();
                voucherDetailRepository.save(voucherDetail);
            }

            Cart cart = cartRepository.getCartByAccount_Id(request.getAccount());
            for (BillAskClient x : request.getBillDetail()) {
                List<CartDetail> cartDetail = cartDetailRepository.getCartDetailByCart_IdAndSku_Id(cart.getId(), x.getSku());
                cartDetail.forEach(detail -> cartDetailRepository.deleteById(detail.getId()));
            }

            //trừ só lương voucher
            if(request.getIdVoucher() != null){
                Voucher voucher = voucherRepository.getOne(request.getIdVoucher());
                voucher.setQuantity(voucher.getQuantity() - 1);
                voucherRepository.save(voucher);
            }
            if(request.getIdVoucherFreeShip() != null) {
                Voucher voucherFreeShip = voucherRepository.getOne(request.getIdVoucherFreeShip());
                voucherFreeShip.setQuantity(voucherFreeShip.getQuantity() - 1);
                voucherRepository.save(voucherFreeShip);
            }

            //tính điểm
            if(request.getIdUser() != null){
                User user = userRepository.getOne(request.getIdUser());
                user.setPoints(user.getPoints() - request.getPoint());
                userRepository.save(user);
                if(user.getPointsHistory() == null){
                    user.setPointsHistory(request.getPointHistory());
                    userRepository.save(user);
                }else{
                    user.setPointsHistory(user.getPointsHistory() + request.getPointHistory());
                    userRepository.save(user);
                }
            }

            return bill;
        }
        return null;
    }

    @Override
    public String createBillCustomerOfflineRequest(BillRequestOffline request) {
        BigDecimal value1 = new BigDecimal(String.valueOf(request.getItemDiscount()));
        BigDecimal value2 = new BigDecimal(String.valueOf(request.getItemDiscountFreeShip()));
        // thông tin hoá đơn
        Bill bill = Bill.builder()
                .code(new Random().randomToString("Bill"))
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress() + ',' + request.getWards() + '-' + request.getDistrict() + '-' + request.getProvince())
                .userName(request.getUserName())
                .itemDiscount(value1.add(value2))
                .totalMoney(request.getTotalMoney())
                .typeBill(TypeBill.OFFLINE)
                .statusBill(StatusBill.CHO_XAC_NHAN)
                .build();
        billRepository.save(bill);

        // lịch sử thông tin hoá đơn
        BillHistory billHistory = BillHistory.builder()
                .bill(bill)
                .statusBill(StatusBill.CHO_XAC_NHAN)
                .actionDescription(request.getPaymentMethod().equals("OFFLINE") ? "Chưa thanh toán" : "Đã thanh toán").build();
        billHistoryRepository.save(billHistory);

        for (BillAskClient cart : request.getBillDetail()) {
            BillDetails billDetail = BillDetails.builder()
                    .statusBill(StatusBill.CHO_XAC_NHAN)
                    .sku(skuRepositoty.findById(cart.getSku()).orElse(null))
                    .price(cart.getPrice())
                    .quantity(cart.getQuantity())
                    .bill(bill).build();
            billDetailRepository.save(billDetail);
        }

        // hình thức thanh toán của hoá đơn
        Payments payments = Payments.builder()
                .method(request.getPaymentMethod().equals("paymentReceive") ? TypePayment.TIEN_MAT : TypePayment.CHUYEN_KHOAN)
                .bill(bill)
                .moneyPayment(request.getTotalMoney())
                .typePayment(StatusPayment.THANH_TOAN).build();
        paymentsRepository.save(payments);

        // thông tin voucher
        Optional<Voucher> optionalVoucher = voucherRepository.findById(request.getIdVoucher());
        if (optionalVoucher.isPresent()) {
            Voucher voucher = optionalVoucher.get();

            VoucherDetail voucherDetail = VoucherDetail.builder()
                    .voucher(voucher)
                    .bill(bill)
                    .beforePrice(request.getTotalMoney())
                    .afterPrice(request.getAfterPrice())
                    .discountPrice(request.getItemDiscount())
                    .build();
            voucherDetailRepository.save(voucherDetail);
        } else {
            return "Lỗi";
        }
        // thông tin voucherfreeship
        Optional<Voucher> optionalVoucherFreeShip = voucherRepository.findById(request.getIdVoucherFreeShip());
        if (optionalVoucherFreeShip.isPresent()) {
            Voucher voucher = optionalVoucher.get();

            VoucherDetail voucherDetail = VoucherDetail.builder()
                    .voucher(voucher)
                    .bill(bill)
                    .beforePrice(request.getTotalMoney())
                    .afterPrice(request.getAfterPrice())
                    .discountPrice(request.getItemDiscountFreeShip())
                    .build();
            voucherDetailRepository.save(voucherDetail);
        } else {
            return "Lỗi";
        }
        //trừ số lượng
        if(request.getIdVoucher() != null){
            Voucher voucher = voucherRepository.getOne(request.getIdVoucher());
            voucher.setQuantity(voucher.getQuantity() - 1);
            voucherRepository.save(voucher);
        }
        if(request.getIdVoucherFreeShip() != null) {
            Voucher voucherFreeShip = voucherRepository.getOne(request.getIdVoucherFreeShip());
            voucherFreeShip.setQuantity(voucherFreeShip.getQuantity() - 1);
            voucherRepository.save(voucherFreeShip);
        }

        return "Finished";
    }

    public boolean billWait(BillRequestOffline request) {
        return false;
    }

    @Override
    public Bill saveBillOffline(Integer id, BillRequestOffline request) {
        return null;
    }

    @Override
    public Bill detail(Integer id) {
        return billRepository.findById(id).get();
    }

    @Override
    public List<Bill> searchNoDate(String key, String status) {
        return billRepository.searchNoDate(key, status);
    }

    @Override
    public List<Bill> searchWithDate(String key, String status, LocalDate dateStart, LocalDate dateEnd) {
        return billRepository.searchWithDate(key, status, dateStart, dateEnd);
    }

    @Override
    public void updateStatusBill(Integer idAccount, int id) {
        Bill bill = billRepository.findById(id).get();
        if (bill.getStatusBill().equals(StatusBill.VAN_CHUYEN)){
            bill.setStatusBill(StatusBill.DA_THANH_TOAN);
            bill.setCompletionDate(LocalDate.now());
        }
        if (bill.getStatusBill().equals(StatusBill.CHO_VAN_CHUYEN)){
            bill.setStatusBill(StatusBill.VAN_CHUYEN);
        }
        if (bill.getStatusBill().equals(StatusBill.CHO_XAC_NHAN)){
            bill.setStatusBill(StatusBill.CHO_VAN_CHUYEN);
        }
        Account account = acountRepository.findById(idAccount).get();
        bill.setPersonUpdate(account.getCode() + " - " + account.getUser().getFullName());
        bill.setDateUpdate(LocalDate.now());
        imeiRepository.updateStatusImeiWhereIdBill(id);
        imeiDaBanRepository.updateStatusImeiWhereIdBill(id);
        billDetailRepository.updateStatusBillDetailWhereIdBill(id);
        billRepository.save(bill);
        if (bill.getTypeBill().equals(TypeBill.ONLINE) && bill.getStatusBill().equals(StatusBill.DA_THANH_TOAN)){
        Account account1 = acountRepository.findById(bill.getAccount().getId()).get();
        User user = userRepository.findById(account1.getUser().getId()).get();
        if (bill.getTotalMoney().compareTo(BigDecimal.valueOf(30000000)) == -1 || bill.getTotalMoney().compareTo(BigDecimal.valueOf(30000000)) == 0){
            user.setPoints(user.getPoints() + 100);
        } else if (bill.getTotalMoney().compareTo(BigDecimal.valueOf(50000000)) == -1 || bill.getTotalMoney().compareTo(BigDecimal.valueOf(50000000)) == 0){
            user.setPoints(user.getPoints() + 200);
        } else if (bill.getTotalMoney().compareTo(BigDecimal.valueOf(70000000)) == -1 || bill.getTotalMoney().compareTo(BigDecimal.valueOf(70000000)) == 0){
            user.setPoints(user.getPoints() + 300);
        } else {
            user.setPoints(user.getPoints() + 500);
        }
        userRepository.save(user);
        }
//        this.billRepository.updateBillStatus(id);
    }

    @Override
    public void returnBill(Integer idAccount, Integer id, String noteReturn) {
        Bill bill = billRepository.findById(id).get();
        if (bill.getStatusBill().equals(StatusBill.VAN_CHUYEN)){
            if (bill.getNumberOfPointsUsed() != null){
                if (bill.getNumberOfPointsUsed() != 0){
                Account account1 = acountRepository.findById(bill.getAccount().getId()).get();
                User user = userRepository.findById(account1.getUser().getId()).get();
                user.setPoints(user.getPoints() + bill.getNumberOfPointsUsed());
                userRepository.save(user);
                }
            }
        }else {
            if (bill.getAccount() != null){
                Account account1 = acountRepository.findById(bill.getAccount().getId()).get();
                User user = userRepository.findById(account1.getUser().getId()).get();
                if (bill.getTotalMoney().compareTo(BigDecimal.valueOf(30000000)) == -1 || bill.getTotalMoney().compareTo(BigDecimal.valueOf(30000000)) == 0){
                    user.setPoints(user.getPoints() - 100);
                } else if (bill.getTotalMoney().compareTo(BigDecimal.valueOf(50000000)) == -1 || bill.getTotalMoney().compareTo(BigDecimal.valueOf(50000000)) == 0){
                    user.setPoints(user.getPoints() - 200);
                } else if (bill.getTotalMoney().compareTo(BigDecimal.valueOf(70000000)) == -1 || bill.getTotalMoney().compareTo(BigDecimal.valueOf(70000000)) == 0){
                    user.setPoints(user.getPoints() - 300);
                } else {
                    user.setPoints(user.getPoints() - 500);
                }
            }
        }
        bill.setStatusBill(StatusBill.TRA_HANG);
        bill.setNoteReturn(noteReturn);
        Account account = acountRepository.findById(idAccount).get();
        bill.setPersonUpdate(account.getCode() + " - " + account.getUser().getFullName());
        bill.setDateUpdate(LocalDate.now());
        billRepository.save(bill);
        if (voucherDetailRepository.listVoucherDetailByIdBill(id) != null){
        for (VoucherDetail voucherDetail : voucherDetailRepository.listVoucherDetailByIdBill(id)
             ) {
            Voucher voucher = voucherRepository.findById(voucherDetail.getVoucher().getId()).get();
            voucher.setQuantity(voucher.getQuantity() + 1);
            voucherRepository.save(voucher);
        }}
        for (BillDetails billDetails : billDetailRepository.findByBillDetailOfIdBill(id)
             ) {
            SKU sku = skuRepositoty.findById(billDetails.getSku().getId()).get();
            sku.setQuantity(sku.getQuantity() + billDetails.getQuantity());
            skuRepositoty.save(sku);
            for (ImeiDaBan imeiDaBan : imeiDaBanRepository.findImeiDaBanByBillDetail_Id(billDetails.getId())
                 ) {
                imeiDaBanRepository.deleteById(imeiDaBan.getId());
                Imei imei = imeiRepository.findByCodeImei(imeiDaBan.getCodeImei());
                imei.setStatus(0);
                imeiRepository.save(imei);
            }
        }
    }

    @Override
    public Bill findByCode(String code) {
        return billRepository.findByCode(code).orElse(null);
    }

    public List<Bill> listBillByIdAccount(Integer id) {
        return billRepository.listBillByIdAccount(id);
    }

    @Override
    public List<Bill> listBillByIdAccountAndStatus(Integer id, String status) {
        return billRepository.listBillByIdAccountAndStatus(id, status);
    }

    @Override
    public void deleteBill(String noteReturn, Integer id) {
        this.billDetailRepository.deleteBillDetailsByBill(id);
        this.paymentsRepository.deletePaymentsByBill(id);
        this.billHistoryRepository.deleteBillHistoriesByIdBill(id);
        this.billRepository.deleteBill(noteReturn, id);
        Bill bill = billRepository.findById(id).get();
        if (bill.getNumberOfPointsUsed() != null){
            if (bill.getNumberOfPointsUsed() != 0){
                Account account = acountRepository.findById(bill.getAccount().getId()).get();
                User user = userRepository.findById(account.getUser().getId()).get();
                user.setPoints(user.getPoints() + bill.getNumberOfPointsUsed());
                userRepository.save(user);
            }
        }
        for (BillDetails billDetails : billDetailRepository.findByBillDetailOfIdBill(id)
        ) {
            SKU sku = skuRepositoty.findById(billDetails.getSku().getId()).get();
            sku.setQuantity(sku.getQuantity() + billDetails.getQuantity());
            skuRepositoty.save(sku);
        }
        if (voucherDetailRepository.listVoucherDetailByIdBill(id) != null){
            for (VoucherDetail voucherDetail : voucherDetailRepository.listVoucherDetailByIdBill(id)
            ) {
                Voucher voucher = voucherRepository.findById(voucherDetail.getVoucher().getId()).get();
                voucher.setQuantity(voucher.getQuantity() + 1);
                voucherRepository.save(voucher);
            }}
    }

    @Override
    public void updateAllChoThanhToan(String personUpdate) {
         billRepository.updateAllChoVanChuyen(personUpdate);
    }

    //lấy ra list bill_detail của 1 bill theo id_bill
    @Override
    public List<BillDetailOffLineIon> getAllBillChoXacNhan() {
        List<BillDetailOffLineIon> billDetailsList = billRepository.getAllBillChoXacNhan();
        return billDetailsList;
    }

    @Override
    public Integer getCountBillCXN() {
        return billRepository.getCountBillCXN();
    }

    @Override
    public List<Bill> getBillOfflineCXN() {
        return billRepository.getBillOfflineCXN();
    }

    @Override
    public Bill acceptReturn(AcceptReturn acceptReturn) {
        Bill bill = billRepository.findById(acceptReturn.getIdBill()).get();
        bill.setStatusBill(StatusBill.TRA_HANG);
        bill.setDateUpdate(LocalDate.now());
        bill.setPersonUpdate(acceptReturn.getPersonUpdate());
        for (String codeImei : acceptReturn.getCodeImeiDaBan()
             ) {
            imeiDaBanRepository.updateStatusImeiDaBanByCodeImei(6, codeImei);
            Imei imei = imeiRepository.findByCodeImei(codeImei);
            imei.setStatus(4);
            imeiRepository.save(imei);
        }
        return bill;
    }

    @Override
    public Bill noAcceptReturn(AcceptReturn acceptReturn) {
        Bill bill = billRepository.findById(acceptReturn.getIdBill()).get();
        bill.setStatusBill(StatusBill.DA_THANH_TOAN);
        bill.setDateUpdate(LocalDate.now());
        for (String codeImei : acceptReturn.getCodeImeiDaBan()
        ) {
            imeiDaBanRepository.updateStatusImeiDaBanByCodeImei(7, codeImei);
            imeiRepository.updateStatusImeiByCodeImei(3, codeImei);
        }
        return bill;
    }

    @Override
    public BillPayDone findBillPayDoneByCode(String code) {
        return billRepository.findBillPayDoneByCode(code);
    }

    @Override
    public Bill deliveryFailed(Integer idAccount, Integer idBill, String note) {
        Bill bill = billRepository.findById(idBill).get();
        bill.setStatusBill(StatusBill.GIAO_HANG_THAT_BAI);
        bill.setNote(note);
        Account account = acountRepository.findById(idAccount).get();
        bill.setPersonUpdate(account.getCode() + " - " + account.getUser().getFullName());
        bill.setDateUpdate(LocalDate.now());
        billRepository.save(bill);
        imeiRepository.updateStatusImeiWhereIdBillDeliveryFailed(idBill);
        imeiDaBanRepository.deleteImeiDaBanByIdBill(idBill);
        for (BillDetails billDetails : billDetailRepository.findByBillDetailOfIdBill(idBill)
        ) {
            SKU sku = skuRepositoty.findById(billDetails.getSku().getId()).get();
            sku.setQuantity(sku.getQuantity() + billDetails.getQuantity());
            skuRepositoty.save(sku);
        }
        return bill;
    }

}
