package com.example.backend.controller.product_controller.controller;

import com.example.backend.controller.product_controller.model.request.Top8ProductMonthlyTrending;
import com.example.backend.controller.product_controller.service.impl.AdminBillServiceImpl;
import com.example.backend.entity.Bill;
import com.example.backend.entity.projectIon.AnnualRevenueIon;
import com.example.backend.untils.StatusBill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/bill")
public class AdminBillController {
    @Autowired
    private AdminBillServiceImpl adminBillService;

    //lấy ra số lượng đơn hàng trong ngày
    @GetMapping("/sum-all-bill") // sum all bill
    public ResponseEntity<Integer> sumAllBill() {
        Integer sum = adminBillService.getAllBillsForTheDay().size();
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/unconfimred") //sum bill chưa xác nhận
    public ResponseEntity<Integer> sumBillUnconfimred() {
        StatusBill statusBill = StatusBill.CHO_XAC_NHAN;
        Integer sum = adminBillService.sumBillFind(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/confimred") //sum bill đã xác nhận
    public ResponseEntity<Integer> sumConfirmed() {
        StatusBill statusBill = StatusBill.CHO_VAN_CHUYEN;
        Integer sum = adminBillService.sumBillFind(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/are-delivering") //sum bill đang vận chuyển
    public ResponseEntity<Integer> sumBillAreDelivering() {
        StatusBill statusBill = StatusBill.VAN_CHUYEN;
        Integer sum = adminBillService.sumBillFind(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/already-paid") //sum bill đã thanh toán
    public ResponseEntity<Integer> sumBillAlreadyPaid() {
        StatusBill statusBill = StatusBill.DA_THANH_TOAN;
        Integer sum = adminBillService.sumBillFind(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/no-return") //sum bill không trả hàng
    public ResponseEntity<Integer> sumBillNoReturn() {
        StatusBill statusBill = StatusBill.KHONG_TRA_HANG;
        Integer sum = adminBillService.sumBillFind(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/returns") //sum bill  trả hàng
    public ResponseEntity<Integer> sumBillReturns() {
        StatusBill statusBill = StatusBill.TRA_HANG;
        Integer sum = adminBillService.sumBillFind(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/cancel-order") //sum bill  trả hàng
    public ResponseEntity<Integer> sumBillCancelOrder() {
        StatusBill statusBill = StatusBill.DA_HUY;
        Integer sum = adminBillService.sumBillFind(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    // money
    //lấy ra số tổng tiền trong ngày
    @GetMapping("/total-money")
    public ResponseEntity<Long> sumAllToTalMoneyOfBillsForTheDay() {
        Long sum = adminBillService.sumToTalMoneyOfBillsForTheDay();
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    //lấy ra số tổng tiền trong ngày đã trừ đơn huỷ
    @GetMapping("/total-money/not-da-huy")
    public ResponseEntity<Long> sumAllToTalMoneyOfBillsForTheDayAndNotStatusBillDaHuy() {
        Long sum = adminBillService.sumToTalMoneyOfBillsForTheDayAndNotStatusBillDaHuy();
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/total-money/unconfimred") //sum tổng tiền các bill chờ xác nhận
    public ResponseEntity<Long> sumToTalMoneyOfBillsForTheDayUnconfimred() {
        StatusBill statusBill = StatusBill.CHO_XAC_NHAN;
        Long sum = adminBillService.sumToTalMoneyOfBillswhereStatus(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/total-money/confimred") //sum tổng tiền các bill đã xác nhận
    public ResponseEntity<Long> sumToTalMoneyOfBillsForTheDayConfimred() {
        StatusBill statusBill = StatusBill.CHO_VAN_CHUYEN;
        Long sum = adminBillService.sumToTalMoneyOfBillswhereStatus(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/total-money/are-delivering") //sum tổng tiền các bill ddang van chuyen
    public ResponseEntity<Long> sumToTalMoneyOfBillsForTheDayAreDelivering() {
        StatusBill statusBill = StatusBill.VAN_CHUYEN;
        Long sum = adminBillService.sumToTalMoneyOfBillswhereStatus(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/total-money/already-paid") //sum tổng tiền các bill da thanh toans
    public ResponseEntity<Long> sumToTalMoneyOfBillsForTheDayAlreadyPaid() {
        StatusBill statusBill = StatusBill.DA_THANH_TOAN;
        Long sum = adminBillService.sumToTalMoneyOfBillswhereStatus(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/total-money/no-return") //sum tổng tiền các bill khong trar hang
    public ResponseEntity<Long> sumToTalMoneyOfBillsForTheDayNoReturn() {
        StatusBill statusBill = StatusBill.KHONG_TRA_HANG;
        Long sum = adminBillService.sumToTalMoneyOfBillswhereStatus(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/total-money/returns") //sum tổng tiền các bill tra hang
    public ResponseEntity<Long> sumToTalMoneyOfBillsForTheDayReturns() {
        StatusBill statusBill = StatusBill.TRA_HANG;
        Long sum = adminBillService.sumToTalMoneyOfBillswhereStatus(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    @GetMapping("/total-money/cancel-order") //sum tổng tiền các bill da huuy
    public ResponseEntity<Long> sumToTalMoneyOfBillsForTheDayCancelOrder() {
        StatusBill statusBill = StatusBill.DA_HUY;
        Long sum = adminBillService.sumToTalMoneyOfBillswhereStatus(statusBill);
        return new ResponseEntity<>(sum, HttpStatus.OK);
    }

    //page bill status "CHO_VAN_CHUYEN"
    @GetMapping("/display")
    public Page<Bill> viewAllBillsForTheDayWhereStatus(@RequestParam(value = "page", defaultValue = "0") Integer page, @RequestParam("key") String key) {
        Pageable pageable = PageRequest.of(page, 8);
        Page<Bill> pageBill = adminBillService.getAllBillsForTheDayWhereStatus(pageable, key);
        return pageBill;
    }

    //list 8 sp được bán nhiều nhất trong 30 ngày vừa qua lấy ra theo SKU
    @GetMapping("/product/monthly-trending")
    public ResponseEntity<List<Top8ProductMonthlyTrending>> monthlyTrendingMenus() {
        List<Top8ProductMonthlyTrending> list = adminBillService.mostSoldSkuIn30days();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //báo cáo daonh thu hiện tại - "DA_THANH_TOAN"
    @GetMapping("/revenue-year")
    public ResponseEntity<List<AnnualRevenueIon>> revenue() {
        List<AnnualRevenueIon> list = adminBillService.annualRevenue();
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    //Customer

    // lấy râ số khách hàng đã đặt hàng hôm nay,
    @GetMapping("/customer/unconfimred")
    public ResponseEntity<Integer> countCustomersOrderToday() {
        Integer count = adminBillService.countCustomersOrderToday();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    //    //số khác hàng đã huỷ đơn hôm nay
    @GetMapping("/customer/cancel-order")
    public ResponseEntity<Integer> countCustomersCanceledToday() {
        Integer count = adminBillService.countCustomersCanceledToday();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    //
    //    //số khách hàng đã thanh toán hôm nay
    @GetMapping("/customer/already-paid")
    public ResponseEntity<Integer> countCustomersPaidToday() {
        Integer count = adminBillService.countCustomersPaidToday();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    //    // số khách hàng trả đơn trong hôm nay
    @GetMapping("/customer/returns")
    public ResponseEntity<Integer> countCustomersReturnedToday() {
        Integer count = adminBillService.countCustomersReturnedToday();
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}
