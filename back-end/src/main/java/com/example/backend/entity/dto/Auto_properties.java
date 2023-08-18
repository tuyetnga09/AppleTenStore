package com.example.backend.entity.dto;

import com.example.backend.listener.AuditingEntityListener;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public abstract class Auto_properties {
    @Column(name = "person_create")
    private String personCreate;
    @Column(name = "person_update")
    private String personUpdate;
    @Column(name = "date_create")
    private Date dateCreate;
    @Column(name = "date_update")
    private Date dateUpdate;

    @Column(name = "status")
    private Integer status;

}
