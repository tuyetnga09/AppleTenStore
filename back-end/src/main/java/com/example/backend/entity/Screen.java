package com.example.backend.entity;

import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.entity.dto.Identify;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "screen")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Screen extends DuplicateAttribute implements Identify {

    private String code;

    private String name;
}
