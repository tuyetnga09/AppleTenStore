package com.example.backend.repository;

import com.example.backend.controller.order_management.model.billOffLine.ion.SkuBillOffLineIonRespon;
import com.example.backend.controller.product_controller.model.product_detail.ion.SkuIonAdmin;
import com.example.backend.controller.product_controller.model.product_detail.ion.SkuOfBillDetails;
import com.example.backend.controller.product_controller.model.request.ListSkuProduct;
import com.example.backend.entity.Product;
import com.example.backend.entity.SKU;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SKURepositoty extends JpaRepository<SKU, Long> {
    @Query(value = "SELECT sku.id, sku.price, product_Id, sku.quantity, sku.capacity, sku.color, sku.status " +
            " FROM sku join product on sku.product_Id = product.id\n" +
            " where product.id = (select  id from product ORDER BY id DESC limit 1) ", nativeQuery = true)
    List<SKU> skuFindByProduct();

    @Query(value = "select product_id, quantity, id, capacity, color, price, status from sku where capacity like %?1% and color like %?2% and product_id like %?3% limit 1", nativeQuery = true)
    SKU skuProduct(String capacity, String color, Integer idProduct);

    List<SKU> findByProduct(Product product);

    SKU findByProductAndCapacityAndColor(Product product, String capacity, String color);

    List<SKU> findByProductAndCapacity(Product product, String capacity);

    List<SKU> findByProductAndColor(Product product, String color);

//    @Query(value = "select s.price AS 'Price SKU', p.id AS 'Product ID', s.id AS 'SKU ID', s.quantity 'SKU Quantity', s.capacity AS 'Capacity', s.color AS 'Color', p.name AS 'Name Product'\n" +
//            "from sku s join product p on p.id = s.product_id;", nativeQuery = true)
//    Page<ListSkuProduct> getSkuProductFormSellOffline(Pageable pageable);

    @Query(value = "select s.price AS 'Price SKU', p.id AS 'Product ID', s.id AS 'SKU ID', s.quantity 'SKU Quantity', \n" +
            " s.capacity AS 'Capacity', s.color AS 'Color', p.name AS 'Name Product' \n" +
            " from sku s join product p on p.id = s.product_id \n" +
            " where p.status =0 and s.status =0 and (p.name like %?1% or s.capacity like %?1% or s.color like %?1% or s.price like %?1% or s.quantity like %?1%)\n" +
            " order by s.quantity desc", nativeQuery = true)
    List<ListSkuProduct> getSkuProductFormSellOffline(String key);

    @Query(value = "select sku.price AS 'Price SKU', product.id AS 'Product ID', sku.id AS 'SKU ID', sku.quantity 'SKU Quantity',\n" +
            " sku.capacity AS 'Capacity', sku.color AS 'Color', product.name AS 'Name Product' \n" +
            " from sku join product on sku.product_id = product.id join category on product.id_category = category.id \n" +
            " where category.id = ?1 and product.status =0 and sku.status =0 and (product.name like %?2% or sku.capacity like %?2% or sku.color like %?2% or sku.price \n" +
            " like %?2% or sku.quantity like %?2% )\n" +
            " order by sku.quantity desc", nativeQuery = true)
    List<ListSkuProduct> getSkuProductFormSellOfflineByCategory(Integer id, String key);


    @Query(value = "select p.name as 'nameProduct', s.color as 'colorSKU' , s.capacity as 'capacitySKU' " +
            " from sku s join product p on s.product_id = p.id where s.id =?1", nativeQuery = true)
    SkuBillOffLineIonRespon getOneSkuSellOffLine(Long idSku);

    @Modifying
    @Transactional
    Optional<SKU> findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "update sku set quantity = (quantity - ?2) where id = ?1", nativeQuery = true)
    void updateQuantity(Long id, Integer number);

    @Query(value = "select quantity from bill_detail where id_sku = ?1 and id_bill = ?2", nativeQuery = true)
    Integer quantitySkuInBillDetails(Long idSku, Integer idBill);

    //lấy ra list sku theo idproduct- phongnh
    @Query(value = "select p.id as 'idProduct', p.name as 'nameProduct', s.id as 'idSku' , \n" +
            "             s.capacity as 'skuCapacity', s.color as 'skuColor',count(DISTINCT s.id) as 'sumSKU', \n" +
            "             count(i.code_imei)as 'sumImei',\n" +
            "             SUM(CASE WHEN i.status = 3 or i.status=4 or i.status=5 or i.status=7 THEN 1 ELSE 0 END) AS 'sumImeiDaBan',\n" +
            "             SUM(CASE WHEN i.status = 2 THEN 1 ELSE 0 END) AS 'sumImeiTrongGioHang',\n" +
            "             SUM(CASE WHEN i.status = 0 THEN 1 ELSE 0 END) AS 'sumImeiTrongKho',\n" +
            "             SUM(CASE WHEN i.status = 1 THEN 1 ELSE 0 END) AS 'sumImeiNgungHoatDong',\n" +
            "             SUM(CASE WHEN i.status = 6 THEN 1 ELSE 0 END) AS 'sumImeiLoi'\n" +
            "             , p.status as 'statusProduct',\n" +
            "             s.status as 'statusSku', s.price as 'priceSKU'\n" +
            "             from product p  left join sku s on p.id = s.product_id left join imei i on s.id = i.sku_id  where p.id =?1\n" +
            "             group by p.id, p.name,  s.capacity, s.color,  s.id , p.status , s.price \n" +
            "             order by s.id desc", nativeQuery = true)
    List<SkuIonAdmin> getAllSkuIonWhereIdProduct(Integer idProduct);


    //lấy ra đối tượng sku theo idproduct- phongnh
    @Query(value = "select p.id as 'idProduct', p.name as 'nameProduct', s.id as 'idSku' ,\n" +
            "               s.capacity as 'skuCapacity', s.color as 'skuColor',count(DISTINCT s.id) as 'sumSKU',\n" +
            "                count(i.code_imei)as 'sumImei',\n" +
            "                SUM(CASE WHEN i.status = 3 or i.status=4 or i.status=5 or i.status=7 THEN 1 ELSE 0 END) AS 'sumImeiDaBan',\n" +
            "                SUM(CASE WHEN i.status = 2 THEN 1 ELSE 0 END) AS 'sumImeiTrongGioHang',\n" +
            "                SUM(CASE WHEN i.status = 0 THEN 1 ELSE 0 END) AS 'sumImeiTrongKho',\n" +
            "                SUM(CASE WHEN i.status = 1 THEN 1 ELSE 0 END) AS 'sumImeiNgungHoatDong',\n" +
            "                SUM(CASE WHEN i.status = 6 THEN 1 ELSE 0 END) AS 'sumImeiLoi'\n" +
            "                , p.status as 'statusProduct',\n" +
            "                s.status as 'statusSku', s.price as 'priceSKU'\n" +
            "                from product p  left join sku s on p.id = s.product_id left join imei i on s.id = i.sku_id  where s.id =?1\n" +
            "                group by p.id, p.name,  s.capacity, s.color,  s.id , p.status , s.price ", nativeQuery = true)
    SkuIonAdmin getOneSkuIonWhereIdSku(Long idSku);

    //update status sku where product_id
    @Modifying
    @Transactional
    @Query(value = "update sku set status =?1 where product_id = ?2 and status =?3", nativeQuery = true)
    void updateStatusSkuWhereIdProduct(Integer status, Integer idProduct, Integer statusWhere);

    @Query(value = "select * from sku where product_id = ?1 and price is not null order by price asc limit 1", nativeQuery = true)
    SKU findSKUPriceMin(Integer idProduct);

    @Query(value = "select * from sku where product_id = ?1 and price is not null order by price desc limit 1", nativeQuery = true)
    SKU findSKUPriceMax(Integer idProduct);

    @Query(value = "select sku.id, product.name, sku.product_id, sku.color, sku.capacity, sku.quantity, sku.price\n " +
            "from product right join sku on product.id = sku.product_id where sku.quantity > 0 and sku.status = 0", nativeQuery = true)
    List<SkuOfBillDetails> getSKUForAddBill();

    @Query(value = "select sku.id, product.name, sku.product_id, sku.color, sku.capacity, sku.quantity, sku.price\n " +
            "from product right join sku on product.id = sku.product_id where sku.quantity > 0 and sku.status = 0 and name like %?1%", nativeQuery = true)
    List<SkuOfBillDetails> searcgSKUForAddBill(String name);

}
