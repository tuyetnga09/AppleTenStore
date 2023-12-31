package com.example.backend.controller.product_controller.controller.product.server.product_detail;

import com.example.backend.controller.product_controller.model.product_detail.ion.ProductDetailIonAdmin;
import com.example.backend.controller.product_controller.model.product_detail.ion.SkuIonAdmin;
import com.example.backend.controller.product_controller.model.request.ImeiCreateRequest;
import com.example.backend.controller.product_controller.model.respon.ImeiThatLac;
import com.example.backend.controller.product_controller.service.impl.ImeiServiceImpl;
import com.example.backend.controller.product_controller.service.impl.product_detail.ProductDetailServiceImpl;
import com.example.backend.entity.Imei;
import com.example.backend.entity.Product;
import com.example.backend.entity.SKU;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin/product-detail")
public class AdminProductDetailController {
    @Autowired
    private ProductDetailServiceImpl productDetailService;
    @Autowired
    private ImeiServiceImpl imeiService;

    @GetMapping("/get-all-product-detail")
    public ResponseEntity<List<ProductDetailIonAdmin>> getAllProduct() {
        List<ProductDetailIonAdmin> productList = productDetailService.getAllProduct();
        return new ResponseEntity<>(productList, HttpStatus.OK);
    }

    @GetMapping("/get-all-sku")
    public ResponseEntity<List<SkuIonAdmin>> getAllSku(@RequestParam("idProduct") Integer idProduct) {
        List<SkuIonAdmin> skuIonAdmins = productDetailService.getAllSkuWhereIdProduct(idProduct);
        return new ResponseEntity<>(skuIonAdmins, HttpStatus.OK);
    }

    //lấy ra list imei theo idSku
    @GetMapping("/find-all-imeis")
    public ResponseEntity<List<Imei>> getAllImeisWhereIdSku(@RequestParam("idSku") Long idSku) {
        List<Imei> imeiList = productDetailService.getListImeiWherIdSku(idSku);
        return new ResponseEntity<>(imeiList, HttpStatus.OK);
    }

    //lấy ra list imei theo idSku and status
    @GetMapping("/find-imeis-status")
    public ResponseEntity<List<Imei>> getAllImeiWhereIdSkuAndStatus(@RequestParam("idSku") Long idSku,
                                                                    @RequestParam("status") Integer status) {
        List<Imei> imeiList = productDetailService.getAllImeiWhereIdSkuAndStatus(idSku, status);
        return new ResponseEntity<>(imeiList, HttpStatus.OK);
    }

    //delete Product theo idProduct
    @DeleteMapping("/delete-product")
    public ResponseEntity<Boolean> deleteProduct(@RequestParam("idProduct") Integer idProduct) {
        Boolean ckeck = productDetailService.deleteProduct(idProduct);
        return new ResponseEntity<>(ckeck, HttpStatus.OK);
    }

    //return Product theo idProduct
    @GetMapping("/return-product")
    public ResponseEntity<Boolean> returnProduct(@RequestParam("idProduct") Integer idProduct) {
        Boolean ckeck = productDetailService.returnProduct(idProduct);
        return new ResponseEntity<>(ckeck, HttpStatus.OK);
    }

    //xoá sku theo idSku and idProduct
    @DeleteMapping("/delete-sku")
    public ResponseEntity<Boolean> deleteSku(@RequestParam("idSku") Long idSku,
                                             @RequestParam("idProduct") Integer idProduct) {
        Boolean ckeck = productDetailService.deleteSku(idSku, idProduct);
        return new ResponseEntity<>(ckeck, HttpStatus.OK);
    }

    //khôi phục sku theo idSku and idProduct
    @GetMapping("/return-sku")
    public ResponseEntity<Boolean> returnSku(@RequestParam("idSku") Long idSku,
                                             @RequestParam("idProduct") Integer idProduct) {
        Boolean ckeck = productDetailService.returnSku(idSku, idProduct);
        return new ResponseEntity<>(ckeck, HttpStatus.OK);
    }

