package com.example.backend.repository;

import com.example.backend.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AddressRepository extends JpaRepository<Address, Integer> {

    @Query(value = "select * from address where id_user = ?1 and status = 'DANG_SU_DUNG'", nativeQuery = true)
    List<Address> findByIdUser(Integer id);
}
