package com.example.backend.listener;

import com.example.backend.entity.dto.Auto_properties;

import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import java.util.Date;

public class AuditingEntityListener {
    @PrePersist
    private void onCreate(Auto_properties entity) {
        entity.setDateCreate(new Date()) ;
        entity.setDateUpdate(new Date());
        entity.setStatus(0);
        entity.setPersonCreate(null);
        entity.setPersonUpdate(null);
    }

    @PreUpdate
    private void onUpdate(Auto_properties entity) {
        entity.setDateUpdate(new Date());
//        entity.setPersonUpdate(null);
    }
}
