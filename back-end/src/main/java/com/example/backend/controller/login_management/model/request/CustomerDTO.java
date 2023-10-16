package com.example.backend.controller.login_management.model.request;

import com.example.backend.entity.Account;
import com.example.backend.entity.Address;
import com.example.backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class CustomerDTO {

    private User user;

    private Address address;

    private Account account;
}
