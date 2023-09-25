package com.example.backend.entity;

import com.example.backend.untils.StatusPayment;
import com.example.backend.untils.TypePayment;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payments {
    @Id
    @Column(length = 10, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;

    @Enumerated(EnumType.STRING)
    private TypePayment method;

    private Integer payments;

    private BigDecimal moneyPayment;

    private String note;
    private String confirmer;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_bill")
    private Bill bill;
    @Column(name = "person_create")
    private String  personCreate;

    @Column(name = "person_update")
    private String personUpdate;

    @Column(name = "date_create")
    private Date dateCreate;

    @Column(name = "date_update")
    private Date dateUpdate;
    @Enumerated(EnumType.STRING)
    private StatusPayment typePayment;

}
