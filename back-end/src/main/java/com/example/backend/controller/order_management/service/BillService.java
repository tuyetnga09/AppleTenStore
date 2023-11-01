package com.example.backend.controller.order_management.service;

import com.example.backend.controller.order_management.model.bill.request.BillRequest;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOffline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnlineAccount;
import com.example.backend.controller.order_management.model.cart.ListCart;
import com.example.backend.entity.Bill;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface BillService {
    String createBillCustomerOnlineRequest( BillRequestOnline request) ;

    String createBillAccountOnlineRequest( BillRequestOnlineAccount request) ;
    String createBillCustomerOfflineRequest(BillRequestOffline request);
    /* Bán tại cửa hàng*/
    boolean billWait(BillRequestOffline request);

    Bill  saveBillOffline(Integer id,  BillRequestOffline request);
    Bill detail(Integer id);

    List<Bill> searchNoDate(String key, String status, String user);

    List<Bill> searchWithDate(String key, String status, String user, LocalDate dateStart, LocalDate dateEnd);

    void updateStatusBill(int id);

    Bill findByCode(String code);

    List<Bill> listBillByIdAccount(Integer id);

    List<Bill> listBillByIdAccountCXN(Integer id);

    List<Bill> listBillByIdAccountVC(Integer id);

    List<Bill> listBillByIdAccountDTT(Integer id);

    List<Bill> listBillByIdAccountDH(Integer id);
}
