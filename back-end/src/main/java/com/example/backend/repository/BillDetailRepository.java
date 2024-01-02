package com.example.backend.repository;

import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerIon;
import com.example.backend.controller.order_management.model.billDetail.response.BillDetailCustomerResponse;
import com.example.backend.controller.order_management.model.billDetail.response.BillDetailReturnAdmin;
import com.example.backend.controller.order_management.model.billOffLine.ion.BillDetailOffLineIon;
import com.example.backend.controller.order_management.model.billOffLine.ion.ListBillChoThanhToan;
import com.example.backend.controller.order_management.model.billOffLine.ion.ListBillChoThanhToanS2;
import com.example.backend.controller.order_management.model.billOffLine.ion.XoaHoaDonChoIon;
import com.example.backend.controller.product_controller.model.respon.TonTienBillTraHang;
import com.example.backend.entity.BillDetails;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillDetailRepository extends JpaRepository<BillDetails, Integer> {

    @Query(value = "select p.id AS 'IDProduct', b.id AS 'IDBill', s.id AS 'IDSKU', p.name AS 'NameProduct', s.capacity AS 'Capacity', s.color AS 'Color', c.name AS 'Category', bd.quantity AS 'Quantity', bd.price AS 'Price', bd.quantity * bd.price AS 'TotalMoney' from bill b join account a on b.id_account = a.id join bill_detail bd on b.id = bd.id_bill join sku s on bd.id_sku = s.id join product p on s.product_id = p.id join category c on p.id_category = c.id where b.id = ?1 order by b.id desc", nativeQuery = true)
    List<BillDetailCustomerResponse> getAll(Integer id);

    @Query(value = "select s.product_id as 'IdProduct', b.id AS 'IDBill', s.id AS 'IDSKU', p.name AS 'NameProduct', s.capacity AS 'Capacity', s.color AS 'Color', c.name AS 'Category', bd.quantity AS 'Quantity', bd.price AS 'Price', bd.quantity * bd.price AS 'TotalMoney' from bill b join bill_detail bd on b.id = bd.id_bill join sku s on bd.id_sku = s.id join product p on s.product_id = p.id join category c on p.id_category = c.id where b.id = ?1", nativeQuery = true)
    List<BillDetailCustomerResponse> getAllByCustomer(Integer id);

    @Transactional
    @Modifying
    @Query(value = "update bill_detail set status_bill = 'DA_HUY' where id_bill = ?1", nativeQuery = true)
    void deleteBillDetailsByBill(Integer id);

    @Query(value = "select * from bill_detail where id_bill =?1", nativeQuery = true)
    List<BillDetails> findByBillDetailOfIdBill(Integer idBill);

//    @Modifying
//    @Transactional
    @Query(value = " select b.id as 'id', b.quantity as 'quantity', b.price as 'price', b.status_bill as 'statusBillDetail'," +
            " b.id_bill as 'bill', b2.code as 'CodeBill',\n" +
            " b.person_create as  'personCreate', b.person_update as 'personUpdate', b.date_create as 'dateCreate'," +
            " b.date_update as 'dateUpdate',\n" +
            " s.id as 'idSKU', s.capacity as 'skuCapacity', s.color as 'skuColor' , s.price as 'skuPrice' ,\n" +
            " p.id as 'idProduct', p.name as 'nameProduct', b.price * b.quantity  as 'totalManyOneBillDetail'," +
            " count(i.code_imei) as 'soLuongImeiDaChon'\n" +
            " from bill_detail b LEFT JOIN imei_da_ban i on b.id = i.id_bill_detail join sku s on b.id_sku = s.id" +
            " join product p on s.product_id = p.id join bill b2 on b2.id = b.id_bill where b.id_bill =?1\n" +
            " group by id, quantity, price, statusBillDetail, bill, CodeBill, personCreate, personUpdate, dateCreate," +
            " dateUpdate, idSKU, skuCapacity, skuColor, skuPrice, idProduct, nameProduct, totalManyOneBillDetail", nativeQuery = true)
    List<BillDetailOffLineIon> findByBillDetailOffLineIdBill(Integer idBill);

    @Query(value = "select b.id as 'id', b.quantity as 'quantity', b.price as 'price', b.status_bill as 'statusBillDetail'," +
            " b.id_bill as 'bill', b2.code as 'codeBill', b2.id as 'IdBill', b.person_create as 'codeAccount',\n" +
            " b.person_create as  'personCreate', b.person_update as 'personUpdate', b.date_create as 'dateCreate'," +
            " b.date_update as 'dateUpdate',\n" +
            " s.id as 'idSKU', s.capacity as 'skuCapacity', s.color as 'skuColor' , s.price as 'skuPrice' ,\n" +
            "  p.id as 'idProduct', p.name as 'nameProduct', b.price * b.quantity  as 'totalManyOneBillDetail'," +
            " count(i.code_imei) as 'soLuongImeiDaChon'\n" +
            "from bill_detail b LEFT JOIN imei_da_ban i on b.id = i.id_bill_detail join sku s on b.id_sku = s.id " +
            "join product p on s.product_id = p.id join bill b2 on b2.id = b.id_bill where b2.code =?1\n" +
            "group by id, quantity, price, statusBillDetail, bill, CodeBill, personCreate, personUpdate, dateCreate, dateUpdate," +
            " idSKU, skuCapacity, skuColor, skuPrice, idProduct, nameProduct, totalManyOneBillDetail;\n", nativeQuery = true)
    List<ListBillChoThanhToan> findBillbyCodeBill(String codeBill);

//    @Query(value = "select bill.code as 'codeBill', a.email as 'codeAccount', bill.id as 'idBill' from bill join account a on a.id = bill.id_account where bill.code = ?1", nativeQuery = true)
//    ListBillChoThanhToanS2 findBillbyCodeBillS2(String codeBill);

    @Query(value = "select bill.code as 'codeBill', CONCAT(a.code, ' - ', u.full_name) as 'codeAccount', bill.id as 'idBill' from bill join account a on a.id = bill.id_account join user u on a.id_user = u.id where bill.code = ?1", nativeQuery = true)
    ListBillChoThanhToanS2 findBillbyCodeBillS2(String codeBill);

    @Query(value = "select b.id as 'id', b.quantity as 'quantity', b.price as 'price', b.status_bill as 'statusBillDetail'," +
            " b.id_bill as 'bill', b2.code as 'codeBill', b2.id as 'IdBill', b.person_create as 'codeAccount',\n" +
            " b.person_create as  'personCreate', b.person_update as 'personUpdate', b.date_create as 'dateCreate'," +
            " b.date_update as 'dateUpdate',\n" +
            " s.id as 'idSKU', s.capacity as 'skuCapacity', s.color as 'skuColor' , s.price as 'skuPrice' ,\n" +
            "  p.id as 'idProduct', p.name as 'nameProduct', b.price * b.quantity  as 'totalManyOneBillDetail'," +
            " count(i.code_imei) as 'soLuongImeiDaChon'\n" +
            "from bill_detail b LEFT JOIN imei_da_ban i on b.id = i.id_bill_detail join sku s on b.id_sku = s.id " +
            "join product p on s.product_id = p.id join bill b2 on b2.id = b.id_bill where b2.code =?1\n" +
            "group by id, quantity, price, statusBillDetail, bill, CodeBill, personCreate, personUpdate, dateCreate, dateUpdate," +
            " idSKU, skuCapacity, skuColor, skuPrice, idProduct, nameProduct, totalManyOneBillDetail;\n", nativeQuery = true)
    List<ListBillChoThanhToan> findBillbyCodeBillInDate(String codeBill);

    @Modifying
    @Transactional
    @Query(value = "update bill_detail set status_bill = 'XAC_NHAN' where id_bill = ?1", nativeQuery = true)
    void updateStatusBillDetailWhereIdBill(int id);

    @Modifying
    @Transactional
    @Query(value = "update bill_detail set status_bill = 'CHO_XAC_NHAN' where id_bill = ?1", nativeQuery = true)
    void returnStatusBillDetailWhereIdBill(int id);

    @Query(value = "select product.id as 'idProduct', category.name as 'category',  product.name as 'nameProduct', " +
            " sku.capacity as 'capacity', sku.color as 'color', \n" +
            " sku.price  as 'price', sku.id  as 'idSku', imei_da_ban.code_imei  as 'imei'," +
            " imei_da_ban.id  as 'idImei', imei_da_ban.status  as 'statusImei' , bill_detail.id_bill as 'idBill'," +
            " bill_detail.id as 'idBillDetail'\n" +
            " from bill_detail join imei_da_ban on bill_detail.id = imei_da_ban.id_bill_detail \n" +
            " join sku on bill_detail.id_sku = sku.id join product on sku.product_id = product.id  " +
            " join category on product.id_category = category.id \n" +
            " where bill_detail.id_bill =?1 and code_imei like %?2%\n" +
            " order by sku.id desc", nativeQuery = true)
    List<BillDetailCustomerIon> getAllBillDetaillOfIdBill(Integer idBill, String codeImei);

    @Query(value = "select product_id as 'ProductId', product.name as 'NameProduct', capacity, color, sku.price, imei_da_ban.code_imei as 'CodeImei' from imei_da_ban join bill_detail on imei_da_ban.id_bill_detail = bill_detail.id join bill on bill_detail.id_bill = bill.id join sku on bill_detail.id_sku = sku.id join product on sku.product_id = product.id where imei_da_ban.status = ?1 and id_bill = ?2 and code_imei like %?3%", nativeQuery = true)
    List<BillDetailReturnAdmin> getAllBillDetailReturn(Integer status, Integer idBill, String codeImei);
//    @Query(value = "select product_id as 'ProductId', product.name as 'NameProduct', capacity, color, sku.price, imei_da_ban.code_imei as 'CodeImei' from imei_da_ban join bill_detail on imei_da_ban.id_bill_detail = bill_detail.id join bill on bill_detail.id_bill = bill.id join sku on bill_detail.id_sku = sku.id join product on sku.product_id = product.id where imei_da_ban.status = ?1 and id_bill = ?2", nativeQuery = true)
//    List<BillDetailReturnAdmin> getAllBillDetailReturn(Integer status, Integer idBill);

    //lay ra tien cua tung ban ghi bill detail tar hang
    @Query(value = "select bill_detail.id_bill as 'idBill', bill_detail.id as 'idBillDetail'," +
            " imei_da_ban.id as 'idImeiDaBan', bill_detail.price as 'price'\n" +
            " from bill_detail join imei_da_ban on bill_detail.id = imei_da_ban.id_bill_detail  " +
            " where id_bill=?1 and imei_da_ban.status = 6", nativeQuery = true)
    List<TonTienBillTraHang> tongTienBilldetailTraHang(Integer  idBill);

    //lay ra tien cua tung ban ghi bill detail tra hang khong thanh cong - da guiw yeu cau tra hang - chua tra hang
    @Query(value = "select bill_detail.id_bill as 'idBill', bill_detail.id as 'idBillDetail'," +
            " imei_da_ban.id as 'idImeiDaBan', bill_detail.price as 'price'\n" +
            " from bill_detail join imei_da_ban on bill_detail.id = imei_da_ban.id_bill_detail  " +
            " where id_bill=?1 and imei_da_ban.status != 6", nativeQuery = true)
    List<TonTienBillTraHang> tongTienBilldetailChuaTraHang(Integer  idBill);

    //cuoi ngay lay ra list bill detail cua hoa don cho cuoi ngay de xoa
    @Query(value = "select bill_detail.id_bill as 'idBill', bill_detail.id as 'idBillDetail', imei_da_ban.id as 'idImeiDaBan', imei_da_ban.code_imei as 'codeImei'\n" +
            "from bill_detail join imei_da_ban on bill_detail.id = imei_da_ban.id_bill_detail  where id_bill =?1", nativeQuery = true)
    List<XoaHoaDonChoIon> listSanPhamHoaDonChoCanXoa(Integer  idBill);



    @Query(value = "select id_sku from bill join bill_detail bd on bill.id = bd.id_bill join sku s on bd.id_sku = s.id where bill.id =?1", nativeQuery = true)
    List<Long> listIdSkuOffindByIdBill(Integer  idBill);
}
