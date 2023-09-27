package com.example.backend.untils;

import org.apache.commons.lang3.RandomStringUtils;

public class Random {

    private static int previousRandomNumber = 1;

    public String randomToString(String name) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(name).append(previousRandomNumber);
        previousRandomNumber++;
        return stringBuilder.toString();
    }

    public  String randomPassword() {
        String password =  RandomStringUtils.random(8,true,true);

        return password;
    }
}
