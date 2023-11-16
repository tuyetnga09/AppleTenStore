package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.bill.request.BillRequestOffline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnlineAccount;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.entity.Bill;

import java.time.LocalDate;
import java.util.List;

public interface BillService {
    Bill createBillCustomerOnlineRequest( BillRequestOnline request) ;

    Bill createBillAccountOnlineRequest( BillRequestOnlineAccount request) ;
    String createBillCustomerOfflineRequest(BillRequestOffline request);
    /* Bán tại cửa hàng*/
    boolean billWait(BillRequestOffline request);

    Bill  saveBillOffline(Integer id,  BillRequestOffline request);
    Bill detail(Integer id);

    List<Bill> searchNoDate(String key, String status);

    List<Bill> searchWithDate(String key, String status, LocalDate dateStart, LocalDate dateEnd);

    void updateStatusBill(Integer idAccount,int id);

    Bill findByCode(String code);

    List<Bill> listBillByIdAccount(Integer id);

    List<Bill> listBillByIdAccountCXN(Integer id);

    List<Bill> listBillByIdAccountCVC(Integer id);

    List<Bill> listBillByIdAccountVC(Integer id);

    List<Bill> listBillByIdAccountDTT(Integer id);

    List<Bill> listBillByIdAccountDH(Integer id);

    void deleteBill(Integer id);

    void updateAllChoThanhToan(String personUpdate);

    List<BillDetailOffLineIon> getAllBillChoXacNhan();

}
