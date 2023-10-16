package com.example.backend.controller.address.fee.dto;

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
@Builder
@ToString
public class TransportationFeeDTO {

    public static final Integer heightProduct = 16;

    public static final Integer lengthProduct = 8;

    public static final Integer weightProduct = 500;

    public static final Integer widthProduct = 4;

    private Integer toDistrictId;

    private String toWardCode;

    private Integer insuranceValue;

    private Integer quantity;

}
