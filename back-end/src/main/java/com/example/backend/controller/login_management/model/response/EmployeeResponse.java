package com.example.backend.controller.login_management.model.response;

import com.example.backend.entity.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;

@Projection(types = User.class)
public interface EmployeeResponse {
    @Value("#{target.stt}")
    Integer getSTT();

    @Value("#{target.id}")
    Integer getId();

    @Value("#{target.email}")
    String getEmail();

    @Value("#{target.createdDate}")
    LocalDate getCreatedDate();

    @Value("#{target.dateUpdate}")
    LocalDate getDateUpdate();

    @Value("#{target.avatar}")
    String getAvatar();

    @Value("#{target.points}")
    String getPoints();

    @Value("#{target.phoneNumber}")
    String getPhoneNumber();

    @Value("#{target.status}")
    String getStatus();

    @Value("#{target.personCreate}")
    String getPersonCreate();

    @Value("#{target.personUpdate}")
    String getPersonUpdate();

    @Value("#{target.dateOfBirth}")
    LocalDate getDateOfBirth();

    @Value("#{target.fullName}")
    String getFullName();

    @Value("#{target.password}")
    String getPassword();

    @Value("#{target.gender}")
    Boolean getGender();

    @Value("#{target.getIdAccount}")
    Integer getIdAccount();

    @Value("#{target.citizenIdentity}")
    String getCitizenIdentity();
}
