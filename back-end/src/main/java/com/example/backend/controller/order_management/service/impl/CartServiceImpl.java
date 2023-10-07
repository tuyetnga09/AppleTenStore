package com.example.backend.controller.order_management.service.impl;

import com.example.backend.controller.order_management.model.cart.AddCart;
import com.example.backend.controller.order_management.model.cart.ListCart;
import com.example.backend.entity.Product;
import com.example.backend.entity.SKU;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.CartDetailRepository;
import com.example.backend.repository.CartRepository;
import com.example.backend.controller.order_management.service.CartService;
import com.example.backend.repository.ProductRepository;
import com.example.backend.entity.Cart;
import com.example.backend.entity.CartDetail;
import com.example.backend.repository.SKURepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService {
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private AccountRepository accountRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CartDetailRepository cartDetailRepository;
    @Autowired
    private SKURepositoty skuRepositoty;
    @Override
    public Cart addToCart(AddCart listAddToCart) {
        Cart cart = cartRepository.getCartByAccount_Id(listAddToCart.getIdAccount());
        SKU sku = skuRepositoty.getOne(listAddToCart.getIdSKU());

        if(sku.getQuantity() <= 0){
            System.out.println("Số lượng sản phẩm không đủ");
        }else {
            if (cart == null) {
                Cart c = new Cart();
                c.setAccount(accountRepository.findById(listAddToCart.getIdAccount()).get());
                cartRepository.save(c);


                CartDetail cartDetail = CartDetail.builder().sku(skuRepositoty.findById(listAddToCart.getIdSKU()).get())
                        .cart(c)
                        .price(listAddToCart.getPrice())
                        .quantity(listAddToCart.getQuantity()).build();

                //Cập nhật số lượng sku
                sku.setQuantity(sku.getQuantity() - listAddToCart.getQuantity());
                skuRepositoty.save(sku);
                System.out.println("Số lượng sản phẩm còn lại: " + sku.getQuantity());

                cartDetailRepository.save(cartDetail);

            } else {
                List<CartDetail> listCartDetailOld = cartDetailRepository.getCartDetailByCart_Id(cart.getId());

                if (!listCartDetailOld.isEmpty()) {
                    boolean foundInOld = false;
                    for (CartDetail cartDetailOld : listCartDetailOld) {
                        System.out.println(cartDetailOld.getSku().getId());
                        if (cartDetailOld.getSku().getId() == listAddToCart.getIdSKU()) {
                            CartDetail cartDetail = cartDetailRepository.findById(cartDetailOld.getId()).get();
                            cartDetail.setQuantity(cartDetail.getQuantity() + listAddToCart.getQuantity());

                            //Cập nhật số lượng sku
                            sku.setQuantity(sku.getQuantity() - listAddToCart.getQuantity());
                            skuRepositoty.save(sku);
                            System.out.println("Số lượng sản phẩm còn lại: " + sku.getQuantity());

                            cartDetailRepository.save(cartDetail);
                            foundInOld = true;
                            break;
                        }
                    }
                    if (!foundInOld) {
                        CartDetail cartDetail = CartDetail.builder().sku(skuRepositoty.findById(listAddToCart.getIdSKU()).get())
                                .cart(cart)
                                .price(listAddToCart.getPrice())
                                .quantity(listAddToCart.getQuantity()).build();

                        //Cập nhật số lượng sku
                        sku.setQuantity(sku.getQuantity() - listAddToCart.getQuantity());
                        skuRepositoty.save(sku);
                        System.out.println("Số lượng sản phẩm còn lại: " + sku.getQuantity());

                        cartDetailRepository.save(cartDetail);
                    }

                } else {

                    CartDetail cartDetail = CartDetail.builder().sku(skuRepositoty.findById(listAddToCart.getIdSKU()).get()).cart(cart).price(listAddToCart.getPrice()).quantity(listAddToCart.getQuantity()).build();

                    //Cập nhật số lượng sku
                    sku.setQuantity(sku.getQuantity() - listAddToCart.getQuantity());
                    skuRepositoty.save(sku);
                    System.out.println("Số lượng sản phẩm còn lại: " + sku.getQuantity());

                    cartDetailRepository.save(cartDetail);

                }
            }
        }
        return cart;
    }

    @Override
    public List<ListCart> getListCart(Integer idAccount) {
      return  cartRepository.getListCart(idAccount);
    }

    @Override
    public Integer quantityInCart(Integer idACcount) {
        return cartRepository.quantityInCart(idACcount);
    }
}
