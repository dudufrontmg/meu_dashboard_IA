import { ActivityCategory, ProjectStage } from '../types';

export const categorizarTipoAtividade = (descricao: string): string => {
  if (!descricao) return '';

  const descricaoLower = descricao.toLowerCase();

  if (descricaoLower.includes('horas improdutivas') || 
      descricaoLower.includes('improdutivas')) {
    return 'Improdutivas';
  }

  if (descricaoLower.includes('fora de escopo') || 
      descricaoLower.includes('fora do escopo')) {
    return 'Fora do escopo';
  }

  if (descricaoLower.includes('traslado') || 
      descricaoLower.includes('translado')) {
    return 'Translado';
  }

  return 'Produtivas';
};

export const isHoraImprodutiva = (categoria: string): boolean => {
  return ['Improdutivas', 'Fora do escopo', 'Translado'].includes(categoria);
};

export const isActivityInStage = (activityName: string, stage: ProjectStage): boolean => {
  if (!activityName || stage === 'todas') return true;

  const activityLower = activityName.toLowerCase();

  switch (stage) {
    case 'Parametrização':
      return activityName.startsWith('Configuração_') || activityName === 'Parametrização';
    case 'PréTAF':
      return activityName.startsWith('PréTestes_') || activityName === 'PréTAF';
    case 'TAF':
      return activityName.startsWith('TAF_') || activityName === 'TAF';
    case 'TAC':
      return activityName.startsWith('TAC_') || activityName === 'TAC';
    case 'Técnico Campo':
      return activityLower.includes('campo') || 
             activityLower.includes('montagem_campo') || 
             activityLower.includes('eletricista') || 
             activityLower.includes('técnico');
    default:
      return false;
  }
};

export const mapActivityToCategory = (activityName: string): ActivityCategory => {
  if (!activityName) return 'Outros';

  if (activityName === 'Visita Técnica') {
    return 'Visita Técnica';
  }

  if (activityName.startsWith('Configuração_')) {
    return 'Parametrização';
  }

  if (activityName.startsWith('PréTestes_')) {
    return 'PTAF';
  }

  if (activityName.startsWith('TAF_')) {
    return 'TAF';
  }

  if (activityName.startsWith('TAC_')) {
    return 'TAC';
  }

  if (activityName.includes('Campo')) {
    return 'Técnico Campo';
  }

  return 'Outros';
};