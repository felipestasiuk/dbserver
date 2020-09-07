import { Routes } from '@angular/router';
import { ListarComponent } from './listar';
import { InserirComponent } from './inserir';
import { ResultadoComponent } from './resultado';

export const VotoRoutes: Routes = [
	{
		path: 'votos',
		redirectTo: 'votos/listar'
	},
	{
		path: 'votos/listar',
		component: ListarComponent
	},
	{
		path: 'votos/inserir',
		component: InserirComponent
	},
	{
		path: 'votos/resultado',
		component: ResultadoComponent
	}
];