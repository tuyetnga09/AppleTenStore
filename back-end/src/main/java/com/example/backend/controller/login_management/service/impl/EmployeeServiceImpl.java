package com.example.backend.controller.login_management.service.impl;

import com.example.backend.controller.login_management.service.EmployeeService;
import com.example.backend.controller.order_management.model.EmailService;
import com.example.backend.entity.Account;
import com.example.backend.entity.Address;
import com.example.backend.entity.User;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.untils.Message;
import com.example.backend.untils.RestAPIRunTime;
import com.example.backend.untils.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.Date;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private UserRepository userReposiory;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public User add(User user, Address address, Account account) {
        User checkUserPhoneNumber = userReposiory.getOneUserByPhoneNumber(user.getPhoneNumber());
        if (checkUserPhoneNumber != null) {
            throw new RestAPIRunTime(Message.PHONENUMBER_USER_EXIST);
        }

        User checkUserEmail = userReposiory.getOneUserByEmail(user.getEmail());
        if (checkUserEmail != null) {
            throw new RestAPIRunTime(Message.EMAIL_USER_EXIST);
        }
        // them anh o day

        //  thông tin user
        User user1 = User.builder()
                .fullName(user.getFullName())
                .phoneNumber(user.getPhoneNumber())
                .email(user.getEmail())
                .status(Status.DANG_SU_DUNG)
                .dateOfBirth(user.getDateOfBirth())
                .gender(user.getGender())
                .points(0)
                .dateCreate(new Date())
//                .avatar(urlImage) // đường dẫn ảnh từ url
                .build();
        userReposiory.save(user1);
        User addressUser = userReposiory.getById(user1.getId());

        // tạo tài khoản cho khách hàng
        Account account1 = new Account();
        account1.setUser(user1);
        account1.setRoles(account.getRoles());
        account1.setEmail(user1.getEmail());
        account1.setPassword(Base64.getEncoder().encodeToString(account.getPassword().getBytes()));
        account1.setStatus(Status.DANG_SU_DUNG);
        account1.setDateCreate(new Date());
        accountRepository.save(account1);

        //  địa chỉ user
        Address address1 = new Address();
        address1.setStatus(Status.DANG_SU_DUNG);
        address1.setNameCustomer(addressUser.getFullName());
        address1.setAddress(address.getAddress());
        address1.setNumberCustomer(addressUser.getPhoneNumber());
        address1.setQuanHuyen(address.getQuanHuyen());
        address1.setTinhThanhPho(address.getTinhThanhPho());
        address1.setXaPhuong(address.getXaPhuong());
        address1.setUser(addressUser); // add địa chỉ vào database
        addressRepository.save(address1);


        String subject = "Xin chào, bạn đã đăng ký thành công ";
        emailService.sendEmailPasword(account1.getEmail(), subject, new String(Base64.getDecoder().decode(account1.getPassword())));

        return user;
    }
}
