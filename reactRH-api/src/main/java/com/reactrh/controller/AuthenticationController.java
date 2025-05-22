package com.reactrh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reactrh.entity.Users;
import com.reactrh.record.AuthenticationRecord;
import com.reactrh.record.RegisterRecord;
import com.reactrh.repository.UserRepository;
import com.reactrh.security.service.TokenService;

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
    public ResponseEntity<?> login(@RequestBody  @Valid AuthenticationRecord authenticationRecord){
        try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(authenticationRecord.login(), authenticationRecord.password());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            var token = tokenService.generateToken((Users)auth.getPrincipal());
            return ResponseEntity.ok(token);
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
}
