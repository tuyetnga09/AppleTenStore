package com.example.backend.entity.projectIon;

import java.math.BigDecimal;

public interface AnnualRevenueIon {
    Integer getMonth();

    BigDecimal getTotalMoney();

    Integer getQuantity();
}
