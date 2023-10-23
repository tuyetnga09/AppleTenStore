package com.example.backend.repository;

import com.example.backend.entity.Customer;
import com.example.backend.entity.Ram;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    @Query(value = "SELECT id, full_name, email, phone_number, date_create, date_update\n" +
            "FROM customer WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Customer> findAll(Pageable pageable);

    @Query(value = "SELECT id, full_name, email, phone_number, date_create, date_update\n" +
            "FROM customer WHERE Status = 1 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Customer> deleteCustomer(Pageable pageable);

    Customer findByPhoneNumber(String phoneNumber);

    @Query(value = "SELECT id, full_name, email, phone_number, date_create, date_update " +
            "FROM customer WHERE Status = 0 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    List<Customer> getAll();
}
