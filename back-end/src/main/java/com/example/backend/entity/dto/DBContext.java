package com.example.backend.entity.dto;

import com.example.backend.entity.Account;
import com.example.backend.entity.Battery;
import com.example.backend.entity.Capacity;
import com.example.backend.entity.Category;
import com.example.backend.entity.Chip;
import com.example.backend.entity.Manufacture;
import com.example.backend.entity.Payments;
import com.example.backend.entity.Product;
import com.example.backend.entity.Ram;
import com.example.backend.entity.Screen;
import com.example.backend.entity.Size;
import com.example.backend.entity.User;
import com.example.backend.entity.Voucher;
import com.example.backend.repository.AccountRepository;
import com.example.backend.repository.BatteryRepository;
import com.example.backend.repository.CapacityRepository;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ChipRepository;
import com.example.backend.repository.ColorRepository;
import com.example.backend.entity.Color;
import com.example.backend.repository.ManufactureRepository;
import com.example.backend.repository.PaymentsRepository;
import com.example.backend.repository.ProductRepository;
import com.example.backend.repository.RamRepository;
import com.example.backend.repository.ScreenRepository;
import com.example.backend.repository.SizeRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.repository.VoucherRepository;
import com.example.backend.untils.Status;
import com.example.backend.untils.StatusPayment;
import com.example.backend.untils.TypePayment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;


@SpringBootApplication
@EnableJpaRepositories(
        basePackages = "com.example.backend.repository")
public class DBContext implements CommandLineRunner {
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private RamRepository ramRepository;
    @Autowired
    private BatteryRepository  batteryRepository;
    @Autowired
    private CapacityRepository capacityRepository;
    @Autowired
    private CategoryRepository  categoryRepository;
    @Autowired
    private ChipRepository chipRepository;
    @Autowired
    private ManufactureRepository manufactureRepository;
    @Autowired
    private ScreenRepository  screenRepository;
    @Autowired
    private SizeRepository sizeRepository;

    @Autowired
    private VoucherRepository voucherRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PaymentsRepository paymentsRepository;

