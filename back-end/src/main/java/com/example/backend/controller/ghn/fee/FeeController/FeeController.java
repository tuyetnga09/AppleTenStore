package com.example.backend.controller.ghn.fee.FeeController;

import com.example.backend.controller.ghn.fee.dto.TransportationFeeDTO;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/public/transportationFee/")
@CrossOrigin("*")
public class FeeController {

    @PostMapping("")
    public String getFee(@RequestBody TransportationFeeDTO transportationFeeDTO){
        try {
            RestTemplate restTemplate = new RestTemplate();

            // Tạo tiêu đề
            HttpHeaders headers = new HttpHeaders();
            headers.set("token", "99acedc2-6a67-11ee-a6e6-e60958111f48");
            headers.set("Content-Type", "application/json"); // Thay thế tên và giá trị của tiêu đề cần thiết

            // Tạo đối tượng HttpEntity chứa tiêu đề
            HttpEntity<String> entity = new HttpEntity<>(headers);

            // Thực hiện yêu cầu HTTP với tiêu đề
//            ResponseEntity<String> response = restTemplate.exchange(
//                    "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_type_id=2&from_district_id=3303&to_district_id=" + transportationFeeDTO.getToDistrictId() + "&to_ward_code=" + transportationFeeDTO.getToWardCode() + "&height=" + TransportationFeeDTO.heightProduct * transportationFeeDTO.getQuantity() + "&length=" + TransportationFeeDTO.lengthProduct * transportationFeeDTO.getQuantity() + "&weight=" + TransportationFeeDTO.weightProduct * transportationFeeDTO.getQuantity() + "&width=" + TransportationFeeDTO.widthProduct * transportationFeeDTO.getQuantity() + "&insurance_value=" + transportationFeeDTO.getInsuranceValue(), HttpMethod.GET, entity, String.class);
            ResponseEntity<String> response = restTemplate.exchange(
                    "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee?service_type_id=2&from_district_id=3303&to_district_id=" + transportationFeeDTO.getToDistrictId() + "&to_ward_code=" + transportationFeeDTO.getToWardCode() + "&height=" + TransportationFeeDTO.heightProduct + "&length=" + TransportationFeeDTO.lengthProduct + "&weight=" + TransportationFeeDTO.weightProduct * transportationFeeDTO.getQuantity() + "&width=" + TransportationFeeDTO.widthProduct * transportationFeeDTO.getQuantity() + "&insurance_value=" + transportationFeeDTO.getInsuranceValue(), HttpMethod.GET, entity, String.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                // Xử lý khi có lỗi
                return null;
            }
        }catch (Exception e){
            return null;
        }
    }
}
