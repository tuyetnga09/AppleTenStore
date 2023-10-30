package com.example.backend.entity;

import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.entity.dto.Identify;
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
import lombok.ToString;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
@Entity
@Table(name = "imei")
public class Imei extends DuplicateAttribute implements Identify {

    private String codeImei;

    private Date saleDate;

    private String personSale;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_product")
    private Product idProduct;

    @ManyToOne
    @JoinColumn(name = "sku_id")
    private SKU idSku;

    //status của imei: 0 - hoạt động, 1 - đã xoá, 2 - giỏ hàng, 3 - đã bán
}
