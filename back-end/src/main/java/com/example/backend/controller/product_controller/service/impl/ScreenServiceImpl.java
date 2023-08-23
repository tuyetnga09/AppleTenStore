package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.ScreenRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Screen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ScreenServiceImpl implements Iservice<Screen> {
    @Autowired
    private ScreenRepository screenRepository;


    @Override
    public Page<Screen> getAll(Pageable pageable) {
        return screenRepository.findAll(pageable);
    }

    public Page<Screen> getDelete(Pageable pageable) {
        return screenRepository.deleteScreen(pageable);
    }

    public void deleteScreen(Screen screen){
        screen.setStatus(1);
        screenRepository.save(screen);
    }

    public void returnScreen(Screen screen){
        screen.setStatus(0);
        screenRepository.save(screen);
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

    public Screen getOne(Integer id){
        return screenRepository.findById(id).get();
    }
}
