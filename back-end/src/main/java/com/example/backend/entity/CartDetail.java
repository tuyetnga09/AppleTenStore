package com.example.backend.entity;

import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.entity.dto.Identify;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


import java.math.BigDecimal;

@Entity
@Table(name = "cart_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartDetail  extends DuplicateAttribute implements Identify {
    private Integer quantity;
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cart",referencedColumnName = "id")
    private Cart cart;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_product",referencedColumnName = "id")
    private Product productDetail;
}
