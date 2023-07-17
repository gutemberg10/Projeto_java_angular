import { Component } from '@angular/core';
import { Cliente } from '../Modelo/Cliente';
import { ClienteService } from '../servico/cliente.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent {
     // Objeto do tipo Cliente
     cliente = new Cliente();

     //Variavel para visibilidade dos botões
     btnCadastro:boolean = true;

     tabela:Boolean = true;

     //Jason de clientes
     clientes:Cliente[] = [];

     // Construtor
     constructor(private servico:ClienteService){}

     // Método de seleção
     selecionar():void{
      this.servico.selecionar().subscribe(retorno => this.clientes = retorno);
     }

     // Método de cadastro
     cadastrar():void{
      this.servico.cadastrar(this.cliente)
      .subscribe(retorno => {

        this.clientes.push(retorno);

        this.cliente = new Cliente();

        alert("Cliente cadastrado com sucesso!");

    });
    }

    selecionarCliente(posicao:number):void{
       this.cliente = this.clientes[posicao];

       this.btnCadastro = false;

       this.tabela = false;
    }

    // Método para editar clientes
    editar():void{
       this.servico.editar(this.cliente)
       .subscribe(retorno => {
        // Obter posição do vetor onde está o cliente
        let posicao = this.clientes.findIndex(obj => {
          return obj.codigo == retorno.codigo;
        });

        // Alterar os dados do cliente no vetor
        this.clientes[posicao] = retorno;

        // Visibilidade dos botões
        this.btnCadastro = true;

        // Visibilidade da tabela
        this.tabela = true;

        this.cliente = new Cliente();

        // Mensagem
        alert("Cliente alterado com sucesso!");

       });
    }

    // Método para remover clientes
    remover():void{
      this.servico.remover(this.cliente.codigo)
      .subscribe(retorno => {
       // Obter posição do vetor onde está o cliente
       let posicao = this.clientes.findIndex(obj => {
         return obj.codigo == this.cliente.codigo;
       });

       // Remover cliente do vetor
       this.clientes.splice(posicao, 1);

       // Visibilidade dos botões
       this.btnCadastro = true;

       // Visibilidade da tabela
       this.tabela = true;

       this.cliente = new Cliente();

       // Mensagem
       alert("Cliente removido com sucesso!");

      });
   }

    cancelar():void{

      this.btnCadastro = true;

      this.tabela = true;

      this.cliente = new Cliente();
    }

     // Método de inicialização
     ngOnInit(){
      this.selecionar();
     }

}