    @Override
    public void run(String... args) throws Exception {


        Color color = Color.builder().code("CL01").name("Green").build();
        Color color1 = Color.builder().code("CL02").name("Purple").build();
        Color color2 = Color.builder().code("CL03").name("Silver").build();
        Color color3 = Color.builder().code("CL04").name("Yellow").build();
        Color color4 = Color.builder().code("CL05").name("Pink").build();
        Color color5 = Color.builder().code("CL06").name("White").build();
        Color color6 = Color.builder().code("CL07").name("Black").build();
        Color color7 = Color.builder().code("CL08").name("Blue").build();

        colorRepository.save(color);
        colorRepository.save(color1);
        colorRepository.save(color2);
        colorRepository.save(color3);
        colorRepository.save(color4);
        colorRepository.save(color5);
        colorRepository.save(color6);
        colorRepository.save(color7);

        Ram ram0= Ram.builder().code("R1").name("3GB").build();
        ramRepository.save(ram0 );
        Ram ram1= Ram.builder().code("R2").name("4GB").build();
        ramRepository.save(ram1 );
        Ram ram2= Ram.builder().code("R3").name("5GB").build();
        ramRepository.save(ram2 );
        Ram ram3= Ram.builder().code("R4").name("6GB").build();
        ramRepository.save(ram3 );
        Ram ram4= Ram.builder().code("R5").name("7GB").build();
        ramRepository.save(ram4 );

        Category category0=Category .builder().code("CT1").name("Iphone X").build();
        Category category1=Category .builder().code("CT2").name("Iphone 11").build();
        Category category2=Category .builder().code("CT3").name("Iphone 12").build();
        Category category3=Category .builder().code("CT4").name("Samsung A23").build();
        Category category4=Category .builder().code("CT5").name("Samsung S22").build();
        categoryRepository.save(category0);
        categoryRepository.save(category1);
        categoryRepository.save(category2);
        categoryRepository.save(category3);
        categoryRepository.save(category4);


        Capacity capacity0 = Capacity .builder().code("C1").name("32GB").build();
        capacityRepository.save(capacity0);
        Capacity capacity1 = Capacity .builder().code("C2").name("64GB").build();
        capacityRepository.save(capacity1);
        Capacity capacity2 = Capacity .builder().code("C3").name("128GB").build();
        capacityRepository.save(capacity2);
        Capacity capacity3 = Capacity .builder().code("C4").name("256GB").build();
        capacityRepository.save(capacity3);
        Capacity capacity4 = Capacity .builder().code("C5").name("512GB").build();
        capacityRepository.save(capacity4);


        Battery battery0 = Battery  .builder().code("B1").name("1234mAh").build();
        batteryRepository.save(battery0);
        Battery battery1 = Battery  .builder().code("B2").name("2345mAh").build();
        batteryRepository.save(battery1);
        Battery battery2 = Battery  .builder().code("B3").name("2435mAh").build();
        batteryRepository.save(battery2 );
        Battery battery3 = Battery  .builder().code("B4").name("3456mAh").build();
        batteryRepository.save(battery3);
        Battery battery4 = Battery  .builder().code("B5").name("36544mAh").build();
        batteryRepository.save(battery4);

        Chip chip0= Chip .builder().code("CH1").name("A12").build();
        chipRepository.save(chip0);
        Chip chip1=Chip .builder().code("CH2").name("A13").build();
        chipRepository.save(chip1);
        Chip chip2=Chip .builder().code("CH3").name("A14").build();
        chipRepository.save(chip2);
        Chip chip3=Chip .builder().code("CH4").name("A15").build();
        chipRepository.save(chip3);
        Chip chip4=Chip .builder().code("CH5").name("A11").build();
        chipRepository.save(chip4);

        Manufacture manufacture0 = Manufacture .builder().code("M1").name("Trung Quốc").build();
        manufactureRepository.save(manufacture0);
        Manufacture manufacture1 =Manufacture . builder().code("M2").name("Mỹ").build();
        manufactureRepository.save(manufacture1);
        Manufacture manufacture2 = Manufacture .builder().code("M3").name("Nhật Bản").build();
        manufactureRepository.save(manufacture2);
        Manufacture manufacture3 = Manufacture .builder().code("M4").name("Ấn Độ").build();
        manufactureRepository.save(manufacture3);
        Manufacture manufacture4 = Manufacture .builder().code("M5").name("Việt Nam").build();
        manufactureRepository.save(manufacture4);

        Screen screen0 = Screen .builder().code("S1").name("8 inch").build();
        screenRepository.save(screen0  );
        Screen screen1= Screen .builder().code("S2").name("7 inch").build();
        screenRepository.save(screen1 );
        Screen screen2= Screen .builder().code("S3").name("6 inch").build();
        screenRepository.save(screen2 );
        Screen screen3= Screen .builder().code("S4").name("5 inch").build();
        screenRepository.save(screen3 );
        Screen screen4= Screen .builder().code("S5").name("5.5 inch").build();
        screenRepository.save(screen4 );

        Size size0= Size.builder().code("R1").name("80 mm").build();
        sizeRepository.save(size0);
        Size size1= Size.builder().code("R2").name("70 mm").build();
        sizeRepository.save(size1);
        Size size2= Size.builder().code("R3").name("60 mm").build();
        sizeRepository.save(size2);
        Size size3= Size.builder().code("R4").name("55 mm").build();
        sizeRepository.save(size3);
        Size size4= Size.builder().code("R5").name("51 mm").build();
        sizeRepository.save(size4);

        Voucher voucher = Voucher.builder()
                .code("V1")
                .name("Giảm giá sốc cuối tháng")
                .dateStart(LocalDate.of(2023, 10, 10))
                .dateEnd(LocalDate.of(2023, 10, 20))
                .conditionsApply(new BigDecimal("2000000"))
                .valueVoucher(new BigDecimal("1000000"))
                .valueMinimum(new BigDecimal("10000000"))
                .valueMaximum(new BigDecimal("15000000"))
                .typeVoucher(100)
                .quantity(5)
                .build();
        voucherRepository.save(voucher);

        Voucher voucher1 = Voucher.builder()
                .code("V2")
                .name("Giảm giá")
                .dateStart(LocalDate.of(2023, 9, 25))
                .dateEnd(LocalDate.of(2023, 9, 27))
                .conditionsApply(new BigDecimal("2100000"))
                .valueVoucher(new BigDecimal("1200000"))
                .valueMinimum(new BigDecimal("30000000"))
                .valueMaximum(new BigDecimal("15000000"))
                .typeVoucher(100)
                .quantity(3)
                .build();
        voucherRepository.save(voucher1);

        Voucher voucher2 = Voucher.builder()
                .code("V3")
                .name("Sale sốc cuối năm")
                .dateStart(LocalDate.of(2023, 9, 26))
                .dateEnd(LocalDate.of(2023, 9, 28))
                .conditionsApply(new BigDecimal("1100000"))
                .valueVoucher(new BigDecimal("2300000"))
                .valueMinimum(new BigDecimal("11000000"))
                .valueMaximum(new BigDecimal("22000000"))
                .typeVoucher(200)
                .quantity(7)
                .build();

        voucherRepository.save(voucher2);

        Voucher voucher3 = Voucher.builder()
                .code("V4")
                .name("Sale sập sàn")
                .dateStart(LocalDate.of(2023, 9, 21))
                .dateEnd(LocalDate.of(2023, 9, 30))
                .conditionsApply(new BigDecimal("2200000"))
                .valueVoucher(new BigDecimal("2500000"))
                .valueMinimum(new BigDecimal("11000000"))
                .valueMaximum(new BigDecimal("15000000"))
                .typeVoucher(100)
                .quantity(9)
                .build();
        voucherRepository.save(voucher3);

        Voucher voucher4 = Voucher.builder()
                .code("V5")
                .name("Tưng bừng giảm giá")
                .dateStart(LocalDate.of(2023, 9, 20))
                .dateEnd(LocalDate.of(2023, 9, 21))
                .conditionsApply(new BigDecimal("2600000"))
                .valueVoucher(new BigDecimal("3000000"))
                .valueMinimum(new BigDecimal("15000000"))
                .valueMaximum(new BigDecimal("25000000"))
                .typeVoucher(150)
                .quantity(8)
                .build();
        voucherRepository.save(voucher4);

        User user0=User .builder().fullName("Trung Hieu").dateOfBirth(LocalDate.of(2003, 12, 10)).phoneNumber("0355969499").email("trunghieunguyen673@gmail.com").gender(true).points(100000).status(Status.DANG_SU_DUNG).build();
        userRepository.save(user0);
        User user1=User .builder().fullName("Công Minh").dateOfBirth(LocalDate.of(2003, 07, 23)).phoneNumber("0355969888").email("congminh673@gmail.com").gender(true).points(200000).status(Status.DANG_SU_DUNG).build();
        userRepository.save(user1);
        User user2=User .builder().fullName("Hong Phong").dateOfBirth(LocalDate.of(1998, 10, 10)).phoneNumber("0355969555").email("hongphong673@gmail.com").gender(true).points(200000).status(Status.DANG_SU_DUNG).build();
        userRepository.save(user2);
        User user3=User .builder().fullName("Tuyet Nga").dateOfBirth(LocalDate.of(2003, 9, 14)).phoneNumber("0333369499").email("tuyetnga673@gmail.com").gender(false).points(500000).status(Status.DANG_SU_DUNG).build();
        userRepository.save(user3);
        User user4=User .builder().fullName("Van Hieu").dateOfBirth(LocalDate.of(2003, 9, 8)).phoneNumber("0355933499").email("vanhieu673@gmail.com").gender(true).points(50000).status(Status.DANG_SU_DUNG).build();
        userRepository.save(user4);


        Account account0=Account .builder().email("trunghieunguyen673@gmail.com").password("123456").status(Status.DANG_SU_DUNG).build();
        accountRepository.save(account0);
        Account account1=Account .builder().email("cong minh@gmail.com").password("123456").status(Status.DANG_SU_DUNG).build();
        accountRepository.save(account1);
        Account account2=Account .builder().email("hongphong@gmail.com").password("123456").status(Status.DANG_SU_DUNG).build();
        accountRepository.save(account2);
        Account account3=Account .builder().email("tuyetnga@gmail.com").password("123456").status(Status.DANG_SU_DUNG).build();
        accountRepository.save(account3);
        Account account4=Account .builder().email("hoanghieu@gmail.com").password("123456").status(Status.DANG_SU_DUNG).build();
        accountRepository.save(account4);

        Product product0 =Product.builder().code("PR1").name("Iphone 11 Pro Max").description("Khung viền thép").quantity(0).price(new BigDecimal(11000000)).build();
        productRepository.save(product0);
        Product product1=Product.builder().code("PR2").name("Iphone 12 Pro Max").description("Kính  cường lực").quantity(0).price(new BigDecimal(15500000)).build();
        productRepository.save(product1);
        Product product2 =Product.builder().code("PR3").name("Iphone 13 Pro Max").description("Khung viền thép").quantity(0).price(new BigDecimal(16600000)).build();
        productRepository.save(product2 );
        Product product3 =Product.builder().code("PR4").name("Iphone 14 Pro").description("Sạc nhanh 20W").quantity(0).price(new BigDecimal(11077000)).build();
        productRepository.save(product3 );
        Product product4 =Product.builder().code("PR5").name("Samsung S22 Utral").description("Màn hình tràn viền").quantity(0).price(new BigDecimal(25000000)).build();
        productRepository.save(product4 );

        Payments payment1 = Payments.builder()
                .code("PAY1")
                .payments(1)
                .moneyPayment(new BigDecimal("100.50"))
                .note("Payment for order 1")
                .confirmer("John Doe")
                .personCreate("Admin")
                .personUpdate("Admin")
                .dateCreate(new Date())
                .dateUpdate(new Date())
                .method(TypePayment.TIEN_MAT)
                .typePayment(StatusPayment.THANH_TOAN)
                .build();

        Payments payment2 = Payments.builder()
                .code("PAY2")
                .method(TypePayment.CHUYEN_KHOAN)
                .payments(2)
                .moneyPayment(new BigDecimal("75.25"))
                .note("Payment for order 2")
                .confirmer("Jane Smith")
                .personCreate("Admin")
                .personUpdate("Admin")
                .dateCreate(new Date())
                .dateUpdate(new Date())
                .typePayment(StatusPayment.THANH_TOAN)
                .build();

        Payments payment3 = Payments.builder()
                .code("PAY3")
                .method(TypePayment.THE)
                .payments(3)
                .moneyPayment(new BigDecimal("50.00"))
                .note("Payment for order 3")
                .confirmer("Bob Johnson")
                .personCreate("Admin")
                .personUpdate("Admin")
                .dateCreate(new Date())
                .dateUpdate(new Date())
                .typePayment(StatusPayment.THANH_TOAN)
                .build();

        Payments payment4 = Payments.builder()
                .code("PAY4")
                .method(TypePayment.CHUYEN_KHOAN)
                .payments(4)
                .moneyPayment(new BigDecimal("200.75"))
                .note("Payment for order 4")
                .confirmer("Alice Brown")
                .personCreate("Admin")
                .personUpdate("Admin")
                .dateCreate(new Date())
                .dateUpdate(new Date())
                .build();

        Payments payment5 = Payments.builder()
                .code("PAY5")
                .method(TypePayment.TIEN_MAT)
                .payments(5)
                .moneyPayment(new BigDecimal("150.25"))
                .note("Payment for order 5")
                .confirmer("Charlie Wilson")
                .personCreate("Admin")
                .personUpdate("Admin")
                .dateCreate(new Date())
                .dateUpdate(new Date())
                .build();

        paymentsRepository.save(payment1);
        paymentsRepository.save(payment2);
        paymentsRepository.save(payment3);
        paymentsRepository.save(payment4);
        paymentsRepository.save(payment5);

    }
    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBContext.class);
        ctx.close();
    }
}
