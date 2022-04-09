import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  nome = new FormControl('',[Validators.minLength(5)])
  cpf = new FormControl('', [Validators.minLength(11)])
  telefone = new FormControl('', [Validators.minLength(11)])

  constructor(
    private router: Router,
    private service: ClienteService
  ) { }

  ngOnInit(): void {
  }

  cancelButton() {
    this.router.navigate(['/clientes'])
  }

  create(): void {
    this.service.create(this.cliente).subscribe((resposta) => {
      this.router.navigate(['/clientes'])
      this.service.messageDisplayed('Técnico criado com sucesso!')
    }, errorShown => {
      if (errorShown.error.error.match('já cadastrado')) {
        this.service.messageDisplayed(errorShown.error.error)
      } else  if (errorShown.error.errors[0].message.match('contribuinte individual')) {
        this.service.messageDisplayed('CPF Inválido')
      }
      
    })
  }

  errorValidNome() {
    if(this.nome.invalid) {
      return 'O nome deve conter entre 5 a 100 caracteres'
    } return false
  }

  errorValidCPF() {
    if(this.cpf.invalid) {
      return 'CPF deve conter 11 dígitos'
    } return false
  }

  errorValidTelefone() {
    if(this.telefone.invalid) {
      return 'O telefone deve conter 11 dígitos, incluindo o DDD'
    } return false
  }

}
