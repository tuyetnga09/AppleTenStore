package com.example.backend.controller.product_controller.service.impl.product_detail;

import com.example.backend.controller.product_controller.model.product_detail.ion.ProductDetailIonAdmin;
import com.example.backend.controller.product_controller.model.product_detail.ion.SkuIonAdmin;
import com.example.backend.controller.product_controller.model.request.ImeiCreateRequest;
import com.example.backend.controller.product_controller.model.respon.ImeiThatLac;
import com.example.backend.controller.product_controller.service.IProductDetailService;
import com.example.backend.entity.Bill;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.Color;
import com.example.backend.entity.Imei;
import com.example.backend.entity.ImeiDaBan;
import com.example.backend.entity.Product;
import com.example.backend.entity.SKU;
import com.example.backend.repository.BillDetailRepository;
import com.example.backend.repository.BillRepository;
import com.example.backend.repository.ImeiDaBanRepository;
import com.example.backend.repository.ImeiRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.SKURepositoty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductDetailServiceImpl implements IProductDetailService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SKURepositoty skuRepositoty;

    @Autowired
    private ImeiRepository imeiRepository;

    @Autowired
    private ImeiDaBanRepository imeiDaBanRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private BillDetailRepository billDetailRepository;

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
        if (status == 99) {
            List<Imei> listImei = imeiRepository.getAllImeiWherIdSku(idSku);
            return listImei;
        }
        if (status == 3){
            List<Imei> listImeiStatus = imeiRepository.getAllImeiWherIdSkuDaBan(idSku, status);
            return listImeiStatus;
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
        if (isCheck) {
            //lấy ra product cần cập nhật
            Product product = productRepository.findById(idProduct).get();
            product.setStatus(1); // sét lại status 1 - đã xoá
            productRepository.save(product); // cập nhật lại product

            //tạm thời không cho xoá sku nữa
            //update status sku wher idproduct (status =1 đã xoá) statusWhere = 0 hoạt động -> chuyển từ hoạt động qua đã xoá
//            skuRepositoty.updateStatusSkuWhereIdProduct(1, idProduct, 0);

            //tạm thời không cho xoá imei nữa
            //update status imei wher idproduct (status =1 đã xoá) statusWhere = 0 hoạt động -> chuyển từ hoạt động qua đã xoá
//            imeiRepository.updateStatusImeiWhereIdProduct(1, idProduct, 0);

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
        if (isCheck) {
            //lấy ra product cần cập nhật
            Product product = productRepository.findById(idProduct).get();
            product.setStatus(0); // sét lại status 0 - hoạt động
            productRepository.save(product); // cập nhật lại product

            //tạm thời không cho xoá sku nữa
            //update status sku wher idproduct (status =0 hoạt động) statusWhere = 0 đã xoá -> chuyển từ đã xoá qua hoạt động
            //skuRepositoty.updateStatusSkuWhereIdProduct(0, idProduct, 1);

            //tạm thời không cho xoá imei nữa
            //update status imei wher idproduct (status =0 hoạt động) statusWhere = 0 đã xoá -> chuyển từ đã xoá qua hoạt động
            //imeiRepository.updateStatusImeiWhereIdProduct(0, idProduct, 1);
            return true;
        }
        return false;
    }

    //xoá sku theo idSku and idProduct
    @Override
    public Boolean deleteSku(Long idSku, Integer idProduct) {
        Boolean isCheckProduct = productRepository.existsById(idProduct);
        Boolean isCheckSku = skuRepositoty.existsById(idSku);
        if (!isCheckProduct) {
            return false;
        }
        Product product = productRepository.findById(idProduct).get();
        SKU sku = skuRepositoty.findById(idSku).get();
        if (isCheckSku && product.getStatus() == 0 && sku.getStatus() == 0) {
            //update status sku wher idproduct (status =1 đã xoá) statusWhere = 0 hoạt động -> chuyển từ hoạt động qua đã xoá
            sku.setStatus(1);
            skuRepositoty.save(sku);
            //tạm thời không cho xoá imei nữa
            //update status imei wher idproduct (status =1 đã xoá) statusWhere = 0 hoạt động -> chuyển từ hoạt động qua đã xoá
            //imeiRepository.updateStatusImeiWhereIdSku(1, idSku, 0);
            return true;
        }
        return false;
    }

    //khôi phục sku theo idSku and idProduct
    @Override
    public Boolean returnSku(Long idSku, Integer idProduct) {
        Boolean isCheckProduct = productRepository.existsById(idProduct);
        Boolean isCheckSku = skuRepositoty.existsById(idSku);
        if (!isCheckProduct) {
            return false;
        }
        Product product = productRepository.findById(idProduct).get();
        SKU sku = skuRepositoty.findById(idSku).get();
        //kiểm tra product xem thử status có hoạt động hay không,
        // nếu status =1 nghĩa là product đó đã xoá nên không thể cập nhật lại sku của product đó
        if (isCheckSku && product.getStatus() == 0 && sku.getStatus() == 1) {
            //update status sku wher idproduct (status =0 hoạt động) statusWhere = 1 đã xoá -> chuyển từ đã xoá qua hoạt động
            sku.setStatus(0);
            skuRepositoty.save(sku);
            //tạm thời không cho xoá imei nữa
            //update status imei wher idproduct (status =0 hoạt động) statusWhere = 1 đã xoá -> chuyển từ đã xoá qua hoạt động
            //imeiRepository.updateStatusImeiWhereIdSku(0, idSku, 1);
            return true;
        }
        return false;
    }

    //delete imei (cập nhật status imei =1)
    @Override
    public Boolean deleteImei(Integer idImei) {
        Boolean isCheck = imeiRepository.existsById(idImei);
        if (isCheck) {
            Imei imei = imeiRepository.findById(idImei).get();
            if (imei.getIdProduct().getStatus() == 0 && imei.getIdSku().getStatus() == 0) {
                imei.setStatus(1);
                imeiRepository.save(imei);

                return true;
            }
        }
        return false;
    }

    //return imei (cập nhật status imei =0)
    @Override
    public Boolean returnImei(Integer idImei) {
        Boolean isCheck = imeiRepository.existsById(idImei);
        if (isCheck) {
            Imei imei = imeiRepository.findById(idImei).get();
            if (imei.getIdProduct().getStatus() == 0 && imei.getIdSku().getStatus() == 0) {
                imei.setStatus(0);
                imeiRepository.save(imei);
                return true;
            }
        }
        return false;
    }

    //check gia sku đã tồn tại chưa
    @Override
    public Boolean checkGiaSku(Long idSku) {
        SKU sku = skuRepositoty.findById(idSku).get();
        if (sku.getPrice() == null) {
            return false;
        }
        return true;
    }


    // add 1 imei
    @Override
    public Imei addOneImei(ImeiCreateRequest imeiCreateRequest) {
        Imei imei = imeiRepository.findByCodeImei(imeiCreateRequest.getCodeImei());
        if (imei == null) {
            Imei imeiCreate = new Imei();
            imeiCreate.setCodeImei(imeiCreateRequest.getCodeImei());
            SKU sku = skuRepositoty.findById(imeiCreateRequest.getIdSku()).get();
            if (sku.getPrice() == null) {
                sku.setPrice(imeiCreateRequest.getPrice());
                sku.setQuantity(1);
                skuRepositoty.save(sku);
            } else {
                sku.setQuantity(sku.getQuantity() + 1);
                skuRepositoty.save(sku);
            }

            imeiCreate.setIdSku(sku);

//            imeiCreate.
            Product product = productRepository.findById(imeiCreateRequest.getIdProduct()).get();
            imeiCreate.setIdProduct(product);
            return imeiRepository.save(imeiCreate);
        } else {
            return null;
        }
    }

    //lấy ra đối tượng SkuIonAdmin
    @Override
    public SkuIonAdmin getSkuIonAdmin(Long idSku) {
        SkuIonAdmin skuIonAdmin = skuRepositoty.getOneSkuIonWhereIdSku(idSku);
        return skuIonAdmin;
    }

    // cập nhật các imei đã được chọn thành status =1 (đã xoá)  status =0 (hoat dong)
    @Override
    public Boolean checkBoxListImei(List<String> codeImeis, Integer status) {
        List<Imei> imeiList = new ArrayList<>();
        //kiểm tra list imei có giá trị không
        if (codeImeis.size() == 0 || codeImeis == null) {
            return false;
        } else {
            for (String codeImei : codeImeis) {
                Imei imei = imeiRepository.findByCodeImei(codeImei);
                //kiểm tra đối tượng được tìm kiếm có hay không
                if (imei != null) {
                    imeiList.add(imei);
                } else {
                    return false;
                }
            }
        }
        //nếu list mà rỗng thì list imei tuyền vào có vấn đề
        if (imeiList.size() == 0) {
            return false;
        } else {
            //nếu ok rồi thì update lại tất cả imei trong list là status = 1 - status =0 (hoat dong)
            for (Imei imei : imeiList) {
                //cập nhâtj imei (updateStatusImei(status, idImei))
                imeiRepository.updateStatusImei(status, imei.getId()); // xoá
            }
            return true;
        }
    }

    //cập nhật all imei hoạt động -> xoá  <=>  xoá ->  hoạt động
    @Override
    public Boolean updateAllImei(Integer statusUpdate, Long idSku, Integer status) {
        Boolean isCkeck = skuRepositoty.existsById(idSku);
        if (isCkeck) {
            imeiRepository.updateImeiStatusWherIdSku(statusUpdate, idSku, status);
            return true;
        }
        return false;
    }

    //seach imei (codeImei , status)
    @Override
    public List<Imei> seachImeis(String codeImei, Integer status, Long idSku) {
        List<Imei> imeis = new ArrayList<>();

        if (status == 99 || status.equals("")) {
            imeis = imeiRepository.seachAllImeis(codeImei.trim(), idSku);
        } else {
            imeis = imeiRepository.seachImeisWhereStatus(codeImei.trim(), status, idSku);
        }
        return imeis;
    }

    //tìm kiếm imei thất lạc
    @Override
    public List<ImeiThatLac> seachImeisThatLac(String codeImei) {
        // lấy ra đối tượng imei theo codeImei xem có trong DB không
        Imei imeiFind = imeiRepository.findByCodeImei(codeImei.trim());
        List<ImeiThatLac> imeiThatLacs = new ArrayList<>();
        if (imeiFind == null) {
            return imeiThatLacs;
        }
        if (imeiFind.getStatus() == 0 || imeiFind.getStatus() == 1) {
            ImeiThatLac imeiThatLac = new ImeiThatLac();
            imeiThatLac.setCodeBill("-");
            imeiThatLac.setTypeBill("-");
            imeiThatLac.setStatusImei(imeiFind.getStatus());
            imeiThatLac.setNameProduct(imeiFind.getIdProduct().getName());
            imeiThatLac.setCapacity(imeiFind.getIdSku().getCapacity());
            imeiThatLac.setColor(imeiFind.getIdSku().getColor());
            imeiThatLac.setGia(imeiFind.getIdSku().getPrice());

            imeiThatLacs.add(imeiThatLac);
            return imeiThatLacs;
        }

        if (imeiFind.getStatus() == 2 || imeiFind.getStatus() == 3) {
            ImeiThatLac imeiThatLac = new ImeiThatLac();
            imeiThatLac.setStatusImei(imeiFind.getStatus());
            imeiThatLac.setNameProduct(imeiFind.getIdProduct().getName());
            imeiThatLac.setCapacity(imeiFind.getIdSku().getCapacity());
            imeiThatLac.setColor(imeiFind.getIdSku().getColor());
            imeiThatLac.setGia(imeiFind.getIdSku().getPrice());

            ImeiDaBan imeiDaBan = imeiDaBanRepository.findByCodeImei(codeImei.trim());
//            BillDetails billDetails = billDetailRepository.findById(imeiDaBan.getBillDetail().getId()).get();
            imeiThatLac.setCodeBill(imeiDaBan.getBillDetail().getBill().getCode());
            imeiThatLac.setTypeBill(String.valueOf(imeiDaBan.getBillDetail().getBill().getTypeBill()));

            imeiThatLacs.add(imeiThatLac);
            return imeiThatLacs;
        }

        return imeiThatLacs;
    }

    //update imei
    @Override
    public Boolean update(Imei imei, Integer id) {
        Boolean idCheck = imeiRepository.existsById(id);
        if (idCheck) {
            Imei imeiUpdate = imeiRepository.findById(id).get();
            imeiUpdate.setCodeImei(imei.getCodeImei());
            imeiRepository.save(imeiUpdate);
            return true;
        }
        return false;
    }

    @Override
    public Imei getOneImei(Integer idImei) {
        Boolean idCheck = imeiRepository.existsById(idImei);
        if (idCheck) {
            Imei imei = imeiRepository.findById(idImei).get();
            return imei;
        }
        return null;
    }


    //update sku
    @Override
    public Boolean updateSku(SKU sku, Long id) {
        Boolean idCheck = skuRepositoty.existsById(id);
        if (idCheck) {
            SKU skuUpdate = skuRepositoty.findById(id).get();
            skuUpdate.setPrice(sku.getPrice());
            skuRepositoty.save(skuUpdate);
            return true;
        }
        return false;
    }
}
