package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Imei;
import com.example.backend.entity.Product;
import com.example.backend.repository.ImeiRepository;
import com.example.backend.repository.ProductRepository;
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

import java.io.InputStream;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class ImeiServiceImpl implements Iservice<Imei> {

    @Autowired
    private ImeiRepository imeiRepository;

    @Autowired
    private ProductRepository productRepository;

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

    public void importDataFromExcel(MultipartFile file) throws Exception{
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0); // dữ liệu lấy ở sheet đầu tiên
        Set<Integer> values = new HashSet<>();
        int count = 1;
        Product product = null;
        for (Row row: sheet){
            if(row.getRowNum() == 0){
                continue;
            }

            String code = String.valueOf((int) row.getCell(0).getNumericCellValue());
            Imei existingImei = imeiRepository.findByCodeImei(code);
            product = productRepository.findProductById((int) row.getCell(1).getNumericCellValue());
            if (product != null){
                if(existingImei != null){
                    //Đã tồn tại
                    count = 0;
                    existingImei.setDateUpdate(new Date());
                    existingImei.setPersonUpdate(row.getCell(3).getStringCellValue());
                    imeiRepository.save(existingImei);
                }else {
                    //Chưa tồn tại thêm mới
                    Imei newImei = new Imei();
//                    Product product = new Product();
//                    product.setId((int) row.getCell(1).getNumericCellValue());
                    newImei.setCodeImei(code);
                    newImei.setIdProduct(product);
                    newImei.setDateCreate(new Date());
                    newImei.setDateUpdate(new Date());
                    newImei.setPersonCreate(row.getCell(2).getStringCellValue());
                    newImei.setPersonUpdate(row.getCell(3).getStringCellValue());
                    newImei.setStatus(0);
                    if (!values.contains((int) row.getCell(1).getNumericCellValue())) {
                        values.add((int) row.getCell(1).getNumericCellValue());
                    } else {
                        count++;
                    }
                    imeiRepository.save(newImei);
                }
            }else {
                System.out.println("Product not found");
            }
        }
        if (product.getQuantity() == null){
            product.setQuantity(0);
        }
        product.setQuantity(product.getQuantity() + count);
        productRepository.save(product);
        workbook.close();
    }
}
