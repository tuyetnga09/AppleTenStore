package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
@Entity
@Table(name = "imei_da_ban")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ImeiDaBan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_billDetail")
    private BillDetails billDetail;

    private String codeImei;
    private Integer status; // 2 - giỏ hàng, 3 đã bán
    private LocalDate dateSell;
    private String personSell;
}
