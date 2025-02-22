export interface ProjectData {
  codigoProjeto: string;
  descricaoAtividade: string;
  tipoAtividade: string;
  periodo: string;
  horasOrcadas: number;
  horasProgramadas: number;
  horasAjustadas: number;
  horasExecutadas: number;
  horasSaldo: number;
  horasImprodutivas: number;
}

export interface FilterState {
  codigoProjeto: string;
  atividade: string[];
  tipoAtividade: string[];
  periodoInicio: string;
  periodoFim: string;
}