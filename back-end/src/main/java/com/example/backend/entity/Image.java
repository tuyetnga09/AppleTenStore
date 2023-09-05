package com.example.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.entity.dto.Identify;
import lombok.*;

import java.util.Date;
import java.util.concurrent.ThreadLocalRandom;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "image")
@Getter
@Setter
@ToString
@Builder
public class Image extends DuplicateAttribute implements Identify{

    private String code;

    private String name;

    private String link;

    private static String autoCode() {
        return "IMG" + ThreadLocalRandom.current().nextInt();
    }

    public Image(String name, String link) {
        this.code = autoCode();
        this.name = name;
        this.link = link;
        this.setDateCreate(new Date());
        this.setStatus(1);
    }

}
