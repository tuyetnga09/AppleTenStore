package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.ColorRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Color;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class ColorServiceImpl implements Iservice<Color> {
    @Autowired
    private ColorRepository  colorRepository;
    @Override
    public Page<Color> getAll(Pageable pageable) {
        return colorRepository.findAll(pageable);
    }

    @Override
    public void insert(Color color) {
        colorRepository.save(color);

    }


    @Override
    public void update(Color color, Integer id) {
        colorRepository.save(color);
    }

    @Override
    public void delete(Integer id) {
        colorRepository.deleteById(id);
    }
    public Color getOne(Integer id) {
        return colorRepository.findById(id).get();
    }

}
