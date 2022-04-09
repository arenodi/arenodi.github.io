import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  idTecnico = ''

  tecnico: Tecnico = {
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
    private service: TecnicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idTecnico = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  updateButton():void {
    this.service.update(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['/tecnicos'])
      this.service.messageDisplayed('Informações atualizadas com sucesso!')
    }, errorShown => {
      if (errorShown.error.error.match('já cadastrado')) {
        this.service.messageDisplayed(errorShown.error.error)
      } else  if (errorShown.error.errors[0].message.match('contribuinte individual')) {
        this.service.messageDisplayed('CPF Inválido')
      }
    })
  }

  findById(): void{
    this.service.findById(this.idTecnico).subscribe(resposta => {
      this.tecnico = resposta;
    })
  }

  cancelButton() {
    this.router.navigate(['/tecnicos'])
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
