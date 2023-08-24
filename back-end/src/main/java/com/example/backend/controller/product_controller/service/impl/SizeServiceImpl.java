package com.example.backend.controller.product_controller.service.impl;

import com.example.backend.controller.product_controller.repository.SizeRepository;
import com.example.backend.controller.product_controller.service.Iservice;
import com.example.backend.entity.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class SizeServiceImpl implements Iservice<Size> {

    @Autowired
    private SizeRepository sizeRepository;

    @Override
    public Page<Size> getAll(Pageable pageable) {
        return sizeRepository.findAll(pageable);
    }

    @Override
    public void insert(Size size) {
        sizeRepository.save(size);
    }

    @Override
    public void update(Size size, Integer id) {
        Size size1 = sizeRepository.findById(id).orElse(null);
        size1.setCode(size.getCode());
        size1.setName(size.getName());
        sizeRepository.save(size1);
    }

    @Override
    public void delete(Integer id) {
        if (sizeRepository.existsById(id)){
            sizeRepository.deleteById(id);
        }
    }
    @Override
    public void delete(Size size) {

    }

    @Override
    public void returnDelete(Size size) {

    }
}