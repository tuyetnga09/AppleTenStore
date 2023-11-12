package com.example.backend.controller.order_management.controller.client;

import com.example.backend.controller.order_management.model.EmailService;
import com.example.backend.controller.order_management.model.ResponseObj;
import com.example.backend.controller.order_management.model.bill.request.BillAskClient;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOffline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnline;
import com.example.backend.controller.order_management.model.bill.request.BillRequestOnlineAccount;
import com.example.backend.controller.order_management.service.BillService;
import com.example.backend.entity.Bill;
import com.example.backend.entity.BillDetails;
import com.example.backend.entity.SKU;
import com.example.backend.entity.Voucher;
import com.example.backend.repository.BillDetailRepository;
import com.example.backend.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/customer/bill")
public class BillController {
    @Autowired
    private BillService billService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private BillDetailRepository billDetailRepository;
    @Autowired
    private VoucherRepository voucherRepository;

    @PostMapping("")
    public ResponseObj create(@RequestBody BillRequestOnline request) {
        String userEmail = request.getEmail();
        String subject = "Hoá đơn của bạn đã được tạo thành công";
        StringBuilder message = new StringBuilder();
        message.append("<html><body>");
        message.append("<h2>Chào quý khách hàng ").append(request.getUserName()).append(",</h2>");
        message.append("<p>Chúc mừng! Hoá đơn của bạn đã được tạo thành công.</p>");
        message.append("<p>Dưới đây là chi tiết hoá đơn của bạn:</p>");

        message.append("<p>Mã hóa đơn: ").append(request.getCode()).append("</p>");
        message.append("<p>Tên khách hàng: ").append(request.getUserName()).append(",</p>");
        message.append("<p>Số điện thoại: ").append(request.getPhoneNumber()).append(",</p>");
        message.append("<p>Địa chỉ: ").append(request.getAddress()).append(",</p>");
        message.append("<p>Phương thức thanh toán: ").append(request.getPaymentMethod()).append("</p>");
        message.append("<p>Mã giảm giá: ").append(request.getIdVoucher()).append("</p>");

        message.append("<p>Sản phẩm đã mua:</p>");
        message.append("<table border='1'>");
        message.append("<tr><th>Tên sản phẩm</th><th>Số lượng</th><th>Giá tiền</th><th>Thành tiền</th></tr>");
        for (BillAskClient billDetail : request.getBillDetail()) {
            message.append("<td>").append(billDetail.getSku()).append("</td>");
            message.append("<td>").append(billDetail.getQuantity()).append("</td>");
            message.append("<td>").append(billDetail.getPrice()).append("</td>");
            double totalValue = Integer.parseInt(String.valueOf(billDetail.getQuantity()))  * Integer.parseInt(String.valueOf(billDetail.getPrice()));
            message.append("<td>").append(totalValue).append("</td>");
            message.append("</tr>");
        }
        message.append("</table>");
        message.append("<p>Tổng tiền sản phẩm: ").append(request.getTotalMoney() + " VNĐ").append("</p>");

        message.append("<p>Tiền ship: ").append(request.getMoneyShip()+ " VNĐ").append("</p>");
        message.append("<p>Tiền giảm giá Voucher: ").append(request.getItemDiscount() + " VNĐ").append(",</p>");
        message.append("<p>Số tiền đã thanh toán: ").append(request.getAfterPrice() + " VNĐ").append("</p>");

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
    public void updateStatusBill(@PathVariable int id, @RequestParam("idAccount") Integer idAccount){
        this.billService.updateStatusBill(idAccount ,id);
    }

    @GetMapping(value = "/search/{code}")
    public Bill paydone(@PathVariable String code){
        return this.billService.findByCode(code);
    }

    @PostMapping("/account")
    public ResponseObj createBillAccount(@RequestBody BillRequestOnlineAccount request)  {
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

    @GetMapping("/CVC")
    public List<Bill> listBillByIdAccountCVC(@RequestParam("id") Integer id){
        return billService.listBillByIdAccountCVC(id);
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

    @DeleteMapping(value = "/delete/{id}")
    public void deleteBill(@PathVariable Integer id){
        this.billService.deleteBill(id);
    }

}
