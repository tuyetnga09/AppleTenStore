package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.BatteryRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Battery;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class BatteryServiceImpl implements Iservice<Battery> {

    @Autowired
    private BatteryRepository batteryRepository;

    @Override
    public Page<Battery> getAll(Pageable pageable) {
        return batteryRepository.findAll(pageable);
    }

    public Page<Battery> getDelete(Pageable pageable) {
        return batteryRepository.deleteBattery(pageable);
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
}