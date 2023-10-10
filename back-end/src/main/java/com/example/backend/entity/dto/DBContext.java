package com.example.backend.entity.dto;

import com.example.backend.entity.*;
import com.example.backend.repository.*;
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
    private BatteryRepository batteryRepository;
    @Autowired
    private CapacityRepository capacityRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ChipRepository chipRepository;
    @Autowired
    private ManufactureRepository manufactureRepository;
    @Autowired
    private ScreenRepository screenRepository;
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
        addColor("CL01", "Green");
        addColor("CL02", "Purple");
        addColor("CL03", "Silver");
        addColor("CL04", "Yellow");
        addColor("CL05", "Pink");
        addColor("CL06", "White");
        addColor("CL07", "Black");
        addColor("CL08", "Blue");

        addRam("R1", "3GB");
        addRam("R2", "4GB");
        addRam("R3", "5GB");
        addRam("R4", "6GB");
        addRam("R5", "7GB");
        addCategory("CT1", "Iphone X");
        addCategory("CT2", "Iphone 11");
        addCategory("CT3", "Iphone 12");
        addCategory("CT4", "Samsung A23");
        addCategory("CT5", "Samsung S22");

        // Thêm dữ liệu cho bảng Capacity
        addCapacity("C1", "32GB");
        addCapacity("C2", "64GB");
        addCapacity("C3", "128GB");
        addCapacity("C4", "256GB");
        addCapacity("C5", "512GB");

        // Thêm dữ liệu cho bảng Battery
        addBattery("B1", "1234mAh");
        addBattery("B2", "2345mAh");
        addBattery("B3", "2435mAh");
        addBattery("B4", "3456mAh");
        addBattery("B5", "36544mAh");

        // Thêm dữ liệu cho bảng Chip
        addChip("CH1", "A12");
        addChip("CH2", "A13");
        addChip("CH3", "A14");
        addChip("CH4", "A15");
        addChip("CH5", "A11");
        addManufacture("M1", "Trung Quốc");
        addManufacture("M2", "Mỹ");
        addManufacture("M3", "Nhật Bản");
        addManufacture("M4", "Ấn Độ");
        addManufacture("M5", "Việt Nam");

        // Thêm dữ liệu cho bảng Screen
        addScreen("S1", "8 inch");
        addScreen("S2", "7 inch");
        addScreen("S3", "6 inch");
        addScreen("S4", "5 inch");
        addScreen("S5", "5.5 inch");

        // Thêm dữ liệu cho bảng Size
        addSize("SZ1", "80 mm");
        addSize("SZ2", "70 mm");
        addSize("SZ3", "60 mm");
        addSize("SZ4", "55 mm");
        addSize("SZ5", "51 mm");

        // Thêm dữ liệu cho bảng Voucher
        addVoucher("V1", "Giảm giá sốc cuối tháng", LocalDate.of(2023, 10, 10), LocalDate.of(2023, 10, 20), new BigDecimal("2000000"), new BigDecimal("1000000"), new BigDecimal("10000000"), new BigDecimal("15000000"), 100, 5);
        addVoucher("V2", "Giảm giá", LocalDate.of(2023, 9, 25), LocalDate.of(2023, 9, 27), new BigDecimal("2100000"), new BigDecimal("1200000"), new BigDecimal("30000000"), new BigDecimal("15000000"), 100, 3);
        addVoucher("V3", "Sale sốc cuối năm", LocalDate.of(2023, 9, 26), LocalDate.of(2023, 9, 28), new BigDecimal("1100000"), new BigDecimal("2300000"), new BigDecimal("11000000"), new BigDecimal("22000000"), 200, 7);
        addVoucher("V4", "Sale sập sàn", LocalDate.of(2023, 9, 21), LocalDate.of(2023, 9, 30), new BigDecimal("2200000"), new BigDecimal("2500000"), new BigDecimal("11000000"), new BigDecimal("15000000"), 100, 9);
        addVoucher("V5", "Tưng bừng giảm giá", LocalDate.of(2023, 9, 20), LocalDate.of(2023, 9, 21), new BigDecimal("2600000"), new BigDecimal("3000000"), new BigDecimal("15000000"), new BigDecimal("25000000"), 150, 8);

        addUser("Trung Hieu", LocalDate.of(2003, 12, 10), "0355969499", "trunghieunguyen673@gmail.com", true, 100000, Status.DANG_SU_DUNG);
        addUser("Công Minh", LocalDate.of(2003, 7, 23), "0355969888", "congminh673@gmail.com", true, 200000, Status.DANG_SU_DUNG);
        addUser("Hong Phong", LocalDate.of(1998, 10, 10), "0355969555", "hongphong673@gmail.com", true, 200000, Status.DANG_SU_DUNG);
        addUser("Tuyet Nga", LocalDate.of(2003, 9, 14), "0333369499", "tuyetnga673@gmail.com", false, 500000, Status.DANG_SU_DUNG);
        addUser("Van Hieu", LocalDate.of(2003, 9, 8), "0355933499", "vanhieu673@gmail.com", true, 50000, Status.DANG_SU_DUNG);

        // Thêm dữ liệu cho bảng Account
        addAccount("trunghieunguyen673@gmail.com", "123456", Status.DANG_SU_DUNG);
        addAccount("congminh673@gmail.com", "123456", Status.DANG_SU_DUNG);
        addAccount("hongphong673@gmail.com", "123456", Status.DANG_SU_DUNG);
        addAccount("ngaptt1409@gmail.com", "123456", Status.DANG_SU_DUNG);
        addAccount("hoanghieu673@gmail.com", "123456", Status.DANG_SU_DUNG);

        // Thêm dữ liệu cho bảng Product
        addProduct("PR1", "Iphone 11 Pro Max", "Khung viền thép", 0, new BigDecimal(11000000));
        addProduct("PR2", "Iphone 12 Pro Max", "Kính  cường lực", 0, new BigDecimal(15500000));
        addProduct("PR3", "Iphone 13 Pro Max", "Khung viền thép", 0, new BigDecimal(16600000));
        addProduct("PR4", "Iphone 14 Pro", "Sạc nhanh 20W", 0, new BigDecimal(11077000));
        addProduct("PR5", "Samsung S22 Utral", "Màn hình tràn viền", 0, new BigDecimal(25000000));

        // Thêm dữ liệu cho bảng Payments
        addPayment("PAY1", 1, new BigDecimal("100.50"), "Payment for order 1", "John Doe", TypePayment.TIEN_MAT, StatusPayment.THANH_TOAN);
        addPayment("PAY2", 2, new BigDecimal("75.25"), "Payment for order 2", "Jane Smith", TypePayment.CHUYEN_KHOAN, StatusPayment.THANH_TOAN);
        addPayment("PAY3", 3, new BigDecimal("50.00"), "Payment for order 3", "Bob Johnson", TypePayment.THE, StatusPayment.THANH_TOAN);
        addPayment("PAY4", 4, new BigDecimal("200.75"), "Payment for order 4", "Alice Brown", TypePayment.CHUYEN_KHOAN, null);
        addPayment("PAY5", 5, new BigDecimal("150.25"), "Payment for order 5", "Charlie Wilson", TypePayment.TIEN_MAT, StatusPayment.THANH_TOAN);

}

    private void addColor(String code, String name) {
        if (colorRepository.findByCode(code) == null) {
            Color color = Color.builder().code(code).name(name).build();
            colorRepository.save(color);
        }
    }

    private void addRam(String code, String name) {
        if (ramRepository.findByCode(code) == null) {
            Ram ram = Ram.builder().code(code).name(name).build();
            ramRepository.save(ram);
        }
    }
    private void addBattery(String code, String name) {
        if (batteryRepository.findByCode(code) == null) {
            Battery battery = Battery.builder().code(code).name(name).build();
            batteryRepository.save(battery);
        }
    }

    private void addCapacity(String code, String name) {
        if (capacityRepository.findByCode(code) == null) {
            Capacity capacity = Capacity.builder().code(code).name(name).build();
            capacityRepository.save(capacity);
        }
    }

    private void addCategory(String code, String name) {
        if (categoryRepository.findByCode(code) == null) {
            Category category = Category.builder().code(code).name(name).build();
            categoryRepository.save(category);
        }
    }

    private void addChip(String code, String name) {
        if (chipRepository.findByCode(code) == null) {
            Chip chip = Chip.builder().code(code).name(name).build();
            chipRepository.save(chip);
        }
    }
    private void addManufacture(String code, String name) {
        if (manufactureRepository.findByCode(code) == null) {
            Manufacture manufacture = Manufacture.builder().code(code).name(name).build();
            manufactureRepository.save(manufacture);
        }
    }

    private void addScreen(String code, String name) {
        if (screenRepository.findByCode(code) == null) {
            Screen screen = Screen.builder().code(code).name(name).build();
            screenRepository.save(screen);
        }
    }

    private void addSize(String code, String name) {
        if (sizeRepository.findByCode(code) == null) {
            Size size = Size.builder().code(code).name(name).build();
            sizeRepository.save(size);
        }
    }
    private void addVoucher(String code, String name, LocalDate dateStart, LocalDate dateEnd, BigDecimal conditionsApply, BigDecimal valueVoucher, BigDecimal valueMinimum, BigDecimal valueMaximum, int typeVoucher, int quantity) {
        if (voucherRepository.findByCode(code) == null) {
            Voucher voucher = Voucher.builder()
                    .code(code)
                    .name(name)
                    .dateStart(dateStart)
                    .dateEnd(dateEnd)
                    .conditionsApply(conditionsApply)
                    .valueVoucher(valueVoucher)
                    .valueMinimum(valueMinimum)
                    .valueMaximum(valueMaximum)
                    .typeVoucher(typeVoucher)
                    .quantity(quantity)
                    .build();
            voucherRepository.save(voucher);
        }
    }

    private void addUser(String fullName, LocalDate dateOfBirth, String phoneNumber, String email, boolean gender, int points, Status status) {
        if (userRepository.findByEmail(email) == null) {
            User user = User.builder()
                    .fullName(fullName)
                    .dateOfBirth(dateOfBirth)
                    .phoneNumber(phoneNumber)
                    .email(email)
                    .gender(gender)
                    .points(points)
                    .status(status)
                    .build();
            userRepository.save(user);
        }
    }
    private void addAccount(String email, String password, Status status) {
        if (accountRepository.findByEmail(email) == null) {
            Account account = Account.builder()
                    .email(email)
                    .password(password)
                    .status(status)
                    .build();
            accountRepository.save(account);
        }
    }




    private void addProduct(String code, String name, String description, int quantity, BigDecimal price) {
        if (productRepository.findByCode(code) == null) {
            Product product = Product.builder()
                    .code(code)
                    .name(name)
                    .description(description)
                    .quantity(quantity)
                    .price(price)
                    .build();
            productRepository.save(product);
        }
    }

    private void addPayment(String code, int payments, BigDecimal moneyPayment, String note, String confirmer, TypePayment method, StatusPayment typePayment) {
        if (paymentsRepository.findByCode(code) == null) {
            Payments payment = Payments.builder()
                    .code(code)
                    .payments(payments)
                    .moneyPayment(moneyPayment)
                    .note(note)
                    .confirmer(confirmer)
                    .method(method)
                    .typePayment(typePayment)
                    .build();
            paymentsRepository.save(payment);
        }
    }
    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBContext.class);
        ctx.close();
    }
}
