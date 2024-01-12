package com.example.backend.controller.order_management.model.billOffLine;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@ToString

public class ThongTinSuaHoaDon {
    private Integer idHoaDon;
    private String diaChi;
    private String hoVaTen;
    private List<NewProducts> products;
    private String sdt;
    private Integer soDiemSuDung;
    private BigDecimal tienShipMoi;
    private BigDecimal tongTienKhachPhaiTra;
    private BigDecimal tongTienSanPham;
    private VoucherGiamGia voucherGiamGia;
    private VoucherShip voucherShip;
    private Integer idAccount;

    public ThongTinSuaHoaDon() {
    }

    public ThongTinSuaHoaDon(Integer idHoaDon, String diaChi, String hoVaTen, List<NewProducts> products,
                             String sdt, Integer soDiemSuDung, BigDecimal tienShipMoi, BigDecimal tongTienKhachPhaiTra,
                             BigDecimal tongTienSanPham, VoucherGiamGia voucherGiamGia,
                             VoucherShip voucherShip, Integer idAccount) {
        this.idHoaDon = idHoaDon;
        this.diaChi = diaChi;
        this.hoVaTen = hoVaTen;
        this.products = products;
        this.sdt = sdt;
        this.soDiemSuDung = soDiemSuDung;
        this.tienShipMoi = tienShipMoi;
        this.tongTienKhachPhaiTra = tongTienKhachPhaiTra;
        this.tongTienSanPham = tongTienSanPham;
        this.voucherGiamGia = voucherGiamGia;
        this.voucherShip = voucherShip;
        this.idAccount = idAccount;
    }
}
