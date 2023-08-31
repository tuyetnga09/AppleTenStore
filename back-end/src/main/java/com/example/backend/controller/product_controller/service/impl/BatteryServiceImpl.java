package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.BatteryRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Battery;
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
public class BatteryServiceImpl implements Iservice<Battery> {

    @Autowired
    private BatteryRepository batteryRepository;

    @Override
    public Page<Battery> getAll(Pageable pageable) {
        return batteryRepository.findAll(pageable);
    }

    public Page<Battery> getDelete(Pageable pageable, String key) {
        return batteryRepository.deleteBattery(pageable, key);
    }

    @Override
    public void insert(Battery battery) {
        batteryRepository.save(battery);
    }

    @Override
    public void update(Battery battery, Integer id) {
        Battery battery1 = batteryRepository.findById(id).orElse(null);
        battery1.setCode(battery.getCode());
        battery1.setName(battery.getName());
        batteryRepository.save(battery1);
    }

    @Override
    public void delete(Integer id) {
        if (batteryRepository.existsById(id)){
            batteryRepository.deleteById(id);
        }
    }
    @Override
    public void delete(Battery battery) {
        battery.setStatus(1);
        batteryRepository.save(battery);
    }

    @Override
    public void returnDelete(Battery battery) {
        battery.setStatus(0);
        batteryRepository.save(battery);
    }

    public Battery getOne(Integer id) {
        return batteryRepository.findById(id).get();
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
            Battery existingBattery = batteryRepository.findByCode(code);

            if(existingBattery != null){
                //Đã tồn tại
                existingBattery.setName(row.getCell(1).getStringCellValue());
                existingBattery.setDateUpdate(new Date());
                existingBattery.setPersonUpdate(row.getCell(3).getStringCellValue());
                batteryRepository.save(existingBattery);
            }else {
                //Chưa tồn tại thêm mới
                Battery newBattery = new Battery();
                newBattery.setCode(code);
                newBattery.setName(row.getCell(1).getStringCellValue());
                newBattery.setDateCreate(new Date());
                newBattery.setDateUpdate(new Date());
                newBattery.setPersonCreate(row.getCell(2).getStringCellValue());
                newBattery.setPersonUpdate(row.getCell(3).getStringCellValue());
                newBattery.setStatus(0);
                batteryRepository.save(newBattery);
            }
        }

        workbook.close();
    }

    public Page<Battery> search(Pageable pageable, String key) {
        return batteryRepository.search(pageable, key);
    }
}