package com.reactrh.service;

import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.reactrh.entity.Funcionario;
import com.reactrh.record.FuncionarioDTO;
import com.reactrh.repository.FuncionarioRepository;

@Service
public class FuncionarioService {
    @Autowired
    private FuncionarioRepository funcionarioRepository;
    
    @Autowired
    private MinioService minioService;
    
    public List<Funcionario> buscarTodosFuncionarios(){
        return funcionarioRepository.findAllByOrderByIdAsc();
    }
    
    public Funcionario buscarFuncionario(Long idFuncionario) {
        var funcionario = funcionarioRepository.findById(idFuncionario)
                .orElseThrow(() -> new IllegalStateException("Funcionario com id "+ idFuncionario   + " não encontrado na base de dados."));
        
        return funcionario;
    }
    
    @Modifying
    public FuncionarioDTO cadastrarFuncionario(FuncionarioDTO funcionarioDTO, MultipartFile imagemFuncionario) {
        var funcionario = new Funcionario();
        funcionario.setNome(funcionarioDTO.getNome());
        funcionario.setCargo(funcionarioDTO.getCargo());
        funcionario.setSalario(funcionarioDTO.getSalario());
        funcionario.setDataAdmissao(funcionarioDTO.getDataAdmissao());
        
        var funcionarioEntity = funcionarioRepository.save(funcionario);
        
        if(!Objects.isNull(imagemFuncionario)) {
            var caminhoBucket = criarCaminhoDoArquivoBucket(funcionarioEntity.getId(), funcionarioEntity.getNome(), "webp");
            funcionarioEntity.setCaminhoImagemPerfil(caminhoBucket);
            funcionarioRepository.save(funcionarioEntity);
            minioService.uploadFile(imagemFuncionario, caminhoBucket);
        }
        
        
        return funcionarioDTO;
    }
    
    @Modifying
    public FuncionarioDTO atualizarFuncionario(Long idFuncionario, FuncionarioDTO funcionarioDTO, MultipartFile imagemFuncionario) {
        var funcionario = buscarFuncionario(idFuncionario);
        
        funcionario.setNome(funcionarioDTO.getNome());
        funcionario.setCargo(funcionarioDTO.getCargo());
        funcionario.setSalario(funcionarioDTO.getSalario());
        funcionario.setDataAdmissao(funcionarioDTO.getDataAdmissao());
        
        if(!Objects.isNull(imagemFuncionario)) {
            var caminhoBucket = criarCaminhoDoArquivoBucket(funcionario.getId(), funcionario.getNome(), "webp");
            funcionario.setCaminhoImagemPerfil(caminhoBucket);
            minioService.uploadFile(imagemFuncionario, caminhoBucket);
        }
        
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
    
    private String criarCaminhoDoArquivoBucket(Long idFuncionario, String nomeFuncionario, String extensao) {
        return String.format("%s_%d.%s", nomeFuncionario, idFuncionario, extensao);
    }
}
