import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdemServico } from '../models/ordem-servico';

@Injectable({
  providedIn: 'root'
})
export class OrdemServicoService {

  baseUrl: String = environment.baseUrl

  constructor(
    private http : HttpClient,
    private snack: MatSnackBar) { }

  findAll():Observable<OrdemServico[]> {
    const url = this.baseUrl + "/ordemservico";
    return this.http.get<OrdemServico[]>(url);
  }

  findById(id : any):Observable<OrdemServico>{
    const url = `${this.baseUrl}/ordemservico/${id}`
    return this.http.get<OrdemServico>(url);
  }

  create(ordemServico: OrdemServico):Observable<OrdemServico> {
    const url = this.baseUrl + "/ordemservico";
    return this.http.post<OrdemServico>(url, ordemServico);
  }

  update(ordemServico: OrdemServico):Observable<OrdemServico> {
    const url = this.baseUrl + "/ordemservico";
    return this.http.put<OrdemServico>(url, ordemServico);
  }

  delete(id: any):Observable<void> {
    const url = `${this.baseUrl}/ordemservico/${id}`;
    return this.http.delete<void>(url);
  }

  messageDisplayed(msg : String): void {
    this.snack.open(`${msg}`, 'OK', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 4000
    })
  }
}
