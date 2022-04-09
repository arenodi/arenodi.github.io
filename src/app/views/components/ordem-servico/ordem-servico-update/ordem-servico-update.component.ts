import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-ordem-servico-update',
  templateUrl: './ordem-servico-update.component.html',
  styleUrls: ['./ordem-servico-update.component.css']
})
export class OrdemServicoUpdateComponent implements OnInit {

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
    private router : Router,
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ordemServico.id = this.route.snapshot.paramMap.get('id')
    this.findById();
    this.listarTecnicos();
    this.listarClientes();
  }

  findById() : void {
    this.service.findById(this.ordemServico.id).subscribe(resposta => {
      this.ordemServico = resposta;
      this.converterDados();
    })
  }

  update():void {
    this.service.update(this.ordemServico).subscribe(resposta => {
      this.service.messageDisplayed("Ordem de Serviço atualizada com sucesso!");
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

  converterDados():void{
    if(this.ordemServico.status == "ABERTO") {
      this.ordemServico.status = 0;
    } else if(this.ordemServico.status == "ANDAMENTO") {
      this.ordemServico.status = 1;
    } else {
      this.ordemServico.status = 2;
    }

    if(this.ordemServico.prioridade == "BAIXA") {
      this.ordemServico.prioridade = 0;
    } else if(this.ordemServico.prioridade == "MEDIA") {
      this.ordemServico.prioridade = 1;
    } else {
      this.ordemServico.prioridade = 2;
    }
  }

}
