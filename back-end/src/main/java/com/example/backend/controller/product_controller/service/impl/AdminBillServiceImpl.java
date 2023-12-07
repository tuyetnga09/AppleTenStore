package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.model.request.Top8ProductMonthlyTrending;
import com.example.backend.controller.product_controller.model.respon.BillDetailDashboardIon;
import com.example.backend.controller.product_controller.model.respon.BillSeachKhoangNgay;
import com.example.backend.controller.product_controller.model.respon.SeachDoanhSoTheoNam;
import com.example.backend.controller.product_controller.model.respon.TonTienBillTraHang;
import com.example.backend.controller.product_controller.model.respon.YearOfBill;
import com.example.backend.entity.Account;
import com.example.backend.entity.Bill;
import com.example.backend.entity.Imei;
import com.example.backend.entity.SKU;
import com.example.backend.entity.projectIon.AnnualRevenueIon;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.BillDetailRepository;
import com.example.backend.repository.BillRepository;
import com.example.backend.repository.ImeiRepository;
import com.example.backend.untils.Roles;
import com.example.backend.untils.Status;
import com.example.backend.untils.StatusBill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
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

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BillDetailRepository billDetailRepository;

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

    // tổng tiền khi chưa trừ đơn huỷ -- không hiên rhtij nữa
    public Long sumToTalMoneyOfBillsForTheDay() {
//        Long sum = this.getAllBillsForTheDay().stream().map(bill -> bill.getTotalMoney().longValue())
//                .mapToLong(Long::longValue).sum();
        return Long.valueOf(0);
    }

    //tổng tiền khi đã trừ đơn huỷ
    public Long sumToTalMoneyOfBillsForTheDayAndNotStatusBillDaHuy() {
        StatusBill statusBillFind = StatusBill.DA_THANH_TOAN;
        Long sum =
                this.getAllBillsForTheDay().stream().filter(bill -> statusBillFind.equals(bill.getStatusBill()))
                        .map(bill -> bill.getTotalMoney() != null ? bill.getTotalMoney().longValue() : 0)
                        .mapToLong(Long::longValue).sum();
        if (sum == null) {
            return sum = Long.valueOf(0);
        }
        return sum;
    }

    //tổng tiền của mỗi status
    public Long sumToTalMoneyOfBillswhereStatus(StatusBill statusBill) {
        StatusBill statusBillFind = statusBill;
        Long sum =
                this.getAllBillsForTheDay().stream().filter(bill -> bill.getStatusBill().equals(statusBillFind))
                        .map(bill -> bill.getTotalMoney() != null ? bill.getTotalMoney().longValue() : 0)
                        .mapToLong(Long::longValue).sum();
        if (sum == null) {
            return sum = Long.valueOf(0);
        }

        return sum;
    }


    //lisst thông tin hoá đơn đã xác nhận - "CHO_VAN_CHUYEN"
    public Page<Bill> getAllBillsForTheDayWhereStatus(Pageable pageable, String key) {
        return billRepository.pageBillStatusChoVanChuyen(pageable, key);
    }


    // lấy ra danh sách imei - sku  theo list imei da bán trong bill detail 30 ngày gần đây - ( listCodeImeiDaBan30days)
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

    // số khách hàng trả đơn trong hôm nay
    public Integer countCustomersReturnedToday() {
        List<Integer> list = billRepository.countCustomersReturnedToday();
        if (list != null || !list.isEmpty()) {
            return list.size();
        }
        return 0;
    }

    // lấy ra list Hoa Don Cho Van Chuyen Trong Ngay
    public List<Bill> getHoaDonsChoVanChuyenTrongNgay() {
        return billRepository.listHoaDonChoVanChuyenTrongNgay();
    }

    // lấy ra tong tai khoan trong thang hienj taij
    public Long tongTaiKhoanTrongThangHienTai() {
        Long sum = accountRepository.tongTaiKhoanTrongThangHienTai();
        if (sum == null) {
            return Long.valueOf(0);
        }
        return sum;
    }

    // lấy ra tong tai khoan trong thang hienj taij
    public Long tongTaiKhoanHoatDongHienTai() {
        Long sum = accountRepository.tongTaiKhoanHoatDongHienTai();
        if (sum == null) {
            return Long.valueOf(0);
        }
        return sum;
    }

    // lấy ra tong tai khoan  hienj taij
    public Long tongTaiKhoanHienTai() {
        Long sum = accountRepository.tongTaiKhoanHienTai();
        if (sum == null) {
            return Long.valueOf(0);
        }
        return sum;
    }

    // lấy ra tong tai khoan hom nay
    public Long tongTaiKhoanHomNay() {
        Long sum = accountRepository.tongTaiKhoanMoiHomNay();
        if (sum == null) {
            return Long.valueOf(0);
        }
        return sum;
    }


    // lấy ra lọc theo khoảng ngày
    public BillSeachKhoangNgay sumBillFindSeach(String dateBefore, String dateAfter) throws Exception {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate truoc = LocalDate.parse(dateBefore, formatter);
        LocalDate sau = LocalDate.parse(dateAfter, formatter);
        //sum bill  theo statusBill

        StatusBill choXacNhan = StatusBill.CHO_XAC_NHAN;
        StatusBill choVanChuyen = StatusBill.CHO_VAN_CHUYEN;
        StatusBill vanChuyen = StatusBill.VAN_CHUYEN;
        StatusBill daThanhToan = StatusBill.DA_THANH_TOAN;
        StatusBill traHang = StatusBill.TRA_HANG;
        StatusBill daHuy = StatusBill.DA_HUY;

        List<Bill> list = billRepository.getBillSeach(truoc, sau);

        BillSeachKhoangNgay billSeachKhoangNgay = new BillSeachKhoangNgay();

        //đơn hàng

        List<Bill> choXacNhans =
                list.stream().filter(bill -> bill.getStatusBill().equals(choXacNhan)).collect(Collectors.toList());
        billSeachKhoangNgay.setChoXacNhan(choXacNhans.size());

        List<Bill> choVanChuyens =
                list.stream().filter(bill -> bill.getStatusBill().equals(choVanChuyen)).collect(Collectors.toList());
        billSeachKhoangNgay.setChoVanChuyen(choVanChuyens.size());

        List<Bill> vanChuyens =
                list.stream().filter(bill -> bill.getStatusBill().equals(vanChuyen)).collect(Collectors.toList());
        billSeachKhoangNgay.setDangVanChuyen(vanChuyens.size());
        billSeachKhoangNgay.setSumBill(choVanChuyens.size());

        List<Bill> daThanhToans =
                list.stream().filter(bill -> bill.getStatusBill().equals(daThanhToan)).collect(Collectors.toList());
        billSeachKhoangNgay.setDaThanhToan(daThanhToans.size());

        List<Bill> traHangs =
                list.stream().filter(bill -> bill.getStatusBill().equals(traHang)).collect(Collectors.toList());
        billSeachKhoangNgay.setHoanTra(traHangs.size());

        List<Bill> daHuys =
                list.stream().filter(bill -> bill.getStatusBill().equals(daHuy)).collect(Collectors.toList());
        billSeachKhoangNgay.setDonHuy(daHuys.size());

        billSeachKhoangNgay.setCheck(true);

        //Tổng tiền
        Long tongTienThucThu =
                list.stream().filter(bill -> bill.getStatusBill().equals(daThanhToan))
                        .map(bill -> bill.getTotalMoney() != null ? bill.getTotalMoney().longValue() : 0)
                        .mapToLong(Long::longValue).sum();
        billSeachKhoangNgay.setTongTienThucThu(tongTienThucThu);

        Long tongTienDonChoXacNhan =
                list.stream().filter(bill -> bill.getStatusBill().equals(choXacNhan))
                        .map(bill -> bill.getTotalMoney() != null ? bill.getTotalMoney().longValue() : 0)
                        .mapToLong(Long::longValue).sum();
        billSeachKhoangNgay.setTongTienDonChoXacNhan(tongTienDonChoXacNhan);

        Long tongTienDonChoVanChuyen =
                list.stream().filter(bill -> bill.getStatusBill().equals(choVanChuyen))
                        .map(bill -> bill.getTotalMoney() != null ? bill.getTotalMoney().longValue() : 0)
                        .mapToLong(Long::longValue).sum();
        billSeachKhoangNgay.setTongTienDonChoVanChuyen(tongTienDonChoVanChuyen);

        Long tongTienDonDangVanChuyen =
                list.stream().filter(bill -> bill.getStatusBill().equals(vanChuyen))
                        .map(bill -> bill.getTotalMoney() != null ? bill.getTotalMoney().longValue() : 0)
                        .mapToLong(Long::longValue).sum();
        billSeachKhoangNgay.setTongTienDonDangVanChuyen(tongTienDonDangVanChuyen);

        Long tongTienDnDaThanhToan =
                list.stream().filter(bill -> bill.getStatusBill().equals(daThanhToan))
                        .map(bill -> bill.getTotalMoney() != null ? bill.getTotalMoney().longValue() : 0)
                        .mapToLong(Long::longValue).sum();
        billSeachKhoangNgay.setTongTienDnDaThanhToan(tongTienDnDaThanhToan);

        Long tongTienDonHoanTra =
                list.stream().filter(bill -> bill.getStatusBill().equals(traHang))
                        .map(bill -> bill.getTotalMoney() != null ? bill.getTotalMoney().longValue() : 0)
                        .mapToLong(Long::longValue).sum();
        billSeachKhoangNgay.setTongTienDonHoanTra(tongTienDonHoanTra);

        Long tongTienDonHangHuy =
                list.stream().filter(bill -> bill.getStatusBill().equals(daHuy))
                        .map(bill -> bill.getTotalMoney() != null ? bill.getTotalMoney().longValue() : 0)
                        .mapToLong(Long::longValue).sum();
        billSeachKhoangNgay.setTongTienDonHangHuy(tongTienDonHangHuy);

        // account
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

        Date dateTruoc = dateFormat.parse(dateBefore);
        Date dateSau = dateFormat.parse(dateAfter);

        String khoangTruoc = dateBefore + " 00:00:00";
        String khoangSau = dateAfter + " 23:59:59";
        DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime localDateTimeTruoc = LocalDateTime.parse(khoangTruoc, formatter1);

        DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime localDateTimeSau = LocalDateTime.parse(khoangSau, formatter2);

        String a = formatter1.format(localDateTimeTruoc);
        String b = formatter2.format(localDateTimeSau);

        //lấy ra list account
        List<Account> accountList = accountRepository.getSeachKhoangNgay(a, b);
        Roles khacHang = Roles.CUSTOMER;
        Status dangSuDung = Status.DANG_SU_DUNG;

        //lấy tổng tài khoản khách hàng
        Long tongTaiKhoan = Long.valueOf(accountList.stream()
                .filter(account -> account.getRoles().equals(khacHang))
                .collect(Collectors.toList()).size());
//                accountList != null ? Long.valueOf(accountList.size()) : 0;
        billSeachKhoangNgay.setTongTaiKhoan(tongTaiKhoan);

        //tổng tài khoản khách hàng đang sử dụng
        Long tongTaiKhoanDangSuDung = Long.valueOf(accountList.stream()
                .filter(account -> account.getRoles().equals(khacHang) && account.getStatus().equals(dangSuDung))
                .collect(Collectors.toList()).size());
        billSeachKhoangNgay.setTongTaiKhoanDangSuDung(tongTaiKhoanDangSuDung);

        //tổng tài khaonr khách hàng đăng ký trong khoang theo ngày
        Long tongTaiKhoanMoi = Long.valueOf(accountList.stream()
                .filter(account -> account.getRoles().equals(khacHang))
                .collect(Collectors.toList()).size());
        billSeachKhoangNgay.setTongTaiKhoanMoi(tongTaiKhoanMoi);

        // tổng tài khoản khách hàng trong khoangt theo tháng

        Long tongTaiKhoanTrongThang = accountRepository.seachKhoangNgayTaiKhoanTrongThang(dateTruoc, dateSau) != null
                ? accountRepository.seachKhoangNgayTaiKhoanTrongThang(dateTruoc, dateSau) : 0;
        billSeachKhoangNgay.setTongTaiKhoanTrongThang(tongTaiKhoanTrongThang);
        //tổngt Tài khoản khách hàng đặt hàng

        Long tongTaiKhoanDatHang = Long.valueOf(billRepository.getListKhachHangDatHangHomNay(truoc, sau).size());
        billSeachKhoangNgay.setTongTaiKhoanDatHang(tongTaiKhoanDatHang);
        // tổng tài khoản khách hàng đã thanh toán
        Long tongTaiKhoanDaThanhToan = Long.valueOf(billRepository.getListKhachHangDaThanhToanTrongKhoangNgay(truoc, sau).size());
        billSeachKhoangNgay.setTongTaiKhoanDaThanhToan(tongTaiKhoanDaThanhToan);

        // tổng tài khoản khách hàng huỷ đơn tongTaiKhoanHuyDon
        Long tongTaiKhoanHuyDon = Long.valueOf(billRepository.getListKhachHangDaHuyDonTrongKhoangNgay(truoc, sau).size());
        billSeachKhoangNgay.setTongTaiKhoanHuyDon(tongTaiKhoanHuyDon);

        return billSeachKhoangNgay;
    }

    //lisst nawm trong hoa don
    public List<YearOfBill> getListYearOfBillService() {
        List<YearOfBill> yearOfBills = new ArrayList<>();
        List<Integer> list = billRepository.getListYearOfBill();
        if (list.size() == 0) {
            Integer now = LocalDate.now().getYear();
            YearOfBill yearOfBill = new YearOfBill();
            yearOfBill.setYear(now);
            yearOfBills.add(yearOfBill);
            return yearOfBills;
        } else {
            Collections.sort(list, Collections.reverseOrder());
            for (Integer year : list) {
                YearOfBill yearOfBill = new YearOfBill();
                yearOfBill.setYear(year);
                yearOfBills.add(yearOfBill);
            }

            return yearOfBills;

        }
    }

    // doan so trong cac nam seach vd: 2023
    public List<SeachDoanhSoTheoNam> seachDoanhSoTheoNam(Integer year) {
        List<SeachDoanhSoTheoNam> seachDoanhSoTheoNams = new ArrayList<>();
        List<AnnualRevenueIon> list = billRepository.seachDoanhSoTheoNam(year);
        for (AnnualRevenueIon seach : list) {
            SeachDoanhSoTheoNam seachDoanhSoTheoNam = new SeachDoanhSoTheoNam();
            seachDoanhSoTheoNam.setChechSeach(true);
            seachDoanhSoTheoNam.setMonth(seach.getMonth());
            seachDoanhSoTheoNam.setQuantity(seach.getQuantity());
            seachDoanhSoTheoNam.setTotalMoney(seach.getTotalMoney());
            seachDoanhSoTheoNams.add(seachDoanhSoTheoNam);
        }
        return seachDoanhSoTheoNams;
    }

    // lấy ra account - theo id
    public  Account getOneAccount(Integer id){
        if (id == null || id.equals("")){
            return null;
        }
        Boolean check = accountRepository.existsById(id);
        if (check){
            return accountRepository.findById(id).get();
        }
        return null;
    }

    // lấy ra bill detail trong dashboard
    public List<BillDetailDashboardIon> getListBillDetailDashboard(Integer idBill){
        Boolean check = billRepository.existsById(idBill);
        if (check){
            List<BillDetailDashboardIon> list = billRepository.getListBillDetail(idBill);
            return list;
        }
        return  null;
    }


    // danh sách bills trong ngày hiện tại
    public List<Bill> listBillTraHanghomNayService() {
        return billRepository.listBillTraHangHomNay();
    }

    //tong tien bill trar hang hom nay
    public Long tongTienDonHoanTra() {
        List<Bill> billList = listBillTraHanghomNayService();
        Long sum =0l;
        for (Bill bill : billList) {
            List<TonTienBillTraHang> tonTienBillTraHangList = billDetailRepository.tongTienBilldetailTraHang(bill.getId());
            for (TonTienBillTraHang t : tonTienBillTraHangList) {
                sum = sum + t.getPrice().longValue();
            }
        }
        return sum;
    }
}
