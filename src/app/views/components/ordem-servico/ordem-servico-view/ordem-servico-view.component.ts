import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';

@Component({
  selector: 'app-ordem-servico-view',
  templateUrl: './ordem-servico-view.component.html',
  styleUrls: ['./ordem-servico-view.component.css']
})
export class OrdemServicoViewComponent implements OnInit {

  ordemServico : OrdemServico = {
    tecnico:'',
    cliente:'',
    observacoes:'',
    prioridade:'',
    status:''
  }

  constructor(
    private route: ActivatedRoute,
    private service: OrdemServicoService,
    private clienteService: ClienteService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.ordemServico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById():void {
    this.service.findById(this.ordemServico.id).subscribe(resposta => {
      this.ordemServico = resposta;
      this.clienteService.findById(this.ordemServico.cliente).subscribe(respostaCliente => {
        this.ordemServico.cliente = respostaCliente.nome
      })
    })
  }

  voltar():void{
    this.router.navigate(['ordemservico'])
  }

}
