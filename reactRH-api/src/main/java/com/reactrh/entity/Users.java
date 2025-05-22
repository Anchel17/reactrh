package com.reactrh.entity;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.reactrh.enums.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="USERS")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Users implements UserDetails{
    
    @Id
    @GeneratedValue(strategy=GenerationType.UUID)
    private String id;
    
    @Column(name="LOGIN", nullable=false)
    private String login;
    
    @Column(name="PASSWORD", nullable=false)
    private String password;
    
    @Column(name="ROLE", nullable=false)
    private UserRole role;
    
    public Users(String login, String password, UserRole role) {
        this.login = login;
        this.password = password;
        this.role = role;
    }

    /*O SPRING SECURITY VÊ AS ROLES DO USUÁRIO ATRAVÉS DESSA FUNÇÃO */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if(this.role == UserRole.ADMIN) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        }
        
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getUsername() {
        return login;
    }
}
