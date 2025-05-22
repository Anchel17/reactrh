package com.reactrh.entity;

import java.time.LocalDate;

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
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="FUNCIONARIO")
public class Funcionario {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name="ID", nullable=false)
    private Long id;
    
    @Column(name="NOME", nullable=false)
    private String nome;
    
    @Column(name="CARGO", nullable=false)
    private String cargo;
    
    @Column(name="SALARIO", nullable=false,  scale=2)
    private Double salario;
    
    @Column(name="DATA_ADMISSAO", nullable=false)
    private LocalDate dataAdmissao;
}
