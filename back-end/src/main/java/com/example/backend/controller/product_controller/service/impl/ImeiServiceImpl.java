package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.ImeiRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Imei;
import com.example.backend.entity.Product;
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

@Service
public class ImeiServiceImpl implements Iservice<Imei> {

    @Autowired
    private ImeiRepository imeiRepository;

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

        for (Row row: sheet){
            if(row.getRowNum() == 0){
                continue;
            }

            String code = String.valueOf((int) row.getCell(0).getNumericCellValue());
            Imei existingImei = imeiRepository.findByCodeImei(code);

            if(existingImei != null){
                //Đã tồn tại
                existingImei.setDateUpdate(new Date());
                existingImei.setPersonUpdate(row.getCell(3).getStringCellValue());
                imeiRepository.save(existingImei);
            }else {
                //Chưa tồn tại thêm mới
                Imei newImei = new Imei();
                Product product = new Product();
                product.setId((int) row.getCell(1).getNumericCellValue());
                newImei.setCodeImei(code);
                newImei.setIdProduct(product);
                newImei.setDateCreate(new Date());
                newImei.setDateUpdate(new Date());
                newImei.setPersonCreate(row.getCell(2).getStringCellValue());
                newImei.setPersonUpdate(row.getCell(3).getStringCellValue());
                newImei.setStatus(0);
                imeiRepository.save(newImei);
            }
        }

        workbook.close();
    }
}
