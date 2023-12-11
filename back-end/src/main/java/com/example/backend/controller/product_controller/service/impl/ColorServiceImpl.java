package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.repository.ColorRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Color;
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
public class ColorServiceImpl implements Iservice<Color> {
    @Autowired
    private ColorRepository colorRepository;


    @Override
    public Page<Color> getAll(Pageable pageable) {
        return colorRepository.findAll(pageable);
    }

    public List<Color> getAll() {
        return colorRepository.getAll();
    }

    public Page<Color> getDelete(Pageable pageable, String key) {
        return colorRepository.deleteColor(pageable, key);
    }

    @Override
    public void insert(Color color) {
        colorRepository.save(color);
    }

    @Override
    public void update(Color color, Integer id) {
        Color colorUpdate = colorRepository.findById(id).orElse(null);
        colorUpdate.setCode(color.getCode());
        colorUpdate.setName(color.getName());
        colorRepository.save(colorUpdate);
    }

    @Override
    public void delete(Integer id) {
        if (colorRepository.existsById(id)) {
            colorRepository.deleteById(id);
        }
    }

    @Override
    public void delete(Color color) {
        color.setStatus(1);
        colorRepository.save(color);
    }

    @Override
    public void returnDelete(Color color) {
        color.setStatus(0);
        colorRepository.save(color);
    }

    public Color getOne(Integer id) {
        return colorRepository.findById(id).get();
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
            Color existingColor = colorRepository.findByCode(code);

            if (existingColor != null) {
                //Đã tồn tại
                existingColor.setName(row.getCell(1).getStringCellValue());
                existingColor.setDateUpdate(new Date());
                existingColor.setPersonUpdate(row.getCell(3).getStringCellValue());
                colorRepository.save(existingColor);
            } else {
                //Chưa tồn tại thêm mới
                Color newColor = new Color();
                newColor.setCode(code);
                newColor.setName(row.getCell(1).getStringCellValue());
                newColor.setDateCreate(new Date());
                newColor.setDateUpdate(new Date());
                newColor.setPersonCreate(row.getCell(2).getStringCellValue());
                newColor.setPersonUpdate(row.getCell(3).getStringCellValue());
                newColor.setStatus(0);
                colorRepository.save(newColor);
            }
        }

        workbook.close();
    }

    public Page<Color> search(Pageable pageable, String key) {
        return colorRepository.search(pageable, key);
    }

    public List<Color> findColorByProduct(int id){
        return this.colorRepository.findColorByIdProduct(id);
    }

    public List<String> getCode(){
        return colorRepository.getCode();
    }

}