package com.example.backend.controller.order_management.service.impl;


import com.example.backend.controller.order_management.model.cartDetail.ChangeQuantity;
import com.example.backend.controller.order_management.model.cartDetail.ChangeSizeInCart;
import com.example.backend.controller.order_management.repository.CartDetailRepository;
import com.example.backend.controller.order_management.service.CartDetailService;
import com.example.backend.controller.product_controller.repository.ProductRepository;
import com.example.backend.entity.CartDetail;
import com.example.backend.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartDetailServiceImpl implements CartDetailService {
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private ProductRepository productRepository;

    @Override
    public String changeSizeCartDetail(ChangeSizeInCart changeSize) {
            CartDetail cartDetail = cartDetailRepository.findById(changeSize.getIdCartDetail()).get();
            Product productDetail = productRepository.findById(changeSize.getIdProductDetail()).get();
            cartDetail.setQuantity(changeSize.getQuantity());
            cartDetail.setPrice(changeSize.getPrice());
            cartDetail.setProductDetail(productDetail);
            cartDetailRepository.save(cartDetail);

        return "ok";
    }
    @Override
    public Boolean deleteCartDetail(Integer id) {
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
}
