package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.CapacityRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Capacity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CapacityServiceImpl implements Iservice<Capacity> {
    @Autowired
    private CapacityRepository capacityRepository;
    @Override
    public Page<Capacity> getAll(Pageable pageable) {
        return capacityRepository.findAll(pageable);
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
    public Capacity getOne(Integer id) {
        return capacityRepository.findById(id).get();
    }
}
