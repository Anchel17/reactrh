package com.reactrh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reactrh.entity.Funcionario;
import com.reactrh.record.FuncionarioRecord;
import com.reactrh.repository.FuncionarioRepository;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository funcionarioRepository;
    
    public List<Funcionario> buscarTodosFuncionarios(){
        return funcionarioRepository.findAllByOrderByIdAsc();
    }
    
    public Funcionario buscarFuncionario(Long idFuncionario) {
        var funcionario = funcionarioRepository.findById(idFuncionario)
                .orElseThrow(() -> new IllegalStateException("Funcionario com id "+ idFuncionario   + " não encontrado na base de dados."));
        
        return funcionario;
    }
    
    public FuncionarioRecord cadastrarFuncionario(FuncionarioRecord funcionarioRecord) {
        var funcionario = new Funcionario();
        funcionario.setNome(funcionarioRecord.nome());
        funcionario.setCargo(funcionarioRecord.cargo());
        funcionario.setSalario(funcionarioRecord.salario());
        funcionario.setDataAdmissao(funcionarioRecord.dataAdmissao());
        
        funcionarioRepository.save(funcionario);
        
        return funcionarioRecord;
    }
    
    public FuncionarioRecord atualizarFuncionario(Long idFuncionario, FuncionarioRecord funcionarioRecord) {
        var funcionario = buscarFuncionario(idFuncionario);
        
        funcionario.setNome(funcionarioRecord.nome());
        funcionario.setCargo(funcionarioRecord.cargo());
        funcionario.setSalario(funcionarioRecord.salario());
        funcionario.setDataAdmissao(funcionarioRecord.dataAdmissao());
        
        funcionarioRepository.save(funcionario);
        
        return transformarFuncionarioEntityEmRecord(funcionario);
    }
    
    public void deletarFuncionario(Long idFuncionario) {
        if(funcionarioRepository.findById(idFuncionario).isEmpty()) {
            throw new IllegalStateException("Funcionario com id "+ idFuncionario   + " não encontrado na base de dados.");
        }

        funcionarioRepository.deleteById(idFuncionario);
    }
    
    private FuncionarioRecord transformarFuncionarioEntityEmRecord(Funcionario funcionario) {
        return new FuncionarioRecord(funcionario.getId(), funcionario.getNome(), funcionario.getCargo(), funcionario.getSalario(), funcionario.getDataAdmissao());
    }
}
