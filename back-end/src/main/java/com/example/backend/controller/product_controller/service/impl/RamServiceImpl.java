package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.RamRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Category;
import com.example.backend.entity.Ram;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class RamServiceImpl implements Iservice<Ram> {
    @Autowired
    private RamRepository ramRepository;


    @Override
    public Page<Ram> getAll(Pageable pageable) {
        return ramRepository.findAll(pageable);
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

    public Ram getOne(Integer id) {
        return ramRepository.findById(id).get();
    }

}
