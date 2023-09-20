package com.example.backend.entity;

import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.entity.dto.Identify;
import javax.persistence.Entity;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "capacity")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Capacity extends DuplicateAttribute implements Identify {
    private String  code;
    private String name;
}
