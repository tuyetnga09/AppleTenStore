package com.example.backend.entity;

import com.example.backend.untils.StatusBill;
import com.example.backend.untils.TypeBill;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.sql.Date;

@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "bill")
@AllArgsConstructor
@NoArgsConstructor
public class Bill  {
    @Id
    @Column(length = 10, updatable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "code")
    private String code;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "address")
    private String address;

    @Column(name = "user_name")
    private String userName;

    @Column(name = "item_discount")
    private BigDecimal itemDiscount;

    @Column(name = "total_money ")
    private BigDecimal totalMoney;

    @Column(name = "confirmation_date")
    private LocalDate confirmationDate;

    @Column(name = "delivery_date")
    private LocalDate deliveryDate;

    @Column(name = "receive_date ")
    private LocalDate receiveDate ;

    @Column(name = "completion_date ")
    private LocalDate completionDate;

    @Column(name = "type")
    @Enumerated(EnumType.STRING)
    private TypeBill typeBill;

    @Column(name = "note")
    private String note;

    @Column(name = "money_ship ")
    private BigDecimal moneyShip;

    @Enumerated(EnumType.STRING)
    private StatusBill statusBill;

    @ManyToOne
    @JoinColumn(name = "id_customer",referencedColumnName = "id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "id_account",referencedColumnName = "id")
    private Account account;
    @Column(name = "person_create")
    private String  personCreate;

    @Column(name = "person_update")
    private String personUpdate;

    @Column(name = "date_create")
    private LocalDate dateCreate;

    @Column(name = "date_update")
    private LocalDate dateUpdate;

    @Column(name = "number_of_points_used")
    private Integer numberOfPointsUsed;

    @Column(name = "point_conversion_amount")
    private BigDecimal pointConversionAmount;

    @Column(name = "note_return")
    private String noteReturn;
}
