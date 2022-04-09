import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-ordem-servico-create',
  templateUrl: './ordem-servico-create.component.html',
  styleUrls: ['./ordem-servico-create.component.css']
})
export class OrdemServicoCreateComponent implements OnInit {

  ordemServico : OrdemServico = {
    tecnico: '',
    cliente: '',
    observacoes: '',
    status:'',
    prioridade: '',
  }

  tecnicos: Tecnico[] = []
  clientes: Cliente[] = []


  constructor(
    private tecnicoService : TecnicoService,
    private clienteService : ClienteService,
    private service : OrdemServicoService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.listarTecnicos();
    this.listarClientes();
  }

  create():void {
    this.service.create(this.ordemServico).subscribe(resposta => {
      this.service.messageDisplayed("Ordem de Serviço criada com sucesso!");
      this.router.navigate(['ordemservico']);
    })
  }

  cancel():void {
    this.router.navigate(['ordemservico']);
  }

  listarTecnicos():void {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    })
  }

  listarClientes():void{
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    })
  }

}
