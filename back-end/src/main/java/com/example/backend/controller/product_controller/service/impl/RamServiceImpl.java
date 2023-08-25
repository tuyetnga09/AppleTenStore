package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.RamRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Category;
import com.example.backend.entity.Ram;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.InputStream;
import java.util.Date;

@Service
public class RamServiceImpl implements Iservice<Ram> {
    @Autowired
    private RamRepository ramRepository;


    @Override
    public Page<Ram> getAll(Pageable pageable) {
        return ramRepository.findAll(pageable);
    }

    public Page<Ram> getDelete(Pageable pageable) {
        return ramRepository.deleteRam(pageable);
    }

    @Override
    public void insert(Ram ram) {
        ram.setDateCreate(new Date());
        ram.setDateUpdate(new Date());
        ram.setStatus(0);
        ramRepository.save(ram);
    }

    @Override
    public void update(Ram ram, Integer id) {
        Ram ramId = getOne(ram.getId());
        ram.setDateUpdate(new Date());
        ram.setDateCreate(ramId.getDateCreate());
        ram.setStatus(ramId.getStatus());
        ramRepository.save(ram);
    }

    @Override
    public void delete(Integer id) {
        ramRepository.deleteById(id);
    }

    @Override
    public void delete(Ram ram) {
        ram.setStatus(1);
        ramRepository.save(ram);

    }

    @Override
    public void returnDelete(Ram ram) {
        ram.setStatus(0);
        ramRepository.save(ram);
    }

    public Ram getOne(Integer id) {
        return ramRepository.findById(id).get();
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
            Ram existingRam = ramRepository.findByCode(code);

            if(existingRam != null){
                //Đã tồn tại
                existingRam.setName(row.getCell(1).getStringCellValue());
                existingRam.setDateUpdate(new Date());
                existingRam.setPersonUpdate(row.getCell(3).getStringCellValue());
                ramRepository.save(existingRam);
            }else {
                //Chưa tồn tại thêm mới
                Ram newRam = new Ram();
                newRam.setCode(code);
                newRam.setName(row.getCell(1).getStringCellValue());
                newRam.setDateCreate(new Date());
                newRam.setDateUpdate(new Date());
                newRam.setPersonCreate(row.getCell(2).getStringCellValue());
                newRam.setPersonUpdate(row.getCell(3).getStringCellValue());
                newRam.setStatus(0);
                ramRepository.save(newRam);
            }
        }

        workbook.close();
    }

}
