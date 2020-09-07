import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VotoRoutes } from './votos';

export const routes: Routes = [
	{
		path: '',
		redirectTo: '/votos/listar',
		pathMatch: 'full'
	},
	...VotoRoutes
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}