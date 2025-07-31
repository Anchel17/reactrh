package com.reactrh.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.reactrh.entity.Funcionario;
import com.reactrh.record.FuncionarioDTO;
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
    
    public FuncionarioDTO cadastrarFuncionario(FuncionarioDTO funcionarioRecord) {
        var funcionario = new Funcionario();
        funcionario.setNome(funcionarioRecord.getNome());
        funcionario.setCargo(funcionarioRecord.getCargo());
        funcionario.setSalario(funcionarioRecord.getSalario());
        funcionario.setDataAdmissao(funcionarioRecord.getDataAdmissao());
        
        funcionarioRepository.save(funcionario);
        
        return funcionarioRecord;
    }
    
    public FuncionarioDTO atualizarFuncionario(Long idFuncionario, FuncionarioDTO funcionarioDTO) {
        var funcionario = buscarFuncionario(idFuncionario);
        
        funcionario.setNome(funcionarioDTO.getNome());
        funcionario.setCargo(funcionarioDTO.getCargo());
        funcionario.setSalario(funcionarioDTO.getSalario());
        funcionario.setDataAdmissao(funcionarioDTO.getDataAdmissao());
        
        funcionarioRepository.save(funcionario);
        
        return transformarFuncionarioEntityEmDTO(funcionario);
    }
    
    public void deletarFuncionario(Long idFuncionario) {
        if(funcionarioRepository.findById(idFuncionario).isEmpty()) {
            throw new IllegalStateException("Funcionario com id "+ idFuncionario   + " não encontrado na base de dados.");
        }

        funcionarioRepository.deleteById(idFuncionario);
    }
    
    private FuncionarioDTO transformarFuncionarioEntityEmDTO(Funcionario funcionario) {
        var funcionarioDTO = new FuncionarioDTO();
        
        funcionarioDTO.setNome(funcionario.getNome());
        funcionarioDTO.setCargo(funcionario.getCargo());
        funcionarioDTO.setSalario(funcionario.getSalario());
        funcionarioDTO.setDataAdmissao(funcionario.getDataAdmissao());
        
        return funcionarioDTO;
    }
}
