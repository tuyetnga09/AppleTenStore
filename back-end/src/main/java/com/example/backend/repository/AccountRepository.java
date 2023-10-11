package com.example.backend.repository;

import com.example.backend.entity.Account;
import com.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    @Query("SELECT ac FROM Account ac WHERE ac.email =:email")
    Account getOneByEmail(@Param("email") String email);

    Account findByEmail(String code);

    @Query(value = "SELECT SUM(CASE WHEN MONTH(date_create) = MONTH(CURRENT_DATE) - 1 AND YEAR(date_create) = YEAR(CURRENT_DATE) THEN 1 ELSE 0 END) from account", nativeQuery = true)
    Integer numberOfCustomersLastMonth();

    @Query(value = "SELECT SUM(CASE WHEN MONTH(date_create) = MONTH(CURRENT_DATE) AND YEAR(date_create) = YEAR(CURRENT_DATE) THEN 1 ELSE 0 END) from account", nativeQuery = true)
    Integer numberOfCustomersThisMonth();

    @Query("SELECT ac FROM Account ac WHERE ac.email =:email AND ac.user.phoneNumber =:phoneNumber")
    Account resetPassword(@Param("email") String email , @Param("phoneNumber") String phoneNumber);

}
