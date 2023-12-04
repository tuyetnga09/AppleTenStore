package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.repository.ScreenRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Screen;
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
public class ScreenServiceImpl implements Iservice<Screen> {
    @Autowired
    private ScreenRepository screenRepository;


    @Override
    public Page<Screen> getAll(Pageable pageable) {
        return screenRepository.findAll(pageable);
    }

    public List<Screen> getAll() {
        return screenRepository.getAll();
    }

    public Page<Screen> getDelete(Pageable pageable) {
        return screenRepository.deleteScreen(pageable);
    }

    @Override
    public void insert(Screen screen) {
        screen.setDateCreate(new Date());
        screen.setDateUpdate(new Date());
        screen.setStatus(0);
        screenRepository.save(screen);
    }

    @Override
    public void update(Screen screen, Integer id) {
        Screen screenId = getOne(screen.getId());
        screen.setDateCreate(screenId.getDateCreate());
        screen.setDateUpdate(new Date());
        screen.setStatus(screenId.getStatus());
        screenRepository.save(screen);
    }

    @Override
    public void delete(Integer id) {
        screenRepository.deleteById(id);
    }

    @Override
    public void delete(Screen screen) {
        screen.setStatus(1);
        screenRepository.save(screen);
    }

    @Override
    public void returnDelete(Screen screen) {
        screen.setStatus(0);
        screenRepository.save(screen);
    }

    public Screen getOne(Integer id) {
        return screenRepository.findById(id).get();
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
            Screen existingScreen = screenRepository.findByCode(code);

            if (existingScreen != null) {
                //Đã tồn tại
                existingScreen.setName(row.getCell(1).getStringCellValue());
                existingScreen.setDateUpdate(new Date());
                existingScreen.setPersonUpdate(row.getCell(3).getStringCellValue());
                screenRepository.save(existingScreen);
            } else {
                //Chưa tồn tại thêm mới
                Screen newScreen = new Screen();
                newScreen.setCode(code);
                newScreen.setName(row.getCell(1).getStringCellValue());
                newScreen.setDateCreate(new Date());
                newScreen.setDateUpdate(new Date());
                newScreen.setPersonCreate(row.getCell(2).getStringCellValue());
                newScreen.setPersonUpdate(row.getCell(3).getStringCellValue());
                newScreen.setStatus(0);
                screenRepository.save(newScreen);
            }
        }

        workbook.close();
    }

    public List<String> getCode(){
        return this.screenRepository.getCode();
    }

}
