package com.example.backend.repository;



import com.example.backend.controller.product_controller.model.product_detail.ion.ProductDetailIonAdmin;
import com.example.backend.controller.product_controller.model.product_detail.ion.SkuIonAdmin;
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

    @Query(value = "select * from product where (name like %?1%) and status = 0 " +
            " ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Product> search(Pageable pageable, String key);

    @Query(value = "select * from product where (name like %?1%) and status = 0 " +
            " ORDER BY date_create ASC, Id ASC", nativeQuery = true)
    Page<Product> search2(Pageable pageable, String key);

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

    @Query(value = "select * from product where (name like %?1%) and status = 0 and DATEDIFF(CURDATE(), date_create) < 30 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    Page<Product> productNew(Pageable pageable, String key);

//    @Query(value = "select * from product where (name like %?1% or price like %?1%) and status = 0 and price < 2000000 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    @Query(value = "SELECT p.id, p.id_battery,p.id_category, p.id_chip, p.id_manufacture, p.id_ram, p.id_screen, p.id_size, p.price, p.quantity, p.status, p.date_create, p.date_update, p.code, p.description, p.name, p.person_update, p.person_create FROM sku s JOIN product p ON s.product_id = p.id where (name like %?1%) and p.status = 0 GROUP BY p.id HAVING MAX(s.price) < 10000000", nativeQuery = true)
    Page<Product> productCheap(Pageable pageable, String key);

//    @Query(value = "select * from product where (name like %?1% or price like %?1%) and status = 0 and price > ?2 and price < ?3 ORDER BY date_create DESC, Id DESC", nativeQuery = true)
    @Query(value = "SELECT p.id, p.id_battery,p.id_category, p.id_chip, p.id_manufacture, p.id_ram, p.id_screen, p.id_size, p.price, p.quantity, p.status, p.date_create, p.date_update, p.code, p.description, p.name, p.person_update, p.person_create FROM sku s JOIN product p ON s.product_id = p.id where (name like %?1%) and p.status = 0 GROUP BY p.id HAVING MAX(s.price) BETWEEN ?2 AND ?3", nativeQuery = true)
    Page<Product> filterProductByPrice(Pageable pageable, String key, Integer minPrice, Integer maxPrice);

    @Query(value = "select product.id, product.id_battery, product.id_category, product.id_chip, product.id_manufacture, product.id_ram, product.id_screen, product.id_size, product.price, product.quantity, product.status, product.date_create, product.date_update, product.code, product.description, product.name, product.person_create, product.person_update from product join category on product.id_category = category.id where (product.name like %?1%) and product.status = 0 and category.name like %?2% ORDER BY product.date_create DESC, product.Id DESC\n", nativeQuery = true)
    Page<Product> filterProductByCategory(Pageable pageable, String key, String nameCategory);

//    @Query(value = "select * from product where (name like %?1% or price like %?1%) and status = 0 order by price asc", nativeQuery = true)
    @Query(value = "SELECT p.id, p.id_battery,p.id_category, p.id_chip, p.id_manufacture, p.id_ram, p.id_screen, p.id_size, p.price, p.quantity, p.status, p.date_create, p.date_update, p.code, p.description, p.name, p.person_update, p.person_create FROM sku s JOIN product p ON s.product_id = p.id where (name like %?1%) and p.status = 0 GROUP BY p.id HAVING MAX(s.price) order by MAX(s.price) asc ", nativeQuery = true)
    Page<Product> filterProductByAscendingPrice(Pageable pageable, String key);

//    @Query(value = "select * from product where (name like %?1% or price like %?1%) and status = 0 order by price desc", nativeQuery = true)
    @Query(value = "SELECT p.id, p.id_battery,p.id_category, p.id_chip, p.id_manufacture, p.id_ram, p.id_screen, p.id_size, p.price, p.quantity, p.status, p.date_create, p.date_update, p.code, p.description, p.name, p.person_update, p.person_create FROM sku s JOIN product p ON s.product_id = p.id where (name like %?1%) and p.status = 0 GROUP BY p.id HAVING MAX(s.price) order by MAX(s.price) desc ", nativeQuery = true)
    Page<Product> filterProductByDecreasePrice(Pageable pageable, String key);

    @Query(value = "select product.id, product.date_create, product.date_update, product.person_create, product.person_update, product.status, product.code, product.description, product.name, product.price, product.quantity, product.id_ram, product.id_battery, product.id_category, product.id_chip, product.id_manufacture, product.id_screen, product.id_size from product join category on product.id_category = category.id where category.id = ?1", nativeQuery = true)
    List<Product> listProductByCategories(Integer id);

    //lấy ra product - phongnh
    @Query(value = "select p.id as 'idProduct', p.name as 'nameProduct',count(DISTINCT s.id) as 'sumSKU'," +
            " count(i.code_imei)as 'sumImei', SUM(CASE WHEN i.status = 3 THEN 1 ELSE 0 END) AS 'sumImeiDaBan',\n" +
            " SUM(CASE WHEN i.status = 2 THEN 1 ELSE 0 END) AS 'sumImeiTrongGioHang', " +
            " SUM(CASE WHEN i.status = 0 THEN 1 ELSE 0 END) AS 'sumImeiTrongKho',\n" +
            "  SUM(CASE WHEN i.status = 1 THEN 1 ELSE 0 END) AS 'sumImeiNgungHoatDong', p.status as 'statusProduct'\n" +
            " from product p  left join sku s on p.id = s.product_id left join imei i on s.id = i.sku_id  \n" +
            " group by p.id, p.name order by p.id desc", nativeQuery = true)
    List<ProductDetailIonAdmin> getAllProductDetailIon();

}