package com.example.backend.controller.order_management.service.impl;


import com.example.backend.controller.order_management.model.bill.request.BillAskClient;
import com.example.backend.controller.order_management.model.cartDetail.ChangeQuantity;
import com.example.backend.controller.order_management.model.cartDetail.ChangeSizeInCart;
import com.example.backend.controller.order_management.service.CartDetailService;
import com.example.backend.entity.Cart;
import com.example.backend.entity.CartDetail;
import com.example.backend.entity.SKU;
import com.example.backend.repository.CartDetailRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.SKURepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartDetailServiceImpl implements CartDetailService {
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private SKURepositoty skuRepositoty;

    @Override
    public String changeSizeCartDetail(ChangeSizeInCart changeSize) {
            CartDetail cartDetail = cartDetailRepository.findById(changeSize.getIdCartDetail()).get();
            SKU sku = skuRepositoty.findById(changeSize.getIdProductDetail()).get();
            cartDetail.setQuantity(changeSize.getQuantity());
            cartDetail.setPrice(changeSize.getPrice());
            cartDetail.setSku(sku);
            cartDetailRepository.save(cartDetail);

        return "ok";
    }
    @Override
    public Boolean deleteCartDetail(Integer id) {
//        CartDetail cartDetail = cartDetailRepository.findById(id).orElse(null);
//        SKU sku = cartDetail.getSku();
//        sku.setQuantity(sku.getQuantity() + cartDetail.getQuantity());
//        skuRepositoty.save(sku);
        cartDetailRepository.deleteById(id);
        return true;
    }

    @Override
    public String changeQuantity(ChangeQuantity changeQuantity) {
        CartDetail cartDetail = cartDetailRepository.findById(changeQuantity.getIdCartDetail()).get();
        cartDetail.setQuantity(changeQuantity.getQuantity());
        cartDetailRepository.save(cartDetail);
        return "ok";
    }

    @Override
    public void updateQuantity(Integer id, Integer newQuantity) {
        CartDetail cartDetail = cartDetailRepository.findById(id).orElse(null);
        if (cartDetail != null) {
            if(newQuantity >= 0){
                //Tìm sản phẩm
                SKU sku = cartDetail.getSku();
                //Số lượng còn trong kho
                Integer tongSLSanPham = sku.getQuantity();
                //kiểm tra số lượng sản phẩm có đủ không
                if(tongSLSanPham >= newQuantity ){
                    // Cập nhật số lượng sản phẩm và cartdetail
//                    sku.setQuantity(tongSLSanPham - newQuantity);
//                    skuRepositoty.save(sku);
                    cartDetail.setQuantity(newQuantity);
                    cartDetailRepository.save(cartDetail);
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
    public Integer getQuantityCartDetailBySku(Long id,Integer idAccount) {
        return cartDetailRepository.getQuantityCartDetailBySku(id,idAccount);
    }

    @Override
    public void updateQuantityCartOff(Integer id, Integer newQuantity) {
        CartDetail cartDetail = cartDetailRepository.findById(id).orElse(null);
        if (cartDetail != null) {
            if(newQuantity >= 0){
                //Tìm sản phẩm
                SKU sku = cartDetail.getSku();
                //Số lượng còn trong kho
                Integer tongSLSanPham = sku.getQuantity();
                //kiểm tra số lượng sản phẩm có đủ không
                if(tongSLSanPham >= newQuantity ){
                    // Cập nhật số lượng sản phẩm và cartdetail
//                    sku.setQuantity(tongSLSanPham - newQuantity);
//                    skuRepositoty.save(sku);
                    cartDetail.setQuantity(newQuantity);
                    cartDetailRepository.save(cartDetail);
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
    public Boolean deleteCartDetailOff(Integer id) {
        cartDetailRepository.deleteById(id);
        return true;
    }

    @Override
    public Boolean deleteAllCartDetail(Integer idAccount) {
        cartDetailRepository.deleteAllByAccountId(idAccount);
        return true;
    }
}
