package com.example.backend.controller.product_controller.model.respon;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class BillSeachKhoangNgay {
    //oder
    private Boolean check;
    private Integer choXacNhan;
    private Integer choVanChuyen;
    private Integer dangVanChuyen;
    private Integer daThanhToan;
    private Integer hoanTra;
    private Integer donHuy;
    private Integer sumBill;
    //tien
    private Long tongTienThucThu;
    private Long tongTienDonChoXacNhan;
    private Long tongTienDonChoVanChuyen;
    private Long tongTienDonDangVanChuyen;
    private Long tongTienDnDaThanhToan;
    private Long tongTienDonHoanTra;
    private Long tongTienDonHangHuy;

    // tài khoản
    private Long tongTaiKhoanMoi;
    private Long tongTaiKhoan;
    private Long tongTaiKhoanDangSuDung;
    private Long tongTaiKhoanTrongThang;
    private Long tongTaiKhoanDatHang;
    private Long tongTaiKhoanDaThanhToan;
    private Long tongTaiKhoanHuyDon;
}
