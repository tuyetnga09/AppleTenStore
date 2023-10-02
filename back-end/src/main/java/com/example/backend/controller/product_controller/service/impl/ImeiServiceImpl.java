package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Imei;
import com.example.backend.entity.Product;
import com.example.backend.entity.SKU;
import com.example.backend.repository.ImeiRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.SKURepositoty;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ImeiServiceImpl implements Iservice<Imei> {

    @Autowired
    private ImeiRepository imeiRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SKURepositoty skuRepository;
    @Override
    public Page getAll(Pageable pageable) {
        return imeiRepository.findAll(pageable);
    }

    public Page<Imei> getDelete(Pageable pageable, String key) {
        return imeiRepository.deleteImei(pageable, key);
    }

    @Override
    public void insert(Imei imei) {
        imeiRepository.save(imei);
    }

    @Override
    public void update(Imei imei, Integer id) {

    }

    @Override
    public void delete(Integer id) {
        if (imeiRepository.existsById(id)){
            imeiRepository.deleteById(id);
        }
    }

    @Override
    public void delete(Imei imei) {
        imei.setStatus(1);
        imeiRepository.save(imei);
    }

    @Override
    public void returnDelete(Imei imei) {
        imei.setStatus(0);
        imeiRepository.save(imei);
    }

    public Page<Imei> search(Pageable pageable, String key) {
        return imeiRepository.search(pageable, key);
    }

    public Imei getOne(Integer id) {
        return imeiRepository.findById(id).get();
    }


    public void importImeiDataFromExcel(MultipartFile file) throws IOException {
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0); // Sheet cần đọc

        for (Row row : sheet) {
            if (row.getRowNum() == 0) {
                continue; // Bỏ qua hàng tiêu đề
            }

            String codeImei = row.getCell(0).getStringCellValue();
            int productId = (int) row.getCell(1).getNumericCellValue();
            int skuId = (int) row.getCell(2).getNumericCellValue();

            // Tìm sản phẩm và SKU tương ứng
            Product product = productRepository.findById(productId).orElse(null);
            SKU sku = skuRepository.findById((long) skuId).orElse(null);

            if (product != null && sku != null) {
                Imei imei = new Imei();
                imei.setCodeImei(codeImei);
                imei.setIdProduct(product);
                imei.setIdSku(sku);
                imeiRepository.save(imei);
            }
        }

        workbook.close();
    }

    // đọc file imei ----------
    public void readImportFile(MultipartFile file) throws IOException {
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0); // Sheet cần đọc

        for (Row row : sheet) {
            if (row.getRowNum() == 0) {
                continue; // Bỏ qua hàng tiêu đề
            }
//            if(){
//
//            }

            String codeImei = row.getCell(0).getStringCellValue();
            int productId = (int) row.getCell(1).getNumericCellValue();
            int skuId = (int) row.getCell(2).getNumericCellValue();

            // Tìm sản phẩm và SKU tương ứng
            Product product = productRepository.findById(productId).orElse(null);
            SKU sku = skuRepository.findById((long) skuId).orElse(null);

            if (product != null && sku != null) {
                Imei imei = new Imei();
                imei.setCodeImei(codeImei);
                imei.setIdProduct(product);
                imei.setIdSku(sku);
                imeiRepository.save(imei);
            }
        }

        workbook.close();
    }

}
