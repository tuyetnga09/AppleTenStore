package com.example.backend.controller.order_management.repository;

import com.example.backend.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, Integer> {

    @Query("SELECT ac FROM Account ac WHERE ac.email =:email")
    Account getOneByEmail(@Param("email") String email);


}
