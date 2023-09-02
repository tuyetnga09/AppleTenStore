package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.ManufactureRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Manufacture;
import com.example.backend.entity.Ram;
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
public class ManufactureServiceImpl implements Iservice<Manufacture> {
    @Autowired
    private ManufactureRepository manufactureRepository;


    @Override
    public Page<Manufacture> getAll(Pageable pageable) {
        return manufactureRepository.findAll(pageable);
    }

    public Page<Manufacture> getDelete(Pageable pageable) {
        return manufactureRepository.deleteManufacture(pageable);
    }

    @Override
    public void insert(Manufacture manufacture) {
        manufacture.setDateCreate(new Date());
        manufacture.setDateUpdate(new Date());
        manufacture.setStatus(0);
        manufactureRepository.save(manufacture);
    }

    @Override
    public void update(Manufacture manufacture, Integer id) {
        Manufacture manufactureId = getOne(manufacture.getId());
        manufacture.setDateUpdate(new Date());
        manufacture.setDateCreate(manufactureId.getDateCreate());
        manufacture.setStatus(manufactureId.getStatus());
        manufactureRepository.save(manufacture);
    }

    @Override
    public void delete(Integer id) {
        manufactureRepository.deleteById(id);
    }

    @Override
    public void delete(Manufacture manufacture) {
        manufacture.setStatus(1);
        manufactureRepository.save(manufacture);

    }

    @Override
    public void returnDelete(Manufacture manufacture) {
        manufacture.setStatus(0);
        manufactureRepository.save(manufacture);
    }

    public Manufacture getOne(Integer id) {
        return manufactureRepository.findById(id).get();
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
            Manufacture existingManufacture = manufactureRepository.findByCode(code);

            if(existingManufacture != null){
                //Đã tồn tại
                existingManufacture.setName(row.getCell(1).getStringCellValue());
                existingManufacture.setDateUpdate(new Date());
                existingManufacture.setPersonUpdate(row.getCell(3).getStringCellValue());
                manufactureRepository.save(existingManufacture);
            }else {
                //Chưa tồn tại thêm mới
                Manufacture newManufacture = new Manufacture();
                newManufacture.setCode(code);
                newManufacture.setName(row.getCell(1).getStringCellValue());
                newManufacture.setDateCreate(new Date());
                newManufacture.setDateUpdate(new Date());
                newManufacture.setPersonCreate(row.getCell(2).getStringCellValue());
                newManufacture.setPersonUpdate(row.getCell(3).getStringCellValue());
                newManufacture.setStatus(0);
                manufactureRepository.save(newManufacture);
            }
        }

        workbook.close();
    }

    public Page<Manufacture> search(String search,Pageable pageable) {
        return manufactureRepository.search(search ,pageable);
    }
}
