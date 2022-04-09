import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {
  
  idCliente = ''

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(
    private router: Router,
    private service: ClienteService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idCliente = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  deleteButton():void {
    this.service.delete(this.idCliente).subscribe((resposta) => {
      this.router.navigate(['/clientes'])
      this.service.messageDisplayed('Técnico deletado com sucesso!')
    }, errorShown => {
      if(errorShown.error.error.match('possui Ordens de')) {
        this.service.messageDisplayed('Erro! Técnico possui Ordens de Serviço!')
      }      
    })
  }

  findById(): void{
    this.service.findById(this.idCliente).subscribe(resposta => {
      this.cliente = resposta;
    })
  }

  cancelButton() {
    this.router.navigate(['/clientes'])
  }

}
