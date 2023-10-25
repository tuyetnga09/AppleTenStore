package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.model.EmailService;
import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.model.bill.request.BillAskClient;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOffline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnlineAccount;
import com.example.backend.controller.order_management.service.BillService;
import com.example.backend.entity.Bill;
import com.example.backend.entity.SKU;
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

//    @PostMapping("")
//    public ResponseObj create(@RequestBody BillRequestOnlineAccount request) {
//        String userEmail = request.getEmail();
//        String subject = "Hoá đơn của bạn đã được tạo thành công";
//        StringBuilder message = new StringBuilder();
//        message.append("<html><body>");
//        message.append("<h2>Chào quý khách hàng ").append(request.getUserName()).append(",</h2>");
//        message.append("<p>Chúc mừng! Hoá đơn của bạn đã được tạo thành công.</p>");
//        message.append("<p>Dưới đây là chi tiết hoá đơn của bạn:</p>");
//
//        message.append("<table border='1'>");
//        message.append("<tr><th>Thông tin</th><th>Chi tiết</th></tr>");
//        message.append("<tr><td>Địa chỉ giao hàng</td><td>").append(request.getAddress()).append("</td></tr>");
//        message.append("<tr><td>Số tiền giao hàng</td><td>").append(request.getMoneyShip()).append("</td></tr>");
//        message.append("<tr><td>Số tiền giảm giá sản phẩm</td><td>").append(request.getItemDiscount()).append("</td></tr>");
//
//        message.append("</table>");
//        message.append("<p>Tổng số tiền thanh toán: ").append(request.getTotalMoney()).append("</p>");
//        message.append("<p>Phương thức thanh toán: ").append(request.getPaymentMethod()).append("</p>");
//
//        message.append("<p>Chi tiết hoá đơn:</p>");
//        message.append("<table border='1'>");
//        message.append("<tr><th>Tên sản phẩm</th><th>Số lượng</th><th>Giá tiền</th></tr>");
//        for (BillAskClient billDetail : request.getBillDetail()) {
//            message.append("<tr>");
//            message.append("<td>").append(billDetail.getQuantity()).append("</td>");
//            message.append("<td>").append(billDetail.getPrice()).append("</td>");
//            message.append("</tr>");
//        }
//        message.append("</table>");
//
//        message.append("<p>Tổng cộng: ").append(request.getAfterPrice()).append("</p>");
//        message.append("<p>Mã giảm giá: ").append(request.getIdVoucher()).append("</p>");
//
//        message.append("</body></html>");
//
//        emailService.sendEmailWithHtml(userEmail, subject, message.toString());
//        return new ResponseObj(billService.createBillAccountOnlineRequest(request));
//    }

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

    @GetMapping(value = "/search/{code}")
    public Bill paydone(@PathVariable String code){
        return this.billService.findByCode(code);
    }

    @PostMapping("/account")
    public ResponseObj create(@RequestBody BillRequestOnlineAccount request)  {
        return new ResponseObj(billService.createBillAccountOnlineRequest(request));
    }


    @GetMapping("/getAll")
    public List<Bill> listBillByIdAccount(@RequestParam("id") Integer id){
        return billService.listBillByIdAccount(id);
    }

    @GetMapping("/CXN")
    public List<Bill> listBillByIdAccountCXN(@RequestParam("id") Integer id){
        return billService.listBillByIdAccountCXN(id);
    }

    @GetMapping("/VC")
    public List<Bill> listBillByIdAccountVC(@RequestParam("id") Integer id){
        return billService.listBillByIdAccountVC(id);
    }

    @GetMapping("/DTT")
    public List<Bill> listBillByIdAccountDTT(@RequestParam("id") Integer id){
        return billService.listBillByIdAccountDTT(id);
    }

    @GetMapping("/DH")
    public List<Bill> listBillByIdAccountDH(@RequestParam("id") Integer id){
        return billService.listBillByIdAccountDH(id);
    }
}
