package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.repository.ChipRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Chip;
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
public class ChipServiceIpml implements Iservice<Chip> {
    @Autowired
    private ChipRepository chipRepository;

    @Override
    public Page<Chip> getAll(Pageable pageable) {
        return chipRepository.findAll(pageable);
    }

    public List<Chip> getAll() {
        return chipRepository.getAll();
    }

    public Page<Chip> getDelete(Pageable pageable, String key) {
        return chipRepository.deleteChip(pageable, key);
    }

    @Override
    public void insert(Chip chip) {
        chipRepository.save(chip);
    }

    @Override
    public void update(Chip chip, Integer id) {
        Chip chipUpdate = chipRepository.findById(id).orElse(null);
        chipUpdate.setCode(chip.getCode());
        chipUpdate.setName(chip.getName());
        chipRepository.save(chipUpdate);
    }

    @Override
    public void delete(Integer id) {
        if (chipRepository.existsById(id)) {
            chipRepository.deleteById(id);
        }
    }

    @Override
    public void delete(Chip chip) {
        chip.setStatus(1);
        chipRepository.save(chip);
    }

    @Override
    public void returnDelete(Chip chip) {
        chip.setStatus(0);
        chipRepository.save(chip);
    }

    public Chip getOne(Integer id) {
        return chipRepository.findById(id).get();
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
            Chip existingChip = chipRepository.findByCode(code);

            if (existingChip != null) {
                //Đã tồn tại
                existingChip.setName(row.getCell(1).getStringCellValue());
                existingChip.setDateUpdate(new Date());
                existingChip.setPersonUpdate(row.getCell(3).getStringCellValue());
                chipRepository.save(existingChip);
            } else {
                //Chưa tồn tại thêm mới
                Chip newChip = new Chip();
                newChip.setCode(code);
                newChip.setName(row.getCell(1).getStringCellValue());
                newChip.setDateCreate(new Date());
                newChip.setDateUpdate(new Date());
                newChip.setPersonCreate(row.getCell(2).getStringCellValue());
                newChip.setPersonUpdate(row.getCell(3).getStringCellValue());
                newChip.setStatus(0);
                chipRepository.save(newChip);
            }
        }

        workbook.close();
    }

    public Page<Chip> search(Pageable pageable, String key) {
        return chipRepository.search(pageable, key);
    }
}
