package com.example.backend.security;

import com.example.backend.controller.order_management.service.AccountService;
import com.example.backend.controller.order_management.service.UserService;
import com.example.backend.entity.Account;
import com.example.backend.untils.Roles;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@EnableWebMvc
public class Config implements WebMvcConfigurer {

    @Autowired
    private AccountService accountService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        return http.csrf().disable()
//                .authorizeHttpRequests()
//                .requestMatchers("/public/**").permitAll() // Đường dẫn public không yêu cầu đăng nhập
//                .requestMatchers("/customer/**").hasRole(String.valueOf(Roles.CUSTOMER)) // Cần quyền USER cho các đường dẫn user
//                .requestMatchers("/employee/**").hasRole(String.valueOf(Roles.NHAN_VIEN)) // Cần quyền USER cho các đường dẫn user
//                .requestMatchers("/admin/**").hasRole(String.valueOf(Roles.ADMIN))// Cần quyền ADMIN cho các đường dẫn admin
//                .anyRequest().authenticated()
////                .requestMatchers("/**").permitAll()
////                .requestMatchers("/admin/**").authenticated()
////                .anyRequest().authenticated()
//                .and()
//                .formLogin()
////                .loginPage("http://localhost:3000/login")
////                .loginProcessingUrl("/auth/login")
////                .defaultSuccessUrl("security/index", false)
////                .failureUrl("/auth/login/error")
//                .and()
//                .logout()
////                .logoutUrl("/auth/logoff")
////                .logoutSuccessUrl("/auth/logoff/succes")
//                .addLogoutHandler(new SecurityContextLogoutHandler())
//                .and()
//                .exceptionHandling().accessDeniedPage("/auth/access/denied")
//                .and().build();
        return http
                .cors()
                .and()
                .authorizeRequests()
                .requestMatchers("/**").permitAll()
//                .requestMatchers("/public/**").permitAll()
                .requestMatchers("/customer/**").hasAnyRole(String.valueOf(Roles.CUSTOMER), String.valueOf(Roles.NHAN_VIEN), String.valueOf(Roles.ADMIN))
                .requestMatchers("/employee/**").hasAnyRole(String.valueOf(Roles.NHAN_VIEN), String.valueOf(Roles.ADMIN))
                .requestMatchers("/admin/**").hasRole(String.valueOf(Roles.ADMIN))
                .anyRequest().authenticated()
                .and()
                .formLogin()
//                .loginPage("http://localhost:3000/login")
                .defaultSuccessUrl("/public/product/display")// Đường dẫn sau khi đăng nhập thành công
                .permitAll()
                .and()
                .logout()
                .addLogoutHandler(new SecurityContextLogoutHandler())
                .and()
                .exceptionHandling().accessDeniedPage("/auth/access/denied")
                .and()
                .csrf().disable().build();
    }

    /*Quản lý người dữ liệu người sử dụng*/
    public List<UserDetails> test(PasswordEncoder encoder) {
        List<UserDetails> userDetails = new ArrayList<>();
        for (Account account : accountService.findAll()) {
            UserDetails details = User.withUsername(account.getEmail())
                    .password(encoder.encode(account.getPassword()))
                    .roles(String.valueOf(account.getRoles()))
                    .build();
            userDetails.add(details);
        }
        return userDetails;
    }

    @Bean
    // authentication
    public UserDetailsService userDetailsService(PasswordEncoder encoder) {
        return new InMemoryUserDetailsManager(test(encoder));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowCredentials(true);
//        configuration.addAllowedOrigin("http://localhost:3000"); // Thay thế bằng nguồn gốc của ứng dụng React
//        configuration.addAllowedHeader("*");
//        configuration.addAllowedMethod("*");
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//
//        return source;
//    }
//
//    @Bean
//    public CorsFilter corsFilter() {
//        return new CorsFilter(corsConfigurationSource());
//    }

//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOriginPatterns("http://localhost:3000/")
//                        .allowedMethods("GET", "POST", "PUT", "DELETE")
//                        .allowedHeaders("*")
//                        .allowCredentials(true);
//            }
//        };
//    }
}