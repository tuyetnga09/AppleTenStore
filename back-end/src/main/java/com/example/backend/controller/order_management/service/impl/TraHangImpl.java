package com.example.backend.controller.order_management.service.impl;

import com.example.backend.controller.order_management.model.bill.request.BillReturn;
import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerIon;
import com.example.backend.controller.order_management.service.TraHangService;
import com.example.backend.entity.Bill;
import com.example.backend.entity.ImeiDaBan;
import com.example.backend.repository.BillDetailRepository;
import com.example.backend.repository.BillRepository;
import com.example.backend.repository.ImeiDaBanRepository;
import com.example.backend.untils.StatusBill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TraHangImpl implements TraHangService {
    @Autowired
    private BillRepository billRepository;

    @Autowired
    private ImeiDaBanRepository imeiDaBanRepository;

    @Autowired
    private BillDetailRepository billDetailRepository;

    @Override
    public List<BillDetailCustomerIon> khachHangTraHang( Integer idBillReturn, String noteBillReturn, List<Long> idImeiDaBans) {
        Boolean check = billRepository.existsById(idBillReturn);
        Integer idBillCheck = null;
        if (idImeiDaBans.size() > 0) {
            ImeiDaBan imeiDaBan = imeiDaBanRepository.findById(idImeiDaBans.get(0)).get();
            idBillCheck = imeiDaBan.getBillDetail().getBill().getId();

        }
        //List<ImeiDaBan> imeiDaBanList = new ArrayList<>();
        if (check && (idBillReturn == idBillCheck)) {
            // enum status bill YEU_CAU_TRA_HANG

            for (int i = 0; i < idImeiDaBans.size(); i++) {
                ImeiDaBan imeiDaBan = imeiDaBanRepository.findById(idImeiDaBans.get(i)).get();
                imeiDaBan.setStatus(4);
                imeiDaBanRepository.save(imeiDaBan);
                //imeiDaBanList.add(imeiDaBan);
            }

            // Lấy ngày giờ hiện tại
            Date date = new Date();
            // Định dạng ngày giờ
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            // Chuyển đổi thành chuỗi và hiển thị
            String formattedDate = dateFormat.format(date);

            StatusBill yeuCau = StatusBill.YEU_CAU_TRA_HANG;

            Bill bill = billRepository.findById(idBillReturn).get();
            bill.setNoteReturn( formattedDate + ": " + noteBillReturn);
            bill.setStatusBill(yeuCau);
            billRepository.save(bill);

            List<BillDetailCustomerIon> billDetails = billDetailRepository.getAllBillDetaillOfIdBill(bill.getId());
            return billDetails;
        }
        return null;
    }

    @Override
    public  Boolean checkTraHang(Integer idBill){
        Boolean check = billRepository.existsById(idBill);
        List<BillDetailCustomerIon> billDetailCustomerIons = new ArrayList<>();
        if (check){
            billDetailCustomerIons = billDetailRepository.getAllBillDetaillOfIdBill(idBill);
        }
        if (billDetailCustomerIons.size()>0){
            for (BillDetailCustomerIon bill: billDetailCustomerIons) {
                if (bill.getStatusImei() != 3){
                    return false;
                }
            }
        }
        return true;
    }

    @Override
    public List<BillDetailCustomerIon> khachHangTraTatCaHang(Integer idBillReturn, String noteBillReturn,
                                                             List<BillDetailCustomerIon> billDetailCustomerIons) {
        Boolean check = billRepository.existsById(idBillReturn);
        Integer idBillCheck = null;
        if (billDetailCustomerIons.size() > 0) {
            ImeiDaBan imeiDaBan = imeiDaBanRepository.findById(billDetailCustomerIons.get(0).getIdImei()).get();
            idBillCheck = imeiDaBan.getBillDetail().getBill().getId();

        }
        if (check && (idBillReturn == idBillCheck)) {
            // enum status bill YEU_CAU_TRA_HANG
            for (int i = 0; i < billDetailCustomerIons.size(); i++) {
                ImeiDaBan imeiDaBan = imeiDaBanRepository.findById(billDetailCustomerIons.get(i).getIdImei()).get();
                imeiDaBan.setStatus(4);
                imeiDaBanRepository.save(imeiDaBan);
            }

            // Lấy ngày giờ hiện tại
            Date date = new Date();
            // Định dạng ngày giờ
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
            // Chuyển đổi thành chuỗi và hiển thị
            String formattedDate = dateFormat.format(date);

            StatusBill yeuCau = StatusBill.YEU_CAU_TRA_HANG;

            Bill bill = billRepository.findById(idBillReturn).get();
            bill.setNoteReturn( formattedDate + ": " + noteBillReturn);
            bill.setStatusBill(yeuCau);
            billRepository.save(bill);

            List<BillDetailCustomerIon> billDetails = billDetailRepository.getAllBillDetaillOfIdBill(bill.getId());
            return billDetails;
        }
        return null;
    }
}
