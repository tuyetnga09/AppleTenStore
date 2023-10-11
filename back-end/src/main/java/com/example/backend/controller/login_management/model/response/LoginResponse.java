package com.example.backend.controller.login_management.model.response;

import com.example.backend.entity.Account;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private Integer idAccount;

    private Integer idUser;

    private String fullName;

    private String phoneNumber;

    private String avatar;

    private Boolean gender;

    private String email;

    private String roles;

    public LoginResponse(Account account) {
        this.idAccount = account.getId();
        this.idUser = account.getUser().getId();
        this.fullName = account.getUser().getFullName();
        this.phoneNumber = account.getUser().getPhoneNumber();
        this.avatar = account.getUser().getAvatar();
        this.gender = account.getUser().getGender();
        this.email = account.getEmail();
        this.roles = account.getRoles().name();
    }
}
