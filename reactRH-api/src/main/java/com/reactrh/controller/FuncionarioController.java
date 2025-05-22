package com.reactrh.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.reactrh.entity.Funcionario;
import com.reactrh.record.FuncionarioRecord;
import com.reactrh.service.FuncionarioService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/funcionario")
public class FuncionarioController {
    
    @Autowired
    private FuncionarioService funcionarioService;
    
    @GetMapping(produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<Funcionario>> getFuncionarios(){
        return ResponseEntity.ok(funcionarioService.buscarTodosFuncionarios());
    }
    
    @GetMapping(value="/{idFuncionario}", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Funcionario> getFuncionario(@PathVariable Long idFuncionario){
        try {
            return ResponseEntity.ok(funcionarioService.buscarFuncionario(idFuncionario));
        }
        catch(Exception e) {
            log.error("[BUSCAR_FUNCIONARIO][ERRO] - {}", e.getMessage());
            return ResponseEntity.noContent().build();
        }
    }
    
    @PostMapping(produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<FuncionarioRecord> postFuncionario(@RequestBody FuncionarioRecord funcionarioRecord) {
        return ResponseEntity.ok(funcionarioService.cadastrarFuncionario(funcionarioRecord));
    }
    
    @PutMapping(value="/{idFuncionario}",  produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> putFuncionario(@PathVariable Long idFuncionario, @RequestBody FuncionarioRecord funcionarioRecord){
        try {
            return ResponseEntity.ok(funcionarioService.atualizarFuncionario(idFuncionario, funcionarioRecord));
        }
        catch(Exception e) {
            log.error("[CADASTRAR_FUNCIONARIO][ERRO] - {}", e.getMessage());
            return ResponseEntity.noContent().build();
        }
    }
    
    @DeleteMapping(value="/{idFuncionario}")
    public ResponseEntity<Object> deleteFuncionario(@PathVariable Long idFuncionario){
        
        try {            
            funcionarioService.deletarFuncionario(idFuncionario);
            
            return ResponseEntity.ok().build();
        }
        catch(Exception e) {
            log.error("[DELETE_FUNCIONARIO][ERRO] - {}", e.getMessage());
            return ResponseEntity.noContent().build();
        }
        
    }
}
