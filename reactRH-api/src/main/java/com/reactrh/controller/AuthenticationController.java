package com.reactrh.controller;

import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reactrh.entity.Users;
import com.reactrh.record.AuthenticationRecord;
import com.reactrh.record.RegisterRecord;
import com.reactrh.record.TokenResponse;
import com.reactrh.repository.UserRepository;
import com.reactrh.security.service.TokenService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TokenService tokenService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody  @Valid AuthenticationRecord authenticationRecord, HttpServletResponse response){
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(authenticationRecord.login(), authenticationRecord.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((Users)auth.getPrincipal());
            
            var cookie = new Cookie("session", token);
            cookie.setHttpOnly(true);
            //Em um ambiente real, teria uma variável de ambiente setando isso para TRUE em produção
            //Mas em dev, podemos colocar como false para permitir o envio de tokens com http.
            cookie.setSecure(false);
            cookie.setPath("/");
            cookie.setMaxAge(60 * 60);

            response.addCookie(cookie);
            
            return ResponseEntity.ok("Login bem-sucedido");
        }
        catch(Exception e) {
            return ResponseEntity.noContent().build();
        }
    }
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterRecord registerRecord){
        if(this.userRepository.findByLogin(registerRecord.login()) != null ) {
            return ResponseEntity.badRequest().body(false);
        }
        
        String encryptedPassword = new BCryptPasswordEncoder().encode(registerRecord.password());
        var user = new Users(registerRecord.login(), encryptedPassword, registerRecord.role());
        
        this.userRepository.save(user);
        
        return ResponseEntity.ok(true);
    }
    
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response){
        var cookie = new Cookie("session", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(false); 
        cookie.setPath("/");
        cookie.setMaxAge(0);

        response.addCookie(cookie);
        return ResponseEntity.ok("Logout realizado com sucesso");
    }
    
    @GetMapping("/me")
    public ResponseEntity<?> getUserInfo(HttpServletRequest request){
        var auth = SecurityContextHolder.getContext().getAuthentication();
        
        if(Objects.isNull(auth) || !auth.isAuthenticated()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        
        var user = (Users) auth.getPrincipal();
        
        var response = Map.of(
                "login", user.getUsername(),
                "roles", user.getAuthorities().stream()
                                .map(GrantedAuthority::getAuthority)
                                .toList()
                );
        
        return ResponseEntity.ok(response);
    }
}