    //delete imei (cập nhật status imei =1)
    @DeleteMapping("/delete-imei")
    public ResponseEntity<Boolean> deleteImei(@RequestParam("idImei") Integer idImei) {
        Boolean check = productDetailService.deleteImei(idImei);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    //return imei (cập nhật status imei =1)
    @GetMapping("/return-imei")
    public ResponseEntity<Boolean> returnImei(@RequestParam("idImei") Integer idImei) {
        Boolean check = productDetailService.returnImei(idImei);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    //add 1 imei
    @PostMapping("/add-imei")
    public ResponseEntity<Imei> addOneImei(@RequestBody ImeiCreateRequest imeiCreateRequest) {
        Imei imeicreate = productDetailService.addOneImei(imeiCreateRequest);
        return new ResponseEntity<>(imeicreate, HttpStatus.OK);
    }

    //check gia sku đã tồn tại chưa
    @GetMapping("/check-gia-sku")
    public ResponseEntity<Boolean> checkGiaSku(@RequestParam("idSku") Long idSku) {
        Boolean check = productDetailService.checkGiaSku(idSku);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    //lấy ra đối tượng SkuIonAdmin
    @GetMapping("/get-skuionadmin")
    public ResponseEntity<SkuIonAdmin> getSkuIonAdmin(@RequestParam("idSku") Long idSku) {
        SkuIonAdmin check = productDetailService.getSkuIonAdmin(idSku);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    // cập nhật các imei đã được chọn thành status =1 (đã xoá)
    @PutMapping("/delete-imeis")
    public ResponseEntity<Boolean> deleteImeiCheckbox(@RequestParam("listImei") List<String> listImei) {
        Integer status = 1;
        Boolean check = productDetailService.checkBoxListImei(listImei, status);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    // cập nhật các imei đã được chọn thành status =0 (hoat dong)
    @PutMapping("/update-imeis")
    public ResponseEntity<Boolean> updateImeiCheckbox(@RequestParam("listImei") List<String> listImei) {
        Integer status = 0;
        Boolean check = productDetailService.checkBoxListImei(listImei, status);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    //cập nhật all imei hoạt động -> xoá
    @PutMapping("/delete-all-imei")
    public ResponseEntity<Boolean> deleteAllImei(@RequestParam("idSku") Long idSku) {
        Integer statusBeforeUpdate = 0;
        Integer statusAfterUpdate = 1;
        Boolean check = productDetailService.updateAllImei(statusAfterUpdate, idSku, statusBeforeUpdate);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    //cập nhật all imei   xoá ->  hoạt động
    @PutMapping("/return-all-imei")
    public ResponseEntity<Boolean> returnAllImei(@RequestParam("idSku") Long idSku) {
        Integer statusBeforeUpdate = 0;
        Integer statusAfterUpdate = 1;
        Boolean check = productDetailService.updateAllImei(statusBeforeUpdate, idSku, statusAfterUpdate);
        return new ResponseEntity<>(check, HttpStatus.OK);
    }

    //seach imei (codeImei , status)
    @GetMapping("/seach-imeis")
    public ResponseEntity<List<Imei>> seachImeis(@RequestParam("codeImei") String codeImei,
                                                 @RequestParam("status") Integer status,
                                                 @RequestParam("idSku") Long idSku) {
        List<Imei> imeis = productDetailService.seachImeis(codeImei, status, idSku);
        return new ResponseEntity<>(imeis, HttpStatus.OK);
    }

    //seach imei thất lạc(tìm kiêm trên all imei)
    @GetMapping("/seach-imei-that-lac")
    public ResponseEntity<List<ImeiThatLac>> seachImeiThatLac(@RequestParam("codeImei") String codeImei) {
        List<ImeiThatLac> imeiThatLacs = productDetailService.seachImeisThatLac(codeImei);
        return new ResponseEntity<>(imeiThatLacs, HttpStatus.OK);
    }

    //detail imei
    @GetMapping("/detail-imei")
    public ResponseEntity<Imei> detail(@RequestParam("id") Integer id) {
        Imei imei = productDetailService.getOneImei(id);
        return new ResponseEntity<>(imei, HttpStatus.OK);
    }

    // update imei
    @PutMapping("/update-imei/{id}")
    public ResponseEntity<Boolean> updateImei(@RequestBody Imei imei, @PathVariable("id") Integer id) {
        Boolean update = productDetailService.update(imei, id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    // update gia sku
    @PutMapping("/update-price-sku/{id}")
    public ResponseEntity<Boolean> updateSku(@RequestBody SKU sku, @PathVariable("id") Long id) {
        Boolean update = productDetailService.updateSku(sku, id);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }


}
