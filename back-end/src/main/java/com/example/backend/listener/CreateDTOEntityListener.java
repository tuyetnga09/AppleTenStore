package com.example.backend.listener;

import com.example.backend.entity.dto.DuplicateAttribute;

import javax.persistence.PrePersist;


public class CreateDTOEntityListener {
    @PrePersist
    private void onCreate(DuplicateAttribute entity){
        entity.setId(Integer.valueOf(String.valueOf((entity))));
    }
}
