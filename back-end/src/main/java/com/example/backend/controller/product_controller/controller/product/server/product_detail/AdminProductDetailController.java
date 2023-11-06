package com.example.backend.controller.product_controller.controller.product.server.product_detail;

import com.example.backend.controller.product_controller.model.product_detail.ion.ProductDetailIonAdmin;
import com.example.backend.controller.product_controller.model.product_detail.ion.SkuIonAdmin;
import com.example.backend.controller.product_controller.service.impl.product_detail.ProductDetailServiceImpl;
import com.example.backend.entity.Imei;
import com.example.backend.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/product-detail")
public class AdminProductDetailController {
    @Autowired
    private ProductDetailServiceImpl productDetailService;

    @GetMapping("/get-all-product-detail")
    public ResponseEntity<List<ProductDetailIonAdmin>> getAllProduct(){
        List<ProductDetailIonAdmin> productList = productDetailService.getAllProduct();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }
    @GetMapping("/get-all-sku")
    public ResponseEntity<List<SkuIonAdmin>> getAllSku(@RequestParam("idProduct") Integer idProduct){
        List<SkuIonAdmin> skuIonAdmins = productDetailService.getAllSkuWhereIdProduct(idProduct);
        return new ResponseEntity<>(skuIonAdmins, HttpStatus.OK);
    }

    //lấy ra list imei theo idSku
    @GetMapping("/find-all-imeis")
    public ResponseEntity<List<Imei>> getAllImeisWhereIdSku(@RequestParam("idSku") Long idSku){
        List<Imei> imeiList = productDetailService.getListImeiWherIdSku(idSku);
        return new ResponseEntity<>(imeiList, HttpStatus.OK);
    }

    //lấy ra list imei theo idSku and status
    @GetMapping("/find-imeis-status")
    public ResponseEntity<List<Imei>> getAllImeiWhereIdSkuAndStatus(@RequestParam("idSku") Long idSku,
                                                                    @RequestParam("status") Integer status){
        List<Imei> imeiList = productDetailService.getAllImeiWhereIdSkuAndStatus(idSku, status);
        return new ResponseEntity<>(imeiList, HttpStatus.OK);
    }

    //delete Product theo idProduct
    @DeleteMapping("/delete-product")
    public ResponseEntity<Boolean> deleteProduct(@RequestParam("idProduct") Integer idProduct){
        Boolean ckeck = productDetailService.deleteProduct(idProduct);
        return new ResponseEntity<>(ckeck, HttpStatus.OK);
    }

    //return Product theo idProduct
    @GetMapping("/return-product")
    public ResponseEntity<Boolean> returnProduct(@RequestParam("idProduct") Integer idProduct){
        Boolean ckeck = productDetailService.returnProduct(idProduct);
        return new ResponseEntity<>(ckeck, HttpStatus.OK);
    }

    //xoá sku theo idSku and idProduct
    @DeleteMapping("/delete-sku")
    public ResponseEntity<Boolean> deleteSku(@RequestParam("idSku") Long idSku,
                                             @RequestParam("idProduct") Integer idProduct){
        Boolean ckeck = productDetailService.deleteSku(idSku, idProduct);
        return new ResponseEntity<>(ckeck, HttpStatus.OK);
    }

    //khôi phục sku theo idSku and idProduct
    @GetMapping("/return-sku")
    public ResponseEntity<Boolean> returnSku(@RequestParam("idSku") Long idSku,
                                             @RequestParam("idProduct") Integer idProduct){
        Boolean ckeck = productDetailService.returnSku(idSku, idProduct);
        return new ResponseEntity<>(ckeck, HttpStatus.OK);
    }

    //delete imei (cập nhật status imei =1)
    @DeleteMapping("/delete-imei")
    public ResponseEntity<Boolean> deleteImei(@RequestParam("idImei") Integer idImei){
        Boolean check = productDetailService.deleteImei(idImei);
        return  new ResponseEntity<>(check, HttpStatus.OK);
    }

    //return imei (cập nhật status imei =1)
    @GetMapping("/return-imei")
    public ResponseEntity<Boolean> returnImei(@RequestParam("idImei") Integer idImei){
        Boolean check = productDetailService.returnImei(idImei);
        return  new ResponseEntity<>(check, HttpStatus.OK);
    }
}
