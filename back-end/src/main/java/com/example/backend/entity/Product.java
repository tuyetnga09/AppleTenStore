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

import java.math.BigDecimal;

@Entity
@Table(name = "product")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product  extends DuplicateAttribute implements Identify {
    private String code;
    private String name;
    private String description;
    private Integer quantity;
    private BigDecimal price;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_capacity")
    private Capacity idcapacity;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_color")
    private Color idcolor;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_manufacture")
    private Manufacture idmanufacture;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_category")
    private Category idcategory;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_battery")
    private Battery idbattery;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_chip")
    private Chip idchip;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_ram")
    private Ram idRam;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_screen")
    private Screen idscreen;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_size")
    private Size idsize;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_image")
    private Image idimage;


}
