package com.example.backend.controller.product_controller.service.impl.product_detail;

import com.example.backend.controller.product_controller.model.product_detail.ion.ProductDetailIonAdmin;
import com.example.backend.controller.product_controller.model.product_detail.ion.SkuIonAdmin;
import com.example.backend.controller.product_controller.service.IProductDetailService;
import com.example.backend.entity.Color;
import com.example.backend.entity.Imei;
import com.example.backend.entity.Product;
import com.example.backend.entity.SKU;
import com.example.backend.repository.ImeiRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.SKURepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductDetailServiceImpl implements IProductDetailService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SKURepositoty skuRepositoty;

    @Autowired
    private ImeiRepository imeiRepository;

    @Override
    public List<ProductDetailIonAdmin> getAllProduct() {
        List<ProductDetailIonAdmin> list = productRepository.getAllProductDetailIon();
        return list;
    }

    @Override
    public List<SkuIonAdmin> getAllSkuWhereIdProduct(Integer idProduct) {
        List<SkuIonAdmin> list = skuRepositoty.getAllSkuIonWhereIdProduct(idProduct);
        return list;
    }

    //lấy ra list imei theo idSku
    @Override
    public List<Imei> getListImeiWherIdSku(Long idSku) {
        List<Imei> list = imeiRepository.getAllImeiWherIdSku(idSku);
        return list;
    }

    //lấy ra list imei theo idSku and status
    @Override
    public List<Imei> getAllImeiWhereIdSkuAndStatus(Long idSku, Integer status) {
        if(status == 99){
            List<Imei> listImei = imeiRepository.getAllImeiWherIdSku(idSku);
            return listImei;
        }
        List<Imei> list = imeiRepository.getAllImeiWherIdSkuAndStatus(idSku, status);
        return list;
    }

    //delete Product theo idProduct
    @Override
    public Boolean deleteProduct(Integer idProduct) {
        //khi xoá 1 product thì cập nhật lại tất cả sku -> status =1 (đã xoá)
        // cập nhật tất cả imei của product -> status=1 (đã xoá)
        Boolean isCheck = productRepository.existsById(idProduct);
        if (isCheck){
            //lấy ra product cần cập nhật
            Product product = productRepository.findById(idProduct).get();
            product.setStatus(1); // sét lại status 1 - đã xoá
            productRepository.save(product); // cập nhật lại product

            //update status sku wher idproduct (status =1 đã xoá) statusWhere = 0 hoạt động -> chuyển từ hoạt động qua đã xoá
            skuRepositoty.updateStatusSkuWhereIdProduct(1, idProduct, 0);

            //update status imei wher idproduct (status =1 đã xoá) statusWhere = 0 hoạt động -> chuyển từ hoạt động qua đã xoá
            imeiRepository.updateStatusImeiWhereIdProduct(1, idProduct, 0);

            return true;
        }
        return false;
    }

    //return Product theo idProduct
    @Override
    public Boolean returnProduct(Integer idProduct) {
        //khi return 1 product thì cập nhật lại tất cả sku -> status =0 (hoạt động)
        // cập nhật tất cả imei của product -> status=0 (hoạt động)
        Boolean isCheck = productRepository.existsById(idProduct);
        if (isCheck){
            //lấy ra product cần cập nhật
            Product product = productRepository.findById(idProduct).get();
            product.setStatus(0); // sét lại status 0 - hoạt động
            productRepository.save(product); // cập nhật lại product

            //update status sku wher idproduct (status =0 hoạt động) statusWhere = 0 đã xoá -> chuyển từ đã xoá qua hoạt động
            skuRepositoty.updateStatusSkuWhereIdProduct(0, idProduct, 1);

            //update status imei wher idproduct (status =0 hoạt động) statusWhere = 0 đã xoá -> chuyển từ đã xoá qua hoạt động
            imeiRepository.updateStatusImeiWhereIdProduct(0, idProduct, 1);
            return true;
        }
        return false;
    }

    //xoá sku theo idSku and idProduct
    @Override
    public Boolean deleteSku(Long idSku, Integer idProduct) {
        Boolean isCheckProduct = productRepository.existsById(idProduct);
        Boolean isCheckSku = skuRepositoty.existsById(idSku);
        if (!isCheckProduct){
            return false;
        }
        Product product = productRepository.findById(idProduct).get();
        SKU sku = skuRepositoty.findById(idSku).get();
        if (isCheckSku && product.getStatus()==0 && sku.getStatus()==0){
            //update status sku wher idproduct (status =1 đã xoá) statusWhere = 0 hoạt động -> chuyển từ hoạt động qua đã xoá
            sku.setStatus(1);
            skuRepositoty.save(sku);
            //update status imei wher idproduct (status =1 đã xoá) statusWhere = 0 hoạt động -> chuyển từ hoạt động qua đã xoá
            imeiRepository.updateStatusImeiWhereIdSku(1, idSku, 0);
            return true;
        }
        return false;
    }

    //khôi phục sku theo idSku and idProduct
    @Override
    public Boolean returnSku(Long idSku, Integer idProduct) {
        Boolean isCheckProduct = productRepository.existsById(idProduct);
        Boolean isCheckSku = skuRepositoty.existsById(idSku);
        if (!isCheckProduct){
            return false;
        }
        Product product = productRepository.findById(idProduct).get();
        SKU sku = skuRepositoty.findById(idSku).get();
        //kiểm tra product xem thử status có hoạt động hay không,
        // nếu status =1 nghĩa là product đó đã xoá nên không thể cập nhật lại sku của product đó
        if (isCheckSku && product.getStatus()==0 && sku.getStatus()==1){
            //update status sku wher idproduct (status =0 hoạt động) statusWhere = 1 đã xoá -> chuyển từ đã xoá qua hoạt động
            sku.setStatus(0);
            skuRepositoty.save(sku);

            //update status imei wher idproduct (status =0 hoạt động) statusWhere = 1 đã xoá -> chuyển từ đã xoá qua hoạt động
            imeiRepository.updateStatusImeiWhereIdSku(0, idSku, 1);
            return true;
        }
        return false;
    }
}
