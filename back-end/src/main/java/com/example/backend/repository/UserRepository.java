package com.example.backend.repository;

import com.example.backend.controller.login_management.model.response.EmployeeResponse;
import com.example.backend.entity.Chip;
import com.example.backend.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmail(String code);

    @Query(value = "SELECT\n" +
            "    ROW_NUMBER() OVER (ORDER BY u.date_update DESC ) AS stt,\n" +
            "    u.id AS id,\n" +
            "    u.gender AS gender,\n" +
            "    u.full_name AS fullName,\n" +
            "    u.date_of_birth AS dateOfBirth,\n" +
            "    u.avatar AS avata,\n" +
            "    u.email AS email,\n" +
            "    u.points AS points,\n" +
            "    u.phone_number AS phoneNumber,\n" +
            "    u.person_update AS updatedBy,\n" +
            "    u.person_create AS createdBy,\n" +
            "    u.status AS status,\n" +
            "    u.date_create AS createdDate,\n" +
            "    u.date_update AS lastModifiedDate,\n" +
            "    u.citizen_identity AS citizenIdentity,\n" +
            "    a.password AS password,\n" +
            "    a.id AS idAccount\n" +
            "FROM user u\n" +
            "         JOIN account a ON u.id = a.id_user\n" +
            "WHERE u.phone_number = :phoneNumber", nativeQuery = true)
    Optional<EmployeeResponse> getOneByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    @Query("SELECT u FROM  User u WHERE u.phoneNumber =:phoneNumber")
    User getOneUserByPhoneNumber(@Param("phoneNumber") String phoneNumber);

    @Query("SELECT u FROM  User u WHERE u.email =:email")
    User getOneUserByEmail(@Param("email") String email);

//    @Query(value = "select user.id, user.avatar, user.citizen_identity, user.date_create, user.date_of_birth, user.date_update, user.email, user.full_name, user.gender, user.person_create, user.person_update, user.phone_number, user.points, user.status from account join user on account.id_user = user.id join address on user.id = address.id_user where roles = ?1", nativeQuery = true)
    @Query(value = "select user.id, user.avatar, user.citizen_identity, user.date_create, user.date_of_birth, user.date_update, user.email, user.full_name, user.gender, user.person_create, user.person_update, user.phone_number, user.points, user.status from account join user on account.id_user = user.id where roles = ?1", nativeQuery = true)
    List<User> findByRole(Pageable pageable, String role);
}
