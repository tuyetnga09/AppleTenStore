package com.example.backend.listener;

import com.example.backend.entity.dto.DuplicateAttribute;
import jakarta.persistence.PrePersist;

import java.util.UUID;

public class CreateDTOEntityListener {
    @PrePersist
    private void onCreate(DuplicateAttribute entity){
        entity.setId(UUID.randomUUID());
    }
}
