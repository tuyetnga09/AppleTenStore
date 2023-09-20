package com.example.backend.entity;


import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.untils.StatusBill;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "bill_detail")
@AllArgsConstructor
@NoArgsConstructor
public class BillDetails  extends DuplicateAttribute {
    private Integer quantity;

    private BigDecimal price;

    @Enumerated(EnumType.STRING)
    private StatusBill statusBill ;

    @ManyToOne
    @JoinColumn(name = "id_product")
    private Product product;

    @ManyToOne
    @JoinColumn(name = "id_bill")
    private Bill bill;
}
