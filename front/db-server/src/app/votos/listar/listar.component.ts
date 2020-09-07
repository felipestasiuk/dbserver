import { Component, OnInit } from '@angular/core';
import { VotoService, Voto } from '../shared';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-listar',
	templateUrl: './listar.component.html',
	styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

	votos: Observable<Voto[]>;

	constructor(private votoService: VotoService) { }

	ngOnInit(): void {
		this.votos = this.listarTodos();
	}

	listarTodos(): Observable<Voto[]> {
		return this.votoService.listar();
	}

	remover($event: any, voto: Voto): void {
		$event.preventDefault();
		if (confirm('Deseja remover o voto no restaurante "' + voto.restaurante + '"?')) {
			this.votoService.remover(voto.id);
			this.votos = this.listarTodos();
		}
	}

}
