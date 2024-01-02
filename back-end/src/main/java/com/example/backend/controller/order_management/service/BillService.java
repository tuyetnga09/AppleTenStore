package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.bill.request.BillRequestOffline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnlineAccount;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.model.billOnline.response.BillPayDone;
import com.example.backend.controller.order_management.model.dto.AcceptReturn;
import com.example.backend.entity.Bill;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BillService {
    Bill createBillCustomerOnlineRequest( BillRequestOnline request) ;

    Bill createBillAccountOnlineRequest( BillRequestOnlineAccount request) ;
    String createBillCustomerOfflineRequest(BillRequestOffline request);
    /* Bán tại cửa hàng*/
    boolean billWait(BillRequestOffline request);

    Bill  saveBillOffline(Integer id,  BillRequestOffline request);
    Bill detail(Integer id);

    List<Bill> searchNoDate(String key, String status);

    Optional<Bill> searchBillById(Integer id);

    List<Bill> searchWithDate(String key, String status, LocalDate dateStart, LocalDate dateEnd);

    void updateStatusBill(Integer idAccount,int id);

    void returnStatusBill(Integer id);

    void returnBill(Integer idAccount, Integer id, String noteReturn);

    Bill findByCode(String code);

    List<Bill> listBillByIdAccount(Integer id);

    List<Bill> listBillByIdAccountAndStatus(Integer id, String status);

    void deleteBill(String noteReturn, Integer id, Integer idAccount);

    void updateAllChoThanhToan(String personUpdate);

    List<BillDetailOffLineIon> getAllBillChoXacNhan();

    Integer getCountBillCXN();

    List<Bill> getBillOfflineCXN();

    Bill acceptReturn(AcceptReturn acceptReturn);

    Bill noAcceptReturn(AcceptReturn AcceptReturn);

    BillPayDone findBillPayDoneByCode(String code);

    Bill deliveryFailed(Integer idAccount, Integer idBill, String note);
}
