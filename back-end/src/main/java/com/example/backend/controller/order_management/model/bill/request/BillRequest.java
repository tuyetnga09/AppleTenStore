package com.example.backend.controller.order_management.model.bill.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BillRequest {
    private long startTime;
    private String startTimeString = new String("");
    private long endTime;
    private String endTimeString = new String("");
    private String[] status = new String[]{};
    private long endDeliveryDate;
    private String endDeliveryDateString = new String("");
    private long startDeliveryDate;
    private String startDeliveryDateString = new String("");
    private String convertStatus;
    private String key;
    private String employees;
    private String user;
    private String phoneNumber;
    private String type ;
}
