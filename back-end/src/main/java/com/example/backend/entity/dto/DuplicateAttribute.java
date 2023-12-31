package com.example.backend.entity.dto;


import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class DuplicateAttribute extends Auto_properties implements Identify {

    @Id
    @Column(length = 10, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

}
