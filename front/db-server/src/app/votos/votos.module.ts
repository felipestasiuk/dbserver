import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { VotoService } from './shared';
import { ListarComponent } from './listar';
import { InserirComponent } from './inserir';
import { ResultadoComponent } from './resultado';

@NgModule({
  declarations: [ListarComponent, InserirComponent, ResultadoComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  providers: [
  	VotoService
  ]
})
export class VotosModule { }
