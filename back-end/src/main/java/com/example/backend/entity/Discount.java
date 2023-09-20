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

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "discount")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Discount extends DuplicateAttribute implements Identify {
    private Integer code;
    private String nameVoucher;
    private LocalDate dateStart;
    private LocalDate dateEnd;
    private BigDecimal minTotalMoney;
    private Integer quantity;
    private BigDecimal promotionalValue;
}
