import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; 
import { VotoService, Voto } from '../shared';

@Component({
	selector: 'app-inserir',
	templateUrl: './inserir.component.html',
	styleUrls: ['./inserir.component.css']
})
export class InserirComponent implements OnInit {

	@ViewChild('formVoto', { static: true }) formVoto: NgForm;
	voto: Voto;

	constructor(
		private votoService: VotoService,
		private router: Router) { }

	ngOnInit(): void {
		this.voto = new Voto();
	}

	inserir(): void {
		if (this.formVoto.form.valid) {
			this.votoService.votar(this.voto).subscribe(retorno => {
				this.router.navigate(["/votos"]);
			});
		}
	}

}
