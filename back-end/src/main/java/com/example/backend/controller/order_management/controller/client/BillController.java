package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.model.EmailService;
import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.model.bill.request.BillAskClient;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOffline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnline;
import com.example.backend.controller.order_management.model.cart.ListCart;
import com.example.backend.controller.order_management.service.BillService;
import com.example.backend.entity.Bill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer/bill")
public class BillController {
    @Autowired
    private BillService billService;
    @Autowired
    private EmailService emailService;

    @PostMapping("")
    public ResponseObj create(@RequestBody BillRequestOnline request) {
        String userEmail = request.getEmail();
        String subject = "Hoá đơn của bạn đã được tạo thành công";
        StringBuilder message = new StringBuilder();
        message.append("<html><body>");
        message.append("<h2>Chào quý khách hàng ").append(request.getUserName()).append(",</h2>");
        message.append("<p>Chúc mừng! Hoá đơn của bạn đã được tạo thành công.</p>");
        message.append("<p>Dưới đây là chi tiết hoá đơn của bạn:</p>");

        message.append("<table border='1'>");
        message.append("<tr><th>Thông tin</th><th>Chi tiết</th></tr>");
        message.append("<tr><td>Địa chỉ giao hàng</td><td>").append(request.getAddress()).append("</td></tr>");
        message.append("<tr><td>Tỉnh/thành phố</td><td>").append(request.getProvince()).append("</td></tr>");
        message.append("<tr><td>Quận/huyện</td><td>").append(request.getDistrict()).append("</td></tr>");
        message.append("<tr><td>Phường/xã</td><td>").append(request.getWards()).append("</td></tr>");
        message.append("<tr><td>Số tiền giao hàng</td><td>").append(request.getMoneyShip()).append("</td></tr>");
        message.append("<tr><td>Số tiền giảm giá sản phẩm</td><td>").append(request.getItemDiscount()).append("</td></tr>");

        message.append("</table>");
        message.append("<p>Tổng số tiền thanh toán: ").append(request.getTotalMoney()).append("</p>");
        message.append("<p>Phương thức thanh toán: ").append(request.getPaymentMethod()).append("</p>");

        message.append("<p>Chi tiết hoá đơn:</p>");
        message.append("<table border='1'>");
        message.append("<tr><th>Tên sản phẩm</th><th>Số lượng</th><th>Giá tiền</th></tr>");
        for (BillAskClient billDetail : request.getBillDetail()) {
            message.append("<tr>");
            message.append("<td>").append(billDetail.getQuantity()).append("</td>");
            message.append("<td>").append(billDetail.getPrice()).append("</td>");
            message.append("</tr>");
        }
        message.append("</table>");

        message.append("<p>Tổng cộng: ").append(request.getAfterPrice()).append("</p>");
        message.append("<p>Mã giảm giá: ").append(request.getIdVoucher()).append("</p>");

        message.append("</body></html>");

        emailService.sendEmailWithHtml(userEmail, subject, message.toString());
        return new ResponseObj(billService.createBillCustomerOnlineRequest(request));
    }

    @PostMapping("/offline")
    public ResponseObj create(@RequestBody BillRequestOffline request) {
        String userEmail = request.getEmail();
        String subject = "Hoá đơn của bạn đã được tạo thành công";
        StringBuilder message = new StringBuilder();
        message.append("<html><body>");
        message.append("<h2>Chào quý khách hàng ").append(request.getUserName()).append(",</h2>");
        message.append("<p>Chúc mừng! Hoá đơn của bạn đã được tạo thành công.</p>");
        message.append("<p>Dưới đây là chi tiết hoá đơn của bạn:</p>");

        message.append("<table border='1'>");
        message.append("<tr><th>Thông tin</th><th>Chi tiết</th></tr>");
        message.append("<tr><td>Địa chỉ giao hàng</td><td>").append(request.getAddress()).append("</td></tr>");
        message.append("<tr><td>Tỉnh/thành phố</td><td>").append(request.getProvince()).append("</td></tr>");
        message.append("<tr><td>Quận/huyện</td><td>").append(request.getDistrict()).append("</td></tr>");
        message.append("<tr><td>Phường/xã</td><td>").append(request.getWards()).append("</td></tr>");
        message.append("<tr><td>Số tiền giao hàng</td><td>").append(request).append("</td></tr>");
        message.append("<tr><td>Số tiền giảm giá sản phẩm</td><td>").append(request.getItemDiscount()).append("</td></tr>");

        message.append("</table>");
        message.append("<p>Tổng số tiền thanh toán: ").append(request.getTotalMoney()).append("</p>");
        message.append("<p>Phương thức thanh toán: ").append(request.getPaymentMethod()).append("</p>");

        message.append("<p>Chi tiết hoá đơn:</p>");
        message.append("<table border='1'>");
        message.append("<tr><th>Tên sản phẩm</th><th>Số lượng</th><th>Giá tiền</th></tr>");
        for (BillAskClient cart : request.getBillDetail()) {
            message.append("<tr>");
            message.append("<td>").append(cart.getQuantity()).append("</td>");
            message.append("<td>").append(cart.getPrice()).append("</td>");
            message.append("</tr>");
        }
        message.append("</table>");

        message.append("<p>Tổng cộng: ").append(request.getAfterPrice()).append("</p>");
        message.append("<p>Mã giảm giá: ").append(request.getIdVoucher()).append("</p>");

        message.append("</body></html>");

        emailService.sendEmailWithHtml(userEmail, subject, message.toString());
        return new ResponseObj(billService.createBillCustomerOfflineRequest(request));
    }

    @PutMapping(value = "/update-status/{id}")
    public void updateStatusBill(@PathVariable int id){
        this.billService.updateStatusBill(id);
    }

    @GetMapping(value = "/paydone/{id}")
    public Bill paydone(@PathVariable int id){
        return this.billService.findById(id);
    }


}
