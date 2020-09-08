import { Voto, Resultado } from './';

export class Retorno {
	constructor(
		public codigo?: number,
		public mensagem?: string,
		public votos?: Voto[],
		public resultados?: Resultado[]){}
}