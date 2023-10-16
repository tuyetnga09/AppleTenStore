package com.example.backend.repository;

import com.example.backend.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartDetailRepository extends JpaRepository<CartDetail,Integer> {
    List<CartDetail> getCartDetailByCart_Id(Integer idCart);

    @Query(value = "select * from cart_detail  where id_sku = ?1 and id_cart = ?2", nativeQuery = true)
    CartDetail getCartDetailBySku(Long idSku, Integer idCart);

    @Query(value = "select cart_detail.quantity from cart_detail JOIN sku s on s.id = cart_detail.id_sku JOIN cart c on c.id = cart_detail.id_cart where s.id = ?1 and id_account = ?2", nativeQuery = true)
    Integer getQuantityCartDetailBySku(@Param("idSku") Long idSku, @Param("idAccount") Integer idAccount);
}

