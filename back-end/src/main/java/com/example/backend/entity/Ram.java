package com.example.backend.entity;

import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.entity.dto.Identify;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "ram")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Builder
public class Ram extends DuplicateAttribute implements Identify {

    private String code;

    private String name;
}
