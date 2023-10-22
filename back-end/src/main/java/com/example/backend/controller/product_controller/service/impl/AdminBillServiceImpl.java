package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.model.request.Top8ProductMonthlyTrending;
import com.example.backend.entity.Bill;
import com.example.backend.entity.Imei;
import com.example.backend.entity.SKU;
import com.example.backend.entity.projectIon.AnnualRevenueIon;
import com.example.backend.repository.BillRepository;
import com.example.backend.repository.ImeiRepository;
import com.example.backend.untils.StatusBill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AdminBillServiceImpl {
    @Autowired
    private BillRepository billRepository;

    @Autowired
    private ImeiRepository imeiRepository;


    // danh sách bills trong ngày hiện tại
    public List<Bill> getAllBillsForTheDay() {
        return billRepository.listOfBillsForTheDay();
    }

    public Integer sumBillFind(StatusBill statusBill) {
        //sum bill  theo statusBill
        StatusBill statusBillFind = statusBill;
        List<Bill> listBillDaXacNhan =
                this.getAllBillsForTheDay().stream().filter(bill -> bill.getStatusBill().equals(statusBillFind)).collect(Collectors.toList());
        return listBillDaXacNhan.size();
    }

    // tổng tiền khi chưa trừ đơn huỷ
    public Long sumToTalMoneyOfBillsForTheDay() {
        Long sum = this.getAllBillsForTheDay().stream().map(bill -> bill.getTotalMoney().longValue())
                .mapToLong(Long::longValue).sum();
        return sum;
    }

    //tổng tiền khi đã trừ đơn huỷ
    public Long sumToTalMoneyOfBillsForTheDayAndNotStatusBillDaHuy() {
        StatusBill statusBillFind = StatusBill.DA_HUY;
        Long sum =
                this.getAllBillsForTheDay().stream().filter(bill -> !statusBillFind.equals(bill.getStatusBill()))
                        .map(bill -> bill.getTotalMoney().longValue())
                        .mapToLong(Long::longValue).sum();
        return sum;
    }

    //tổng tiền của mỗi status
    public Long sumToTalMoneyOfBillswhereStatus(StatusBill statusBill) {
        StatusBill statusBillFind = statusBill;
        Long sum =
                this.getAllBillsForTheDay().stream().filter(bill -> bill.getStatusBill().equals(statusBillFind))
                        .map(bill -> bill.getTotalMoney().longValue())
                        .mapToLong(Long::longValue).sum();
        return sum;
    }

    //lisst thông tin hoá đơn đã xác nhận - "CHO_VAN_CHUYEN"
    public Page<Bill> getAllBillsForTheDayWhereStatus(Pageable pageable, String key) {
        return billRepository.pageBillStatusChoVanChuyen(pageable, key);
    }


    // lấy ra danh sách imei - sku  theo list imei da bán trong bill detail 30 ngày gần đây - (listCodeImeiDaBan30days)
    public List<Top8ProductMonthlyTrending> mostSoldSkuIn30days() {
        //list imei da bán trong bill detail 30 ngày gần đây
        List<String> listCodeImeiDaBan30days = billRepository.listImeiDaBanTrong30NgayGanDay();

        // lưu trữ lại các imei đã đc bán trong 30 day để lấy ra sku chưa sắp xếp
        List<Imei> listImei = new ArrayList<>();
//        if (listCodeImeiDaBan30days.size() > 0) {
        for (String codeImei : listCodeImeiDaBan30days) {
            Imei imei = imeiRepository.findByCodeImei(codeImei);
            listImei.add(imei);
        }


        //dùng map để lưa sku và số lần xuất hiện của sku đó
        Map<SKU, Integer> skuCounts = new HashMap<>();

        for (Imei imei : listImei) {// tính số lần suất hiện của sku
            skuCounts.put(imei.getIdSku(), skuCounts.getOrDefault(imei.getIdSku(), 0) + 1);
        }

        // list sku sau khi đã sắp xếp số lần xuất hiện từ cao xuống thấp
        List<Map.Entry<SKU, Integer>> sortedSkuCounts = new ArrayList<>(skuCounts.entrySet());

        //dùng Colection để sắp xếp
        Collections.sort(sortedSkuCounts, new Comparator<Map.Entry<SKU, Integer>>() {
            @Override
            public int compare(Map.Entry<SKU, Integer> sku1, Map.Entry<SKU, Integer> sku2) {
                // Đảm bảo sắp xếp giảm dần (từ nhiều xuống ít)
                return sku2.getValue().compareTo(sku1.getValue());
            }
        });

        //lấy ra 8 phần tử đầu tiên của maps sau khi sắp xếp
        int numberOfElementsToKeep = 8;  // Số phần tử bạn muốn giữ lại
        List<Map.Entry<SKU, Integer>> topSkuCounts =
                sortedSkuCounts.subList(0, Math.min(numberOfElementsToKeep, sortedSkuCounts.size()));

        //tạo list Top8ProductMonthlyTrending mới để add tư dữ liệu  List<Map.Entry<SKU, Integer>>
        List<Top8ProductMonthlyTrending> listTop8Product = new ArrayList<>();
        for (Map.Entry<SKU, Integer> entry : topSkuCounts) {
            Top8ProductMonthlyTrending top8ProductMonthlyTrending = new Top8ProductMonthlyTrending();
            top8ProductMonthlyTrending.setId(entry.getKey().getId());
            top8ProductMonthlyTrending.setProduct(entry.getKey().getProduct());
            top8ProductMonthlyTrending.setCapacity(entry.getKey().getCapacity());
            top8ProductMonthlyTrending.setPrice(entry.getKey().getPrice());
            top8ProductMonthlyTrending.setColor(entry.getKey().getColor());
            top8ProductMonthlyTrending.setSumSku(Long.valueOf(entry.getValue()));

            listTop8Product.add(top8ProductMonthlyTrending);
        }

        return listTop8Product;
    }

    // daonh thu 2023
    public List<AnnualRevenueIon> annualRevenue() {
        List<AnnualRevenueIon> list = billRepository.annualRevenueYear();
        System.out.println(list.size());
        return billRepository.annualRevenueYear();
    }

    //Customers
    // lấy râ số khách hàng đã đặt hàng hôm nay,
    public Integer countCustomersOrderToday() {
        List<Integer> list = billRepository.countCustomersOrderToday();
        if (list != null || !list.isEmpty()) {
            return list.size();
        }
        return 0;
    }

    //    //số khác hàng đã huỷ đơn hôm nay
    public Integer countCustomersCanceledToday() {
        List<Integer> list = billRepository.countCustomersCanceledToday();
        if (list != null || !list.isEmpty()) {
            return list.size();
        }
        return 0;
    }

    //    //số khách hàng đã thanh toán hôm nay
    public Integer countCustomersPaidToday() {
        List<Integer> list = billRepository.countCustomersPaidToday();
        if (list != null || !list.isEmpty()) {
            return list.size();
        }
        return 0;
    }

    //    // số khách hàng trả đơn trong hôm nay
    public Integer countCustomersReturnedToday() {
        List<Integer> list = billRepository.countCustomersReturnedToday();
        if (list != null || !list.isEmpty()) {
            return list.size();
        }
        return 0;
    }
}
