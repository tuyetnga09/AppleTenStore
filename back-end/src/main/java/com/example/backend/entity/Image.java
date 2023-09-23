package com.example.backend.entity;


import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.entity.dto.Identify;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.concurrent.ThreadLocalRandom;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "image")
@Getter
@Setter
@Builder
@ToString
public class Image extends DuplicateAttribute implements Identify{

    private String code;

    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_product")
    private Product idProduct;

    private static String autoCode() {
        return "IMG" + ThreadLocalRandom.current().nextInt();
    }

    public Image(String name, Product product) {
        this.code = autoCode();
        this.name = name;
        this.idProduct = product;
        this.setDateCreate(new Date());
        this.setStatus(1);
    }

}
