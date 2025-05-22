package com.reactrh.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.reactrh.entity.Funcionario;
import com.reactrh.record.FuncionarioRecord;
import com.reactrh.repository.FuncionarioRepository;
import com.reactrh.service.FuncionarioService;

@ExtendWith(MockitoExtension.class)
public class FuncionarioServiceTest {
    @InjectMocks
    private FuncionarioService funcionarioService;
    
    @Mock
    private FuncionarioRepository funcionarioRepository;
    
    @Test
    void testFindAllFuncionarios_ok() {
        when(funcionarioRepository.findAllByOrderByIdAsc()).thenReturn(getListaFuncionarios());
        
        var funcionarios = funcionarioService.buscarTodosFuncionarios();
        
        assertFalse(funcionarios.isEmpty());
        assertEquals(2, funcionarios.size());
        assertEquals("Funcionario Um", funcionarios.get(0).getNome() );
        assertEquals("Funcionario Dois", funcionarios.get(1).getNome());
    }
    
    @Test
    void testBuscarFuncionario_ok() {
        var funcionario = createFuncionario(1L, "Funcionario Um", "Analista de T.I", 2500.00,  LocalDate.of(2024, 1, 1));
        
        when(funcionarioRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(funcionario));
        
        var funcionarioRetornado = funcionarioService.buscarFuncionario(1L);
        
        assertNotNull(funcionarioRetornado);
        assertEquals(1L, funcionarioRetornado.getId());
    }
    
    @Test
    void testBuscarFuncionario_funcionarioNaoEncontrado() {
        when(funcionarioRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        
        Exception e = assertThrows(IllegalStateException.class, () -> funcionarioService.buscarFuncionario(1L));
        
        assertEquals(IllegalStateException.class, e.getClass());
        assertEquals("Funcionario com id 1 não encontrado na base de dados.", e.getMessage());
    }
    
    @Test
    void testCadastrarFuncionario_ok() {        
        var funcionarioRetornado = funcionarioService.cadastrarFuncionario(createFuncionarioRecord(null, "Funcionario Um", "Analista de T.I", 2500.00, LocalDate.of(2025, 1, 1)));
        
        assertEquals("Funcionario Um", funcionarioRetornado.nome());
    }
    
    @Test
    void testAtualizarFuncionario_ok() {
        var funcionario = createFuncionario(1L, "Funcionario Um", "Analista de T.I", 2500.00,  LocalDate.of(2024, 1, 1));
        
        when(funcionarioRepository.findById(Mockito.anyLong())).thenReturn(Optional.of(funcionario));
        
        var funcionarioAtualizado = funcionarioService.atualizarFuncionario(1L, 
                createFuncionarioRecord(1L, "Funcionario Alterado", "Analista de T.I", 2500.00, LocalDate.of(2025, 1, 1)));
        
        assertNotNull(funcionarioAtualizado);
        assertEquals(1L, funcionarioAtualizado.id());
        //atributo alterado
        assertEquals("Funcionario Alterado", funcionarioAtualizado.nome());
        assertEquals("Analista de T.I", funcionarioAtualizado.cargo());
        assertEquals(2500.00, funcionarioAtualizado.salario());
        //atributo alterado
        assertEquals(LocalDate.of(2025, 1, 1), funcionarioAtualizado.dataAdmissao());
    }
    
    @Test
    void testDeletarFuncionario_ok() {
        var optFuncionario = Optional.of(createFuncionario(1L, "Funcionario Um", "Analista de T.I", 2500.00,  LocalDate.of(2024, 1, 1)));
        when(funcionarioRepository.findById(Mockito.anyLong())).thenReturn(optFuncionario);
        
        funcionarioService.deletarFuncionario(1L);
        
        verify(funcionarioRepository, times(1)).deleteById(Mockito.anyLong());
    }
    
    @Test
    void testDeletarFuncionario_funcionarioParaDeletarNaoEncontrado() {
        when(funcionarioRepository.findById(Mockito.anyLong())).thenReturn(Optional.empty());
        
        Exception e = assertThrows(IllegalStateException.class, () -> funcionarioService.deletarFuncionario(1L));
        
        assertNotNull(e);
        assertEquals(IllegalStateException.class, e.getClass());
        assertEquals("Funcionario com id 1 não encontrado na base de dados.", e.getMessage());
    }
    
    private List<Funcionario> getListaFuncionarios(){
        var funcionario1 = createFuncionario(1L, "Funcionario Um", "Analista de T.I", 2500.00,  LocalDate.of(2024, 1, 1));
        var funcionario2 = createFuncionario(2L, "Funcionario Dois", "Analista de Suporte", 3000.00, LocalDate.of(2010, 1, 1));
        
        return List.of(funcionario1, funcionario2);
    }
    
    private Funcionario createFuncionario(Long id, String nome, String cargo, Double salario,  LocalDate dataAdmissao) {
        return new Funcionario(id, nome, cargo, salario, dataAdmissao);
    }
    
    private FuncionarioRecord createFuncionarioRecord(Long id, String nome, String cargo, Double salario,  LocalDate dataAdmissao) {
        return new FuncionarioRecord(id, nome, cargo, salario, dataAdmissao);
    }
}
