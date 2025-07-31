package com.reactrh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.reactrh.entity.Funcionario;
import com.reactrh.record.FuncionarioDTO;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Long>{
    List<Funcionario> findAllByOrderByIdAsc();
}
