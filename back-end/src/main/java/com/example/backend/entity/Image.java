package com.example.backend.entity;


import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.entity.dto.Identify;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


import javax.persistence.Entity;
import javax.persistence.Table;
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
