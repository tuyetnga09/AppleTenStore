package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.model.cart.AddCart;
import com.example.backend.controller.order_management.model.cart.ListCart;
import com.example.backend.controller.order_management.service.CartService;
import com.example.backend.entity.SKU;
import com.example.backend.repository.SKURepositoty;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer/cart")
public class CartController {
    @Autowired
    private CartService cartService;
    @Autowired
    private SKURepositoty skuRepositoty;

    @PostMapping("/addToCart")
    public ResponseObj addCart(@RequestBody AddCart listAddToCart) {
        return new ResponseObj(cartService.addToCart(listAddToCart));
    }

    @GetMapping("/{idAccount}")
    public List<ListCart> getListCart(@PathVariable("idAccount") Integer idAccount) {
        return cartService.getListCart(idAccount);
    }

    @GetMapping("/quantityInCart/{idAccount}")
    public Integer getQuantityInCart(@PathVariable("idAccount") Integer idAccount) {
        return cartService.quantityInCart(idAccount);
    }

    @PostMapping("/addSession")
    public ResponseEntity<String> addToCart(@RequestBody AddCart item, HttpSession session) {
        List<AddCart> cartItemList = (List<AddCart>) session.getAttribute("cartItems");
        SKU sku = skuRepositoty.getOne(item.getIdSKU());
        if(sku.getQuantity() <= 0){
            System.out.println("Số lượng sản phẩm không đủ");
        }else {
            if (cartItemList == null) {
                cartItemList = new ArrayList<>();
            }
            // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa
            boolean productExists = false;
            for (AddCart itemcart : cartItemList) {
                if (itemcart.getIdSKU().equals(item.getIdSKU())) {
                    // Sản phẩm đã tồn tại, tăng số lượng
                    itemcart.setQuantity(itemcart.getQuantity() + 1);
                    productExists = true;
                    break;
                }
            }
            if (!productExists) {
                // Sản phẩm chưa tồn tại trong giỏ hàng, thêm mới
                cartItemList.add(item);
            }
            session.setAttribute("cartItems", cartItemList);
//        session.setAttribute("myCartNum", cartItemList.size());
        }
            return ResponseEntity.ok("hi");
    }

    @GetMapping("/items")
    public ResponseEntity<List<AddCart>> getCartItems(HttpSession session) {
        List<AddCart> cartItems = (List<AddCart>) session.getAttribute("cartItems");
        if (cartItems == null) {
            cartItems = new ArrayList<>();
        }
        return ResponseEntity.ok(cartItems);
    }
}
