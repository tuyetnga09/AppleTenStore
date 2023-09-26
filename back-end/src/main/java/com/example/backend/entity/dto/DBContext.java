package com.example.backend.entity.dto;

import com.example.backend.entity.Ram;
import com.example.backend.repository.ColorRepository;
import com.example.backend.entity.Color;
import com.example.backend.repository.RamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(
        basePackages = "com.example.backend.repository")
public class DBContext implements CommandLineRunner {
    @Autowired
    private ColorRepository colorRepository;
    @Autowired
    private RamRepository ramRepository;
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


    }
    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(DBContext.class);
        ctx.close();
    }
}
