package com.example.backend.controller.order_management.service.impl;

import com.example.backend.controller.order_management.service.PointConversionService;
import com.example.backend.entity.PointConversion;
import com.example.backend.repository.PointConversionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PointConversionServiceImpl implements PointConversionService {

    @Autowired
    private PointConversionRepository pointConversionRepository;

    @Override
    public PointConversion updateMoney(Integer money) {
        PointConversion pointConversion = pointConversionRepository.getOneLatest();
        if (pointConversion == null){
            PointConversion pointConversion1 = PointConversion.builder()
                    .pointsConsumptionMoney(money)
                    .build();
            pointConversionRepository.save(pointConversion1);
            return pointConversion1;
        }else {
            pointConversion.setPointsConsumptionMoney(money);
            pointConversionRepository.save(pointConversion);
            return pointConversion;
        }
    }
}
