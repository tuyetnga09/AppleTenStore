package com.example.backend.repository;

import com.example.backend.controller.order_management.model.cart.ListCart;
import com.example.backend.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    Cart getCartByAccount_Id(Integer idAccount);
    @Query(value = "select cd.id AS 'ID Cart Detail', p.id AS 'Id Sku', p2.name AS 'Name Product', p.capacity AS 'Capacity', p.color AS 'Color',cd.date_create AS 'DATECREATE', cd.price AS 'Price', cd.quantity AS 'Quantity', p.quantity AS 'QuantitySKU' , cd.id AS 'Id cart' , p.price * cd.quantity AS 'Total', p.product_id as 'ID Product' from cart c join account a on c.id_account = a.id join cart_detail cd on c.id = cd.id_cart\n" +
            "                                join sku p on cd.id_sku = p.id join product p2 on p.product_id = p2.id\n" +
            "                          where a.id = :idAccount order by cd.date_create desc", nativeQuery = true)
    List<ListCart> getListCart(@Param("idAccount") Integer idAccount);

    @Query(value = "select sum(cd.quantity) from cart c join account a on c.id_account = a.id\n" +
            "join cart_detail cd on c.id = cd.id_cart WHERE  a.id = :idAccount", nativeQuery = true)
    Integer quantityInCart(@Param("idAccount") Integer idAccount);

}
