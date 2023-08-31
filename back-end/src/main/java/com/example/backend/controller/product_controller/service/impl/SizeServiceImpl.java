package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.SizeRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Size;
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
public class SizeServiceImpl implements Iservice<Size> {

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public Page<Size> getAll(Pageable pageable) {
        return sizeRepository.findAll(pageable);
    }

    public Page<Size> getDelete(Pageable pageable, String key) {
        return sizeRepository.deleteSize(pageable, key);
    }

    @Override
    public void insert(Size size) {
        sizeRepository.save(size);
    }

    @Override
    public void update(Size size, Integer id) {
        Size size1 = sizeRepository.findById(id).orElse(null);
        size1.setCode(size.getCode());
        size1.setName(size.getName());
        sizeRepository.save(size1);
    }

    @Override
    public void delete(Integer id) {
        if (sizeRepository.existsById(id)){
            sizeRepository.deleteById(id);
        }
    }
    @Override
    public void delete(Size size) {
        size.setStatus(1);
        sizeRepository.save(size);
    }

    @Override
    public void returnDelete(Size size) {
        size.setStatus(0);
        sizeRepository.save(size);
    }

    public Size getOne(Integer id) {
        return sizeRepository.findById(id).get();
    }

    public void importDataFromExcel(MultipartFile file) throws Exception{
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0); // dữ liệu lấy ở sheet đầu tiên

        for (Row row: sheet){
            if(row.getRowNum() == 0){
                continue;
            }

            String code = row.getCell(0).getStringCellValue();
            Size existingSize = sizeRepository.findByCode(code);

            if(existingSize != null){
                //Đã tồn tại
                existingSize.setName(row.getCell(1).getStringCellValue());
                existingSize.setDateUpdate(new Date());
                existingSize.setPersonUpdate(row.getCell(3).getStringCellValue());
                sizeRepository.save(existingSize);
            }else {
                //Chưa tồn tại thêm mới
                Size newSize = new Size();
                newSize.setCode(code);
                newSize.setName(row.getCell(1).getStringCellValue());
                newSize.setDateCreate(new Date());
                newSize.setDateUpdate(new Date());
                newSize.setPersonCreate(row.getCell(2).getStringCellValue());
                newSize.setPersonUpdate(row.getCell(3).getStringCellValue());
                newSize.setStatus(0);
                sizeRepository.save(newSize);
            }
        }

        workbook.close();
    }

    public Page<Size> search(Pageable pageable, String key) {
        return sizeRepository.search(pageable, key);
    }
}