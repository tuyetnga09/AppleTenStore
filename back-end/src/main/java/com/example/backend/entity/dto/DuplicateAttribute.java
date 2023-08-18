package com.example.backend.entity.dto;

import com.example.backend.listener.CreateDTOEntityListener;
import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(CreateDTOEntityListener.class)
public abstract class DuplicateAttribute extends Auto_properties implements Identify {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(length = 50, updatable = false)
    private UUID id;

}
