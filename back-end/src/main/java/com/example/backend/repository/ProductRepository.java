package com.example.backend.repository;



import com.example.backend.entity.Product;
import com.example.backend.entity.Voucher;
import jakarta.persistence.EntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import jakarta.transaction.Transactional;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    @Query(value = "select * from product where status = 0 ", nativeQuery = true)
    Page<Product> getAllPage(Pageable pageable);


    @Query(value = "select * from product where status = 1", nativeQuery = true)
    Page<Product> getAllPageDelete(Pageable pageable);

    Product findProductById(Integer id);

    @Query(value = "select * from product where (id like %?1% or name like %?1% or description like %?1% or price like %?1%) and status = 0 " +
            " ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Product> search(Pageable pageable, String key);

    @Query(value = "select * from product where (id like %?1% or name like %?1% or description like %?1% or price like %?1%) and status = 1 " +
            " ORDER BY date_update DESC", nativeQuery = true)
    Page<Product> deleteProduct(Pageable pageable, String key);

    @Modifying
    @Transactional
    @Query(value = "select pr from Product pr where pr.status = 0")
    List<Product> selectAll();

    @Modifying
    @Transactional
    @Query(value = "select * from product order by date_create desc limit 5", nativeQuery = true)
    List<Product> selectNewProduct();

    @Modifying
    @Transactional
    @Query(value = "select * from product order by price limit 5", nativeQuery = true)
    List<Product> selectChipProduct();

    @Modifying
    @Transactional
    @Query(value = "select pr from Product pr where pr.name = ?1")
    Product search(String name);

    Product findByName(String nameProduct);
    Product findByCode(String code);

    Product findById(int id);

    @Query(value = "select * from product where (name like %?1% or price like %?1%) and status = 0 and DATEDIFF(CURDATE(), date_create) < 30 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Product> productNew(Pageable pageable, String key);

    @Query(value = "select * from product where (name like %?1% or price like %?1%) and status = 0 and price < 2000000 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Product> productCheap(Pageable pageable, String key);

    @Query(value = "select * from product where (name like %?1% or price like %?1%) and status = 0 and price > ?2 and price < ?3 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Product> filterProductByPrice(Pageable pageable, String key, Integer minPrice, Integer maxPrice);

    @Query(value = "select product.id, product.id_battery, product.id_category, product.id_chip, product.id_manufacture, product.id_ram, product.id_screen, product.id_size, product.price, product.quantity, product.status, product.date_create, product.date_update, product.code, product.description, product.name, product.person_create, product.person_update from product join category on product.id_category = category.id where (product.name like %?1% or product.price like %?1%) and product.status = 0 and category.name like %?2% ORDER BY product.date_create DESC, product.Id DESC\n", nativeQuery = true)
    Page<Product> filterProductByCategory(Pageable pageable, String key, String nameCategory);

    @Query(value = "select * from product where (name like %?1% or price like %?1%) and status = 0 order by price asc", nativeQuery = true)
    Page<Product> filterProductByAscendingPrice(Pageable pageable, String key);

    @Query(value = "select * from product where (name like %?1% or price like %?1%) and status = 0 order by price desc", nativeQuery = true)
    Page<Product> filterProductByDecreasePrice(Pageable pageable, String key);

    @Query(value = "select product.id, product.date_create, product.date_update, product.person_create, product.person_update, product.status, product.code, product.description, product.name, product.price, product.quantity, product.id_ram, product.id_battery, product.id_category, product.id_chip, product.id_manufacture, product.id_screen, product.id_size from product join category on product.id_category = category.id where category.id = ?1", nativeQuery = true)
    Page<Product> listProductByCategories(Pageable pageable, Integer id);
}