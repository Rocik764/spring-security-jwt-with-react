package com.example.springsecurityjwtreact.repository;

import com.example.springsecurityjwtreact.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

    public User findByEmail(String email);
}
