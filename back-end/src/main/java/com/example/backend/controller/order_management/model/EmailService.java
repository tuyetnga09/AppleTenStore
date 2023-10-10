package com.example.backend.controller.order_management.model;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Value("${spring.mail.username}")
    private String sender;
    public void sendEmailWithHtml(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);

            helper.setText(htmlContent, true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }


    public void sendEmailPasword(String to, String subject, String password) {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, "utf-8");

        String htmlBody = "<html>"
                + "<head>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; background-color: #007bff; color: #ffffff; padding: 20px; }"
                + ".container { max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 4px; }"
                + "h1 { text-align: center; color: #007bff; }"
                + "img.logo { display: block; margin: 0 auto; }"
                + ".form-group { text-align: center; }"
                + "label { display: block; font-weight: bold; margin-bottom: 5px; }"
                + "input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 4px; }"
                + "button { background-color: #0056b3; color: #fff; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }"
                + "button:hover { background-color: #003d80; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "<h1>TN Store</h1>"
                + "<form>"
                + "<div class='form-group'>"
                + "<label for='username'>Tài khoản :&nbsp;" + to + " </label>"
                + "</div>"
                + "<div class='form-group'>"
                + "<label for='password'>Mật khẩu :&nbsp;" + password + "</label>"
                + "</div>"
                + "</form>"
                + "</div>"
                + "</body>"
                + "</html>";
        try {
            helper.setFrom(sender);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }
}
