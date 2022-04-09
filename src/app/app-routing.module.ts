import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteCreateComponent } from './views/components/cliente/cliente-create/cliente-create.component';
import { ClienteDeleteComponent } from './views/components/cliente/cliente-delete/cliente-delete.component';
import { ClienteReadComponent } from './views/components/cliente/cliente-read/cliente-read.component';
import { ClienteUpdateComponent } from './views/components/cliente/cliente-update/cliente-update.component';
import { HomeComponent } from './views/components/home/home.component';
import { OrdemServicoClosedComponent } from './views/components/ordem-servico/ordem-servico-closed/ordem-servico-closed.component';
import { OrdemServicoCreateComponent } from './views/components/ordem-servico/ordem-servico-create/ordem-servico-create.component';
import { OrdemServicoReadComponent } from './views/components/ordem-servico/ordem-servico-read/ordem-servico-read.component';
import { OrdemServicoUpdateComponent } from './views/components/ordem-servico/ordem-servico-update/ordem-servico-update.component';
import { OrdemServicoViewComponent } from './views/components/ordem-servico/ordem-servico-view/ordem-servico-view.component';
import { TecnicoCreateComponent } from './views/components/tecnico/tecnico-create/tecnico-create.component';
import { TecnicoDeleteComponent } from './views/components/tecnico/tecnico-delete/tecnico-delete.component';
import { TecnicoReadComponent } from './views/components/tecnico/tecnico-read/tecnico-read.component';
import { TecnicoUpdateComponent } from './views/components/tecnico/tecnico-update/tecnico-update.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'tecnicos',
    component: TecnicoReadComponent
  },
  {
    path: 'tecnicos/create',
    component: TecnicoCreateComponent
  },
  {
    path: 'tecnicos/update/:id',
    component: TecnicoUpdateComponent
  },
  {
    path: 'tecnicos/delete/:id',
    component: TecnicoDeleteComponent
  },
  {
    path:'clientes',
    component: ClienteReadComponent
  },
  {
    path:'clientes/create',
    component: ClienteCreateComponent
  },
  {
    path:'clientes/update/:id',
    component: ClienteUpdateComponent
  },
  {
    path:'clientes/delete/:id',
    component: ClienteDeleteComponent
  },
  {
    path:'ordemservico',
    component: OrdemServicoReadComponent
  },
  {
    path:'ordemservico/closed',
    component: OrdemServicoClosedComponent
  },
  {
    path:'ordemservico/create',
    component: OrdemServicoCreateComponent
  },
  {
    path:'ordemservico/update/:id',
    component: OrdemServicoUpdateComponent
  },
  {
    path:'ordemservico/view/:id',
    component: OrdemServicoViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
