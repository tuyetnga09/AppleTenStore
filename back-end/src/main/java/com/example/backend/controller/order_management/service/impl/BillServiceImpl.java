package com.example.backend.controller.order_management.service.impl;

import com.example.backend.controller.order_management.model.bill.request.BillAskClient;
import com.example.backend.controller.order_management.model.bill.request.BillRequest;
import com.example.backend.controller.order_management.repository.AccountRepository;
import com.example.backend.controller.order_management.repository.AddressRepository;
import com.example.backend.controller.order_management.repository.BillDetailRepository;
import com.example.backend.controller.order_management.repository.BillHistoryRepository;
import com.example.backend.controller.order_management.repository.BillRepository;
import com.example.backend.controller.order_management.repository.PaymentsRepository;
import com.example.backend.controller.order_management.repository.UserRepository;
import com.example.backend.controller.order_management.repository.VoucherDetailRepository;
import com.example.backend.controller.order_management.service.BillService;
import com.example.backend.controller.product_controller.repository.ProductRepository;
import com.example.backend.controller.voucher_managment.repository.VoucherRepository;
import com.example.backend.entity.Account;
import com.example.backend.entity.Address;
import com.example.backend.entity.Bill;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.BillHistory;
import com.example.backend.entity.Payments;
import com.example.backend.entity.Product;
import com.example.backend.entity.User;
import com.example.backend.entity.Voucher;
import com.example.backend.entity.VoucherDetail;
import com.example.backend.untils.Random;
import com.example.backend.untils.Status;
import com.example.backend.untils.StatusBill;
import com.example.backend.untils.StatusPayment;
import com.example.backend.untils.TypeBill;
import com.example.backend.untils.TypePayment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    private ProductRepository productRepository;
    @Autowired
    private BillDetailRepository billDetailRepository;
    @Autowired
    private PaymentsRepository paymentsRepository;

    @Autowired
    private VoucherRepository voucherRepository;

    @Autowired
    private VoucherDetailRepository voucherDetailRepository;
    @Override
    public String createBillCustomerOnlineRequest(BillRequest request) {
        User user = User.builder()
                .fullName(request.getUserName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .status(Status.DANG_SU_DUNG)
                .points(0).build();
        userRepository.save(user);

        Account account = Account.builder()
                .user(user)
                .email(request.getEmail())
                .status(Status.DANG_SU_DUNG)
                .password(new Random().randomPassword())
                // sau cho them roles vao day nua
                .build();
        acountRepository.save(account);

        Address address = Address.builder()
                .status(Status.DANG_SU_DUNG)
                .user(user)
                .address(request.getAddress())
                .quanHuyen(request.getDistrict())
                .tinhThanhPho(request.getProvince())
                .xaPhuong(request.getWards()).build();
        addressRepository.save(address);

        Bill bill = Bill.builder()
                .code(new Random().randomToString("Bill"))
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress() + ',' + request.getWards() + '-' + request.getDistrict() + '-' + request.getProvince())
                .userName(request.getUserName())
                .moneyShip(request.getMoneyShip())
                .itemDiscount(request.getItemDiscount())
                .totalMoney(request.getTotalMoney())
                .typeBill(TypeBill.ONLINE)
                .statusBill(StatusBill.CHO_XAC_NHAN)
                .account(account).build();
        billRepository.save(bill);

        BillHistory billHistory = BillHistory.builder()
                .bill(bill)
                .statusBill(StatusBill.CHO_XAC_NHAN)
                .actionDescription(request.getPaymentMethod().equals("paymentReceive") ? "Chưa thanh toán" : "Đã thanh toán").build();
        billHistoryRepository.save(billHistory);

        for (BillAskClient x : request.getBillDetail()) {
            Product productDetail = productRepository.findById(x.getIdProductDetail()).get();
            BillDetails billDetail = BillDetails.builder()
                    .statusBill(StatusBill.CHO_XAC_NHAN)
                    .product(productDetail)
                    .price(x.getPrice())
                    .quantity(x.getQuantity())
                    .bill(bill).build();
            billDetailRepository.save(billDetail);
        }

        Payments payments = Payments.builder()
                .method(request.getPaymentMethod().equals("paymentReceive") ? TypePayment.TIEN_MAT : TypePayment.CHUYEN_KHOAN)
                .bill(bill)
                .moneyPayment(request.getTotalMoney())
                .typePayment(StatusPayment.THANH_TOAN).build();
        paymentsRepository.save(payments);

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

        return "Finished";

    }
}
