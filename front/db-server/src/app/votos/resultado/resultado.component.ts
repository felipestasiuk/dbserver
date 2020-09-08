import { Component, OnInit } from '@angular/core';
import { VotoService, Resultado } from '../shared';

@Component({
	selector: 'app-resultado',
	templateUrl: './resultado.component.html',
	styleUrls: ['./resultado.component.css']
})
export class ResultadoComponent implements OnInit {

	resultados: Resultado[];

	constructor(private votoService: VotoService) { }

	ngOnInit(): void {
		this.listarResultados();
	}

	listarResultados() {
		return this.votoService.listarResultados().subscribe(retorno => {
				this.resultados = retorno.resultados;
			});
	}

}
