package com.example.backend.controller.order_management.service.impl;

import com.example.backend.controller.order_management.model.billDetail.request.FindBillDetailRequest;
import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerIon;
import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerResponse;
import com.example.backend.controller.order_management.model.billDetail.response.BillDetailReturnAdmin;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.service.BillDetailService;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.CartDetail;
import com.example.backend.entity.SKU;
import com.example.backend.repository.BillDetailRepository;
import com.example.backend.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillDetailServiceImpl implements BillDetailService {

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillDetailRepository billDetailRepository;

    @Override
    public Page<BillDetails> getAll(FindBillDetailRequest request, Pageable pageable) {
        return billDetailRepository.findAll(pageable);
    }

    @Override
    public List<BillDetailCustomerResponse> getAll(Integer id) {
        return billDetailRepository.getAll(id);
    }

    @Override
    public List<BillDetailCustomerResponse> getAllByCustomer(Integer id) {
        return billDetailRepository.getAllByCustomer(id);
    }

    @Override
    public void updateQuantity(Integer id, Integer newQuantity) {
        BillDetails billDetails = billDetailRepository.findById(id).orElse(null);
        if (billDetails != null) {
            if(newQuantity >= 0){
                //Tìm sản phẩm
                SKU sku = billDetails.getSku();
                //Số lượng còn trong kho
                Integer tongSLSanPham = sku.getQuantity();
                //kiểm tra số lượng sản phẩm có đủ không
                if(tongSLSanPham >= newQuantity ){
                    billDetails.setQuantity(newQuantity);
                    billDetailRepository.save(billDetails);
                    System.out.println("Số lượng sản phẩm còn lại: " + sku.getQuantity());
                }else{
                    System.out.println("Số lượng sản phẩm không đủ");
                }
            }else{
                System.out.println("Số lượng phải lớn hơn 0");
                return;
            }

        }
    }

    @Override
    public List<BillDetailOffLineIon> findBillDetails(Integer id) {
        return this.billDetailRepository.findByBillDetailOffLineIdBill(id);
    }

    @Override
    public List<BillDetailCustomerIon> getBillDetailOfIdBill(Integer id) {
        Boolean check = billRepository.existsById(id);
        if (check){
            List<BillDetailCustomerIon> billDetailCustomerIons = billDetailRepository.getAllBillDetaillOfIdBill(id);

            return  billDetailCustomerIons;
        }
        return null;
    }

    @Override
    public List<BillDetailReturnAdmin> getAllBillDetailReturn(Integer status, Integer idBill) {
        return billDetailRepository.getAllBillDetailReturn(status, idBill);
    }

}
