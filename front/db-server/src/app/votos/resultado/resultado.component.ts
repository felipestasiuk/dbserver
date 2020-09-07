import { Component, OnInit } from '@angular/core';
import { VotoService, Resultado } from '../shared';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-resultado',
	templateUrl: './resultado.component.html',
	styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

	resultados: Observable<Resultado[]>;

	constructor(private votoService: VotoService) { }

	ngOnInit(): void {
		this.resultados = this.listarResultados();
	}

	listarResultados(): Observable<Resultado[]> {
		return this.votoService.listarResultados();
	}

}
