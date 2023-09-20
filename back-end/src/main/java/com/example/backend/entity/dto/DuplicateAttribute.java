package com.example.backend.entity.dto;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

@Getter
@Setter
@MappedSuperclass
//@EntityListeners(CreateDTOEntityListener.class)
public abstract class DuplicateAttribute extends Auto_properties implements Identify {

    @Id
    @Column(length = 10, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

}
