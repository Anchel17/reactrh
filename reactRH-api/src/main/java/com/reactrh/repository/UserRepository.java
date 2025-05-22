package com.reactrh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.reactrh.entity.Users;

public interface UserRepository extends JpaRepository<Users, String>{
    UserDetails findByLogin(String login);
}
