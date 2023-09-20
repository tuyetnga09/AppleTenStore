package com.example.backend.entity;

import com.example.backend.entity.dto.DuplicateAttribute;
import com.example.backend.entity.dto.Identify;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Builder
@Table(name = "user")
@AllArgsConstructor
@NoArgsConstructor
public class User  extends DuplicateAttribute implements Identify {
    @Column(name = "full_name")
    private String fullName;

    @Column(name = "date_of_birth")
    private Long dateOfBirth;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "email")
    private String email;

    @Column(name = "gender")
    private Boolean gender;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "points")
    private Integer points;
}
