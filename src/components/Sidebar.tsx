import React from 'react';
import { Filter } from 'lucide-react';
import clsx from 'clsx';

interface SidebarProps {
  filters: {
    codigoProjeto: string[];
    atividade: string[];
    tipoAtividade: string[];
  };
  selectedFilters: any;
  onFilterChange: (filterType: string, value: string | string[]) => void;
  periodoInicio: string;
  periodoFim: string;
  onPeriodoChange: (tipo: 'inicio' | 'fim', value: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  filters,
  selectedFilters,
  onFilterChange,
  periodoInicio,
  periodoFim,
  onPeriodoChange,
}) => {
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
            className="w-full border rounded-md p-2"
            value={selectedFilters.codigoProjeto}
            onChange={(e) => onFilterChange('codigoProjeto', e.target.value)}
          >
            <option key="select-projeto" value="">Selecione um projeto</option>
            {filters.codigoProjeto.map((codigo) => (
              <option key={`projeto-${codigo}`} value={codigo}>
                {codigo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Atividade
          </label>
          <select
            className="w-full border rounded-md p-2"
            multiple
            value={selectedFilters.atividade}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (option) => option.value);
              onFilterChange('atividade', values);
            }}
          >
            <option key="atividade-todos" value="todos">Todos</option>
            {filters.atividade.map((atividade) => (
              <option key={`atividade-${atividade}`} value={atividade}>
                {atividade}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Atividade
          </label>
          <select
            className="w-full border rounded-md p-2"
            multiple
            value={selectedFilters.tipoAtividade}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (option) => option.value);
              onFilterChange('tipoAtividade', values);
            }}
          >
            <option key="tipo-todos" value="todos">Todos</option>
            {filters.tipoAtividade.map((tipo) => (
              <option key={`tipo-${tipo}`} value={tipo}>
                {tipo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Período
          </label>
          <div className="space-y-2">
            <input
              type="month"
              className="w-full border rounded-md p-2"
              value={periodoInicio}
              onChange={(e) => onPeriodoChange('inicio', e.target.value)}
            />
            <input
              type="month"
              className="w-full border rounded-md p-2"
              value={periodoFim}
              onChange={(e) => onPeriodoChange('fim', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};