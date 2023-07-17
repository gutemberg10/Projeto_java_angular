package br.com.projeto.api.Repositorio;

import org.springframework.data.repository.CrudRepository;

import br.com.projeto.api.Modelo.Cliente;

public interface Repositorio extends CrudRepository<Cliente, Long>{
    
}
