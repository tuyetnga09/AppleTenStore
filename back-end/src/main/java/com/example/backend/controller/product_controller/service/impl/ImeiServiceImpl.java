package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.model.request.ImportImei;
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
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

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
        if (imeiRepository.existsById(id)) {
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


    public void importImeiDataFromExcel(MultipartFile file, Long idSku) throws IOException {
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0); // Sheet cần đọc
        List<String> listCodeImei = new ArrayList<>();
        SKU sku = skuRepository.findById(idSku).get(); //lấy ra đối tượng SKU
        Integer countImei = 0;
        for (Row row : sheet) {
            if (row.getRowNum() == 0) {
                continue; // Bỏ qua hàng tiêu đề
            }
            if (row.getCell(1).getStringCellValue().trim().isEmpty()) {
                continue;
            }
            String codeImei = row.getCell(1).getStringCellValue();

            Imei imei = new Imei();
            imei.setCodeImei(codeImei);
            imei.setIdSku(sku);
            imei.setIdProduct(sku.getProduct());

            imeiRepository.save(imei);
            countImei++;
            System.out.println("hihih ------: " + imei.getCodeImei() + "hihih ------: " + imei.getIdSku() +
                    "hihih ------: "  + imei.getIdProduct().getId());
        }
        System.out.println("--------------------- countImei: "+countImei);
        sku.setQuantity(countImei);
        skuRepository.save(sku);

        workbook.close();
    }

//    // đọc file imei ----------
//    public List<ImportImei> readImportFile(MultipartFile file) throws IOException {
//        InputStream inputStream = file.getInputStream();
//        Workbook workbook = new XSSFWorkbook(inputStream);
//        Sheet sheet = workbook.getSheetAt(0); // Sheet cần đọc
//
//        List<ImportImei> importImeiList = new ArrayList<>(); // danh sách imei hợp lệ
//
////        List<ImportImei> wrongList = new ArrayList<>(); // danh sách imei lỗi - tạm thời chưa làm
//        for (Row row : sheet) {
//            if (row.getRowNum() == 0) {
//                continue; // Bỏ qua hàng tiêu đề
//            }
//            if (row.getCell(1).getStringCellValue().trim() == null || row.getCell(2).getStringCellValue().trim() == null
//                    || row.getCell(3).getStringCellValue().trim() == null || row.getCell(4).getStringCellValue().trim() == null) {
////                wrongList.add(row); //tạm thời chưa làm
//                continue; // bỏ qua các hàng có imei rỗng
//            }
//
//            String codeImei = row.getCell(1).getStringCellValue().trim();
////            String color = row.getCell(3).getStringCellValue().trim();
////            String capacity = row.getCell(4).getStringCellValue().trim();
//            BigDecimal price = BigDecimal.valueOf(Long.parseLong(row.getCell(2).getStringCellValue().trim()));
//
//            ImportImei importImei = new ImportImei();
//            importImei.setCodeImei(codeImei);
////            importImei.setColor(color);
////            importImei.setCapacity(capacity);
//            importImei.setPrice(price);
//
//            importImeiList.add(importImei);
//        }
//        workbook.close();
//        System.out.println("Danh sach imei: " + importImeiList.size() + "------------------------------------");
//        return importImeiList;
//    }

}
