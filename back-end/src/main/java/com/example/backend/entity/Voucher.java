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

import java.math.BigDecimal;
import java.util.Date;
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
@Table(name = "voucher")
public class Voucher extends DuplicateAttribute implements Identify {
    private String code;

    private String name;

    private Date dateStart;

    private Date dateEnd;

    private BigDecimal conditionsApply;

    private BigDecimal valueVoucher;

    private BigDecimal valueMinimum;

    private BigDecimal valueMaximum;

    private Integer typeVoucher;

    private Integer quantity;

}
