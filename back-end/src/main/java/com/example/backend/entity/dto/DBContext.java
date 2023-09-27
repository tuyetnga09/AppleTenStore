package com.example.backend.entity.dto;

import com.example.backend.entity.Battery;
import com.example.backend.entity.Capacity;
import com.example.backend.entity.Category;
import com.example.backend.entity.Chip;
import com.example.backend.entity.Manufacture;
import com.example.backend.entity.Ram;
import com.example.backend.entity.Screen;
import com.example.backend.entity.Size;
import com.example.backend.entity.Voucher;
import com.example.backend.repository.BatteryRepository;
import com.example.backend.repository.CapacityRepository;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ChipRepository;
import com.example.backend.repository.ColorRepository;
import com.example.backend.entity.Color;
import com.example.backend.repository.ManufactureRepository;
import com.example.backend.repository.RamRepository;
import com.example.backend.repository.ScreenRepository;
import com.example.backend.repository.SizeRepository;
import com.example.backend.repository.VoucherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

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


    }
    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBContext.class);
        ctx.close();
    }
}
