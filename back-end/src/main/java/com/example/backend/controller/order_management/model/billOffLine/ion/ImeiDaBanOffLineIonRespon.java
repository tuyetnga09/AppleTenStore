package com.example.backend.controller.order_management.model.billOffLine.ion;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;


public interface ImeiDaBanOffLineIonRespon {
    @Value("#{target.idImeiDaBan}")
    Long getIdImeiDaBan();

    @Value("#{target.codeImeiDaBan}")
    String getCodeImeiDaBan();
}
