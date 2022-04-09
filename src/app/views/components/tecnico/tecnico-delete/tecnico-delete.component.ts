import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {
  
  idTecnico = ''

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  }

  constructor(
    private router: Router,
    private service: TecnicoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idTecnico = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  deleteButton():void {
    this.service.delete(this.idTecnico).subscribe((resposta) => {
      this.router.navigate(['/tecnicos'])
      this.service.messageDisplayed('Técnico deletado com sucesso!')
    }, errorShown => {
      if(errorShown.error.error.match('possui Ordens de')) {
        this.service.messageDisplayed('Erro! Técnico possui Ordens de Serviço!')
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

}
