package com.example.backend.controller.login_management.service.impl;

import com.example.backend.controller.login_management.model.request.CreateAddressRequest;
import com.example.backend.controller.login_management.model.request.CreateCustomerRequest;
import com.example.backend.controller.login_management.model.request.FindEmployeeRequest;
import com.example.backend.controller.login_management.model.response.EmployeeResponse;
import com.example.backend.controller.login_management.service.CustomerService;
import com.example.backend.controller.order_management.model.EmailService;
import com.example.backend.entity.Account;
import com.example.backend.entity.Address;
import com.example.backend.entity.User;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.AddressRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.untils.Message;
import com.example.backend.untils.RestAPIRunTime;
import com.example.backend.untils.Roles;
import com.example.backend.untils.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class CustomerServiceImpl  implements CustomerService {
    @Autowired
    private UserRepository userReposiory;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private EmailService emailService;

    @Override
    public List<EmployeeResponse> findAll(FindEmployeeRequest req) {
        return null;
    }

    @Override
    public User create(CreateCustomerRequest request, CreateAddressRequest addressRequest, MultipartFile file) {
        User checkUserPhoneNumber = userReposiory.getOneUserByPhoneNumber(request.getPhoneNumber());
        if (checkUserPhoneNumber != null) {
            throw new RestAPIRunTime(Message.PHONENUMBER_USER_EXIST);
        }

        User checkUserEmail = userReposiory.getOneUserByEmail(request.getEmail());
        if (checkUserEmail != null) {
            throw new RestAPIRunTime(Message.EMAIL_USER_EXIST);
        }
        // them anh o day

        //  thông tin user
        User user = User.builder()
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .email(request.getEmail())
                .status(request.getStatus())
                .dateOfBirth(request.getDateOfBirth())
                .gender(request.getGender())
                .points(0)
//                .avatar(urlImage) // đường dẫn ảnh từ url
                .build();
        userReposiory.save(user);
        User addressUser = userReposiory.getById(user.getId());

        // tạo tài khoản cho khách hàng
        Account account = new Account();
        account.setUser(user);
        account.setRoles(Roles.CUSTOMER);
        account.setEmail(user.getEmail());
        // (viết hàm để thêm password ở đây )
        account.setStatus(Status.DANG_SU_DUNG);
        accountRepository.save(account);

        //  địa chỉ user
        Address address = new Address();
//        address.setStatus(Status.DANG_SU_DUNG);
        // ....
        address.setUser(addressUser); // add địa chỉ vào database
        addressRepository.save(address);


        String subject = "Xin chào, bạn đã đăng ký thành công ";
        emailService.sendEmailPasword(account.getEmail(), subject, account.getPassword());

        return user;
    }
}
