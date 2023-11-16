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
import com.example.backend.repository.SKURepositoty;
import com.example.backend.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
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
    @Autowired
    private SKURepositoty skuRepositoty;

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
//        message.append("<p>Mã giảm giá: ").append(request.getIdVoucher()).append("</p>");

        message.append("<p>Sản phẩm đã mua:</p>");
        message.append("<table border='1'>");
        message.append("<tr><th>Tên sản phẩm</th><th>Số lượng</th><th>Giá tiền</th><th>Thành tiền</th></tr>");
        for (BillAskClient billDetail : request.getBillDetail()) {
            SKU sku = skuRepositoty.getOne(billDetail.getSku());
            message.append("<tr>");
            message.append("<td>").append(sku.getProduct().getName() + " - " + sku.getCapacity() + " - " + sku.getColor()).append("</td>");
            message.append("<td>").append(billDetail.getQuantity()).append("</td>");
            message.append("<td>").append(billDetail.getPrice() + " VNĐ").append("</td>");
            message.append("<td>").append(billDetail.getPrice().multiply(BigDecimal.valueOf(billDetail.getQuantity())) + " VNĐ").append("</td>");
            message.append("</tr>");
        }
        message.append("</table>");

        message.append("<h3>Tổng tiền sản phẩm: ").append(request.getTotalMoney() + " VNĐ").append("</h3>");
        message.append("<h3>Tiền ship: ").append(request.getMoneyShip()+ " VNĐ").append("</h5>");
        message.append("<h3>Tiền giảm giá Voucher: ").append(request.getItemDiscount() + " VNĐ").append("</h3>");
        message.append("<h3>Tiền giảm giá vận chuyển: ").append(request.getItemDiscountFreeShip() + " VNĐ").append("</h3>");
        message.append("<h3>Số tiền đã thanh toán: ").append(request.getAfterPrice() + " VNĐ").append("</h3>");

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

        message.append("<p>Mã hóa đơn: ").append(request.getCode()).append("</p>");
        message.append("<p>Tên khách hàng: ").append(request.getUserName()).append(",</p>");
        message.append("<p>Số điện thoại: ").append(request.getPhoneNumber()).append(",</p>");
        message.append("<p>Địa chỉ: ").append(request.getAddress()).append(",</p>");
        message.append("<p>Tỉnh/thành phố</td><td>").append(request.getProvince()).append("</p>");
        message.append("<p>Quận/huyện</td><td>").append(request.getDistrict()).append("</p>");
        message.append("<p>Phường/xã</td><td>").append(request.getWards()).append("</p>");
        message.append("<p>Phương thức thanh toán: ").append(request.getPaymentMethod()).append("</p>");

        message.append("<p>Sản phẩm đã mua:</p>");
        message.append("<table border='1'>");
        message.append("<tr><th>Tên sản phẩm</th><th>Số lượng</th><th>Giá tiền</th><th>Thành tiền</th></tr>");
        for (BillAskClient billDetail : request.getBillDetail()) {
            SKU sku = skuRepositoty.getOne(billDetail.getSku());
            message.append("<tr>");
            message.append("<td>").append(sku.getProduct().getName() + " - " + sku.getCapacity() + " - " + sku.getColor()).append("</td>");
            message.append("<td>").append(billDetail.getQuantity()).append("</td>");
            message.append("<td>").append(billDetail.getPrice() + " VNĐ").append("</td>");
            message.append("<td>").append(billDetail.getPrice().multiply(BigDecimal.valueOf(billDetail.getQuantity())) + " VNĐ").append("</td>");
            message.append("</tr>");
        }
        message.append("</table>");

        message.append("<h3>Tổng tiền sản phẩm: ").append(request.getTotalMoney() + " VNĐ").append("</h3>");
        message.append("<h3>Tiền ship: ").append(request.getMoneyShip()+ " VNĐ").append("</h5>");
        message.append("<h3>Tiền giảm giá Voucher: ").append(request.getItemDiscount() + " VNĐ").append("</h3>");
        message.append("<h3>Tiền giảm giá vận chuyển: ").append(request.getItemDiscountFreeShip() + " VNĐ").append("</h3>");
        message.append("<h3>Số tiền đã thanh toán: ").append(request.getAfterPrice() + " VNĐ").append("</h3>");
        message.append("<h1>ĐỂ TRA CỨU ĐƠN HÀNG, MỜI QUÝ KHÁCH HÀNG LÀM THEO CÁC BƯỚC SAU:  https://docs.google.com/document/d/1kiyWIvSPK-4bmuVOtOEqBTCkoHSpd9dBOuf43YrkP4U/edit</h1>");
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
//        message.append("<p>Tỉnh/thành phố</td><td>").append(request.getProvince()).append("</p>");
//        message.append("<p>Quận/huyện</td><td>").append(request.getDistrict()).append("</p>");
//        message.append("<p>Phường/xã</td><td>").append(request.getWards()).append("</p>");
        message.append("<p>Phương thức thanh toán: ").append(request.getPaymentMethod()).append("</p>");

        message.append("<p>Sản phẩm đã mua:</p>");
        message.append("<table border='1'>");
        message.append("<tr><th>Tên sản phẩm</th><th>Số lượng</th><th>Giá tiền</th><th>Thành tiền</th></tr>");
        for (BillAskClient billDetail : request.getBillDetail()) {
            SKU sku = skuRepositoty.getOne(billDetail.getSku());
            message.append("<tr>");
            message.append("<td>").append(sku.getProduct().getName() + " - " + sku.getCapacity() + " - " + sku.getColor()).append("</td>");
            message.append("<td>").append(billDetail.getQuantity()).append("</td>");
            message.append("<td>").append(billDetail.getPrice() + " VNĐ").append("</td>");
            message.append("<td>").append(billDetail.getPrice().multiply(BigDecimal.valueOf(billDetail.getQuantity())) + " VNĐ").append("</td>");
            message.append("</tr>");
        }
        message.append("</table>");

        message.append("<h3>Tổng tiền sản phẩm: ").append(request.getTotalMoney() + " VNĐ").append("</h3>");
        message.append("<h3>Tiền ship: ").append(request.getMoneyShip()+ " VNĐ").append("</h5>");
        message.append("<h3>Tiền giảm giá Voucher: ").append(request.getItemDiscount() + " VNĐ").append("</h3>");
        message.append("<h3>Tiền giảm giá vận chuyển: ").append(request.getItemDiscountFreeShip() + " VNĐ").append("</h3>");
        message.append("<h3>Số điểm đã sử dụng: ").append(request.getPoint() + " VNĐ").append("</h3>");
        message.append("<h3>Số tiền đã thanh toán: ").append(request.getAfterPrice() + " VNĐ").append("</h3>");

        message.append("</body></html>");

        emailService.sendEmailWithHtml(userEmail, subject, message.toString());
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
