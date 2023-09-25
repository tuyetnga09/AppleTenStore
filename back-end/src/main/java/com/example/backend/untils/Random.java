package com.example.backend.untils;

import org.apache.commons.lang3.RandomStringUtils;

public class Random {
    public String randomToString(String name, int soLuong) {
        java.util.Random random = new java.util.Random();
        int randomNumber = random.nextInt(soLuong);
        return name + randomNumber;
    }
    private static int previousRandomNumber = 1;

    public String randomToString(String name) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(name).append(previousRandomNumber);
        previousRandomNumber++;
        return stringBuilder.toString();
    }

    public  int generateRandom6DigitNumber() {

        java.util.Random random = new java.util.Random();
        int minRange = 100000; // Số nhỏ nhất có 6 chữ số
        int maxRange = 999999; // Số lớn nhất có 6 chữ số

        return random.nextInt(maxRange - minRange + 1) + minRange;
    }
    public  String randomPassword() {
        String password =  RandomStringUtils.random(8,true,true);

        return password;
    }
}
