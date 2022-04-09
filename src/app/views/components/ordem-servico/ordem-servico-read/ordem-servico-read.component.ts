import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { ClienteService } from 'src/app/services/cliente.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { TecnicoService } from 'src/app/services/tecnico.service';

@Component({
  selector: 'app-ordemServico-read',
  templateUrl: './ordem-servico-read.component.html',
  styleUrls: ['./ordem-servico-read.component.css']
})
export class OrdemServicoReadComponent implements AfterViewInit {

  ordemServicos: OrdemServico[] = [];

  displayedColumns: string[] = ['cliente', 'prioridade', 'dataAbertura', 'status', 'tecnico', 'dataFechamento', 'action'];
  dataSource = new MatTableDataSource<OrdemServico>(this.ordemServicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : OrdemServicoService,
    private router : Router,
    private tecnicoService : TecnicoService,
    private clienteService : ClienteService
    ){}

  ngAfterViewInit() {
    this.findAll();
  }

  findAll():void {
    this.service.findAll().subscribe((resposta) => {
      resposta.forEach(os => {
        if(os.status != "ENCERRADO") {
          this.ordemServicos.push(os)
        }
      })


      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OrdemServico>(this.ordemServicos);
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate():void {
    this.router.navigate(['ordemservico/create'])
  }

  listarTecnico():void {
    this.ordemServicos.forEach(os => {
      this.tecnicoService.findById(os.tecnico).subscribe(resposta => {
        os.tecnico = resposta.nome
      })
    })
  }

  listarCliente():void {
    this.ordemServicos.forEach(os => {
      this.clienteService.findById(os.cliente).subscribe(resposta => {
        os.cliente = resposta.nome
      })
    })
  }

  corPrioridade(prioridade : any) {
    if(prioridade == 'BAIXA') {
      return 'baixa'
    } else if(prioridade == 'MEDIA') {
      return 'media'
    } else {
      return 'alta'
    }
  }
}