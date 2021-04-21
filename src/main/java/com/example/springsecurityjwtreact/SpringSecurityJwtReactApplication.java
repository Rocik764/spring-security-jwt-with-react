package com.example.springsecurityjwtreact;

import com.example.springsecurityjwtreact.model.User;
import com.example.springsecurityjwtreact.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.annotation.PostConstruct;

@SpringBootApplication
public class SpringSecurityJwtReactApplication {

//    @Autowired
//    private UserRepository userRepository;
//
//    @PostConstruct
//    public void initUsers() {
//        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
//        User user = new User(1L, "test@mail.com", passwordEncoder.encode("12345678"), "USER");
//        userRepository.save(user);
//    }

    public static void main(String[] args) {
        SpringApplication.run(SpringSecurityJwtReactApplication.class, args);
    }

}
