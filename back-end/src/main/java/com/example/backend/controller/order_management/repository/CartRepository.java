package com.example.backend.controller.order_management.repository;

import com.example.backend.controller.order_management.model.cart.ListCart;
import com.example.backend.entity.Cart;
import com.example.backend.repository.ICartRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartRepository extends ICartRepository {
    Cart getCartByAccount_Id(Integer idAccount);
    @Query(value = "select cd.id AS 'ID Cart Detail', p.id AS 'Id Product', p.name AS 'Name Product', p.price AS 'Price', p.quantity AS 'Quantity', c2.name AS 'name color', c3.name AS 'name capacity', cd.id AS 'Id cart'  from cart c join account a on c.id_account = a.id join cart_detail cd on c.id = cd.id_cart\n" +
            "join product p on cd.id_product = p.id join color c2 on p.id_color = c2.id join capacity c3 on p.id_capacity = c3.id\n" +
            "where a.id = :idAccount order by cd.date_create desc ", nativeQuery = true)
    List<ListCart> getListCart(@Param("idAccount") Integer idAccount);

    @Query(value = "select sum(cd.quantity) from cart c join account a on c.id_account = a.id\n" +
            "join cart_detail cd on c.id = cd.id_cart WHERE  a.id = :idAccount", nativeQuery = true)
    Integer quantityInCart(@Param("idAccount") Integer idAccount);

}
