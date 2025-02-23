export interface ProjectData {
  'Código do Projeto': string;
  'Descrição da Atividade': string;
  'Descrição Tipo Atividade': string;
  periodo: string;
  'Horas Orçadas': number;
  'Horas Programadas': number;
  'Horas Ajustadas': number;
  'Horas Executadas': number;
  'Saldo de Horas': number;
  'Horas Improdutivas': number;
  'Horas Decimal': number;
}

export interface FilterState {
  codigoProjeto: string;
  etapaProjeto: ProjectStage;
  atividade: string[];
  tipoAtividade: string[];
  periodoInicio: string;
  periodoFim: string;
}

export type ActivityCategory = 
  | 'Visita Técnica'
  | 'Parametrização'
  | 'PTAF'
  | 'TAF'
  | 'TAC'
  | 'Técnico Campo'
  | 'Outros';

export type ProjectStage = 
  | 'todas'
  | 'Parametrização'
  | 'PréTAF'
  | 'TAF'
  | 'TAC'
  | 'Técnico Campo';