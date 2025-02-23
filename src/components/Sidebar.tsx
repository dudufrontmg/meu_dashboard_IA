import React, { useMemo } from 'react';
import { Filter } from 'lucide-react';
import clsx from 'clsx';
import { ProjectStage } from '../types';
import { isActivityInStage } from '../utils/activityUtils';

interface SidebarProps {
  filters: {
    codigoProjeto: string[];
    atividade: string[];
    tipoAtividade: string[];
  };
  selectedFilters: {
    codigoProjeto: string;
    etapaProjeto: ProjectStage;
    atividade: string[];
    tipoAtividade: string[];
    periodoInicio: string;
    periodoFim: string;
  };
  onFilterChange: (filterType: string, value: string | string[]) => void;
  periodoInicio: string;
  periodoFim: string;
  onPeriodoChange: (tipo: 'inicio' | 'fim', value: string) => void;
}

const PROJECT_STAGES: ProjectStage[] = [
  'todas',
  'Parametrização',
  'PréTAF',
  'TAF',
  'TAC',
  'Técnico Campo'
];

export const Sidebar: React.FC<SidebarProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  periodoInicio,
  periodoFim,
  onPeriodoChange,
}) => {
  const sortedProjetos = useMemo(() => {
    return [...filters.codigoProjeto].sort((a, b) => {
      const prefixA = a.split('_')[0];
      const prefixB = b.split('_')[0];
      if (prefixA !== prefixB) {
        return prefixA.localeCompare(prefixB);
      }
      const numA = parseInt(a.split('_')[1] || '0');
      const numB = parseInt(b.split('_')[1] || '0');
      if (numA !== numB) {
        return numA - numB;
      }
      return a.localeCompare(b);
    });
  }, [filters.codigoProjeto]);

  const filteredAtividades = useMemo(() => {
    if (!selectedFilters.codigoProjeto) return [];
    if (selectedFilters.etapaProjeto === 'todas') return filters.atividade;
    
    return filters.atividade.filter(atividade => 
      isActivityInStage(atividade, selectedFilters.etapaProjeto)
    );
  }, [filters.atividade, selectedFilters.codigoProjeto, selectedFilters.etapaProjeto]);

  const handleAtividadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    
    if (selectedOptions.includes('todas')) {
      onFilterChange('atividade', ['todas']);
    } else {
      onFilterChange('atividade', selectedOptions);
    }
  };

  const handleTipoAtividadeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    onFilterChange('tipoAtividade', selectedOptions);
  };

  const isProjectSelected = selectedFilters.codigoProjeto !== '';

  return (
    <div className="w-64 bg-white shadow-lg h-screen p-4">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Filtros</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Código Projeto
          </label>
          <select
            className="w-full border rounded-md p-2 bg-white hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-colors"
            value={selectedFilters.codigoProjeto}
            onChange={(e) => onFilterChange('codigoProjeto', e.target.value)}
          >
            <option value="">Selecione um projeto</option>
            {sortedProjetos.map((codigo) => (
              <option key={`projeto-${codigo}`} value={codigo}>
                {codigo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={clsx(
            "block text-sm font-medium mb-1",
            isProjectSelected ? "text-gray-700" : "text-gray-400"
          )}>
            Etapa do Projeto
          </label>
          <select
            className={clsx(
              "w-full border rounded-md p-2 bg-white transition-colors",
              isProjectSelected
                ? "hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                : "bg-gray-50 cursor-not-allowed"
            )}
            value={selectedFilters.etapaProjeto}
            onChange={(e) => onFilterChange('etapaProjeto', e.target.value as ProjectStage)}
            disabled={!isProjectSelected}
          >
            {PROJECT_STAGES.map((stage) => (
              <option key={`stage-${stage}`} value={stage}>
                {stage === 'todas' ? 'Todas as etapas' : stage}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={clsx(
            "block text-sm font-medium mb-1",
            isProjectSelected ? "text-gray-700" : "text-gray-400"
          )}>
            Atividades C&C
          </label>
          <select
            className={clsx(
              "w-full border rounded-md p-2 bg-white transition-colors",
              isProjectSelected
                ? "hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                : "bg-gray-50 cursor-not-allowed"
            )}
            multiple
            value={selectedFilters.atividade}
            onChange={handleAtividadeChange}
            disabled={!isProjectSelected}
          >
            {!isProjectSelected ? (
              <option disabled>Selecione um projeto primeiro</option>
            ) : (
              <>
                <option value="todas">Todas as atividades</option>
                {filteredAtividades.map((atividade) => (
                  <option key={`atividade-${atividade}`} value={atividade}>
                    {atividade}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div>
          <label className={clsx(
            "block text-sm font-medium mb-1",
            isProjectSelected ? "text-gray-700" : "text-gray-400"
          )}>
            Classificação de Horas
          </label>
          <select
            className={clsx(
              "w-full border rounded-md p-2 bg-white transition-colors",
              isProjectSelected
                ? "hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                : "bg-gray-50 cursor-not-allowed"
            )}
            multiple
            value={selectedFilters.tipoAtividade}
            onChange={handleTipoAtividadeChange}
            disabled={!isProjectSelected}
          >
            {!isProjectSelected ? (
              <option disabled>Selecione um projeto primeiro</option>
            ) : (
              filters.tipoAtividade.map((tipo) => (
                <option key={`tipo-${tipo}`} value={tipo}>
                  {tipo}
                </option>
              ))
            )}
          </select>
        </div>

        <div>
          <label className={clsx(
            "block text-sm font-medium mb-1",
            isProjectSelected ? "text-gray-700" : "text-gray-400"
          )}>
            Período
          </label>
          <div className="space-y-2">
            <div>
              <label className={clsx(
                "text-xs",
                isProjectSelected ? "text-gray-500" : "text-gray-400"
              )}>
                Data Inicial
              </label>
              <input
                type="month"
                className={clsx(
                  "w-full border rounded-md p-2 bg-white transition-colors",
                  isProjectSelected
                    ? "hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    : "bg-gray-50 cursor-not-allowed"
                )}
                value={periodoInicio}
                onChange={(e) => onPeriodoChange('inicio', e.target.value)}
                disabled={!isProjectSelected}
              />
            </div>
            <div>
              <label className={clsx(
                "text-xs",
                isProjectSelected ? "text-gray-500" : "text-gray-400"
              )}>
                Data Final
              </label>
              <input
                type="month"
                className={clsx(
                  "w-full border rounded-md p-2 bg-white transition-colors",
                  isProjectSelected
                    ? "hover:border-blue-500 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    : "bg-gray-50 cursor-not-allowed"
                )}
                value={periodoFim}
                onChange={(e) => onPeriodoChange('fim', e.target.value)}
                disabled={!isProjectSelected}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};