package com.reactrh.record;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FuncionarioDTO{
    Long id; 
    String nome;
    String cargo;
    Double salario;
    
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    LocalDate dataAdmissao;
}
