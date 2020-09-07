import { Component, OnInit } from '@angular/core';
import { VotoService, Voto } from '../shared';

@Component({
	selector: 'app-listar',
	templateUrl: './listar.component.html',
	styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

	votos: Voto[];

	constructor(private votoService: VotoService) { }

	ngOnInit(): void {
		this.listarTodos();
	}

	listarTodos() {
		return this.votoService.listar().subscribe(votoAux => {
				this.votos = votoAux.votos;
			});
	}

	remover($event: any, voto: Voto): void {
		$event.preventDefault();
		if (confirm('Deseja remover o voto no restaurante "' + voto.restaurante + '"?')) {
			this.votoService.remover(voto.id);
			this.listarTodos();
		}
	}

}
