package com.example.backend.entity;

import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.entity.dto.Identify;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import java.util.List;

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
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "id_capacity")
//    private Capacity idcapacity;
//    @ManyToOne(fetch = FetchType.EAGER)
//    @JoinColumn(name = "id_color")
//    private Color idcolor;

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

    @ManyToMany
    @JoinTable(name = "product_color",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "color_id"))
    private List<Color> colors;

    @ManyToMany
    @JoinTable(name = "product_capacity",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name = "capacity_id"))
    private List<Capacity> capacities;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
    private List<SKU> skus;

}
