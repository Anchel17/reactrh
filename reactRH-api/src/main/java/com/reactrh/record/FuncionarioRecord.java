package com.reactrh.record;

import java.time.LocalDate;

public record FuncionarioRecord(Long id, String nome, String cargo, Double salario, LocalDate dataAdmissao) {}
