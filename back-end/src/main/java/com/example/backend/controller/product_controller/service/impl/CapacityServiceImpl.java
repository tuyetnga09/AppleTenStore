package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.CapacityRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Capacity;
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
import java.util.List;

@Service
public class CapacityServiceImpl implements Iservice<Capacity> {
    @Autowired
    private CapacityRepository capacityRepository;

    @Override
    public Page<Capacity> getAll(Pageable pageable) {
        return capacityRepository.findAll(pageable);
    }

    public List<Capacity> getAll() {
        return capacityRepository.getAll();
    }

    @Override
    public void insert(Capacity capacity) {
        capacityRepository.save(capacity);
    }

    @Override
    public void update(Capacity capacity, Integer id) {
        capacityRepository.save(capacity);
    }

    @Override
    public void delete(Integer id) {
        capacityRepository.deleteById(id);
    }

    @Override
    public void delete(Capacity capacity) {
        capacity.setStatus(1);
        capacityRepository.save(capacity);

    }

    @Override
    public void returnDelete(Capacity capacity) {
        capacity.setStatus(0);
        capacityRepository.save(capacity);
    }

    public Capacity getOne(Integer id) {
        return capacityRepository.findById(id).get();
    }

    public Page<Capacity> getDelete(Pageable pageable) {
        return capacityRepository.deleteCapacity(pageable);
    }

    public void importDataFromExcel(MultipartFile file) throws Exception {
        InputStream inputStream = file.getInputStream();
        Workbook workbook = new XSSFWorkbook(inputStream);
        Sheet sheet = workbook.getSheetAt(0); // dữ liệu lấy ở sheet đầu tiên

        for (Row row : sheet) {
            if (row.getRowNum() == 0) {
                continue;
            }

            String code = row.getCell(0).getStringCellValue();
            Capacity existingCapacity = capacityRepository.findByCode(code);

            if (existingCapacity != null) {
                //Đã tồn tại
                existingCapacity.setName(row.getCell(1).getStringCellValue());
                existingCapacity.setDateUpdate(new Date());
                existingCapacity.setPersonUpdate(row.getCell(3).getStringCellValue());
                capacityRepository.save(existingCapacity);
            } else {
                //Chưa tồn tại thêm mới
                Capacity newCapacity = new Capacity();
                newCapacity.setCode(code);
                newCapacity.setName(row.getCell(1).getStringCellValue());
                newCapacity.setDateCreate(new Date());
                newCapacity.setDateUpdate(new Date());
                newCapacity.setPersonCreate(row.getCell(2).getStringCellValue());
                newCapacity.setPersonUpdate(row.getCell(3).getStringCellValue());
                newCapacity.setStatus(0);
                capacityRepository.save(newCapacity);
            }
        }

        workbook.close();
    }

    public Page<Capacity> search(String search, Pageable pageable) {
        return capacityRepository.search(search, pageable);
    }

}
