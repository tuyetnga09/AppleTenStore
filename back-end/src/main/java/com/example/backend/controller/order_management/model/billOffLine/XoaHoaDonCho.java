package com.example.backend.controller.order_management.model.billOffLine;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Builder
public class XoaHoaDonCho {
    private Integer idBill;
    private Integer idBillDetail;
    private Long idImeiDaBan;
    private String codeImei;

}
