package com.example.backend.entity;

import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.entity.dto.Identify;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
@Table(name = "size")
public class Size extends DuplicateAttribute implements Identify {

    private String code;

    private String name;
}