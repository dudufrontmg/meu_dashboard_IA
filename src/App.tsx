import React, { useState, useEffect } from 'react';
import { read, utils } from 'xlsx';
import { Sidebar } from './components/Sidebar';
import { MetricsDisplay } from './components/MetricsDisplay';
import { Charts } from './components/Charts';
import type { FilterState, ProjectData } from './types';

function App() {
  const [projetosData, setProjetosData] = useState<ProjectData[]>([]);
  const [horasData, setHorasData] = useState<any[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    codigoProjeto: '',
    atividade: [],
    tipoAtividade: [],
    periodoInicio: '',
    periodoFim: '',
  });

  const [availableFilters, setAvailableFilters] = useState({
    codigoProjeto: [] as string[],
    atividade: [] as string[],
    tipoAtividade: [] as string[],
  });

  useEffect(() => {
    // Load Excel files
    const loadExcelFiles = async () => {
      try {
        const projetosResponse = await fetch('/bd/Extração de Dados -Projetos em Horas.xlsx');
        const horasResponse = await fetch('/bd/Extração de Dados -Horas Detalhadas.xlsx');

        const projetosArrayBuffer = await projetosResponse.arrayBuffer();
        const horasArrayBuffer = await horasResponse.arrayBuffer();

        const projetosWorkbook = read(projetosArrayBuffer);
        const horasWorkbook = read(horasArrayBuffer);

        const projetosSheet = projetosWorkbook.Sheets[projetosWorkbook.SheetNames[0]];
        const horasSheet = horasWorkbook.Sheets[horasWorkbook.SheetNames[0]];

        const projetosJson = utils.sheet_to_json(projetosSheet);
        const horasJson = utils.sheet_to_json(horasSheet);

        setProjetosData(projetosJson as ProjectData[]);
        setHorasData(horasJson);

        // Set available filters
        setAvailableFilters({
          codigoProjeto: [...new Set(projetosJson.map((item: any) => item['Código do Projeto']))],
          atividade: [...new Set(projetosJson.map((item: any) => item['Descrição da Atividade']))],
          tipoAtividade: [...new Set(projetosJson.map((item: any) => item['Descrição Tipo Atividade']))],
        });
      } catch (error) {
        console.error('Error loading Excel files:', error);
      }
    };

    loadExcelFiles();
  }, []);

  const handleFilterChange = (filterType: keyof FilterState, value: string | string[]) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handlePeriodoChange = (tipo: 'inicio' | 'fim', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [`periodo${tipo === 'inicio' ? 'Inicio' : 'Fim'}`]: value,
    }));
  };

  const filteredData = projetosData.filter((item) => {
    const matchesProjeto = !filters.codigoProjeto || item.codigoProjeto === filters.codigoProjeto;
    const matchesAtividade =
      !filters.atividade.length ||
      filters.atividade.includes('todos') ||
      filters.atividade.includes(item.descricaoAtividade);
    const matchesTipoAtividade =
      !filters.tipoAtividade.length ||
      filters.tipoAtividade.includes('todos') ||
      filters.tipoAtividade.includes(item.tipoAtividade);
    const matchesPeriodo =
      (!filters.periodoInicio || item.periodo >= filters.periodoInicio) &&
      (!filters.periodoFim || item.periodo <= filters.periodoFim);

    return matchesProjeto && matchesAtividade && matchesTipoAtividade && matchesPeriodo;
  });

  const metrics = {
    horasVendidas: filteredData.reduce((sum, item) => sum + item.horasOrcadas, 0),
    horasPlanejadas: filteredData.reduce((sum, item) => sum + item.horasProgramadas, 0),
    horasConsumidas: filteredData.reduce((sum, item) => sum + item.horasExecutadas, 0),
    horasImprodutivas: filteredData.reduce((sum, item) => sum + item.horasImprodutivas, 0),
    saldoHoras: filteredData.reduce((sum, item) => sum + item.horasSaldo, 0),
  };

  const atividadeData = filteredData.map((item) => ({
    name: item.descricaoAtividade,
    horasVendidas: item.horasOrcadas,
    horasPlanejadas: item.horasProgramadas,
    horasConsumidas: item.horasExecutadas,
    horasImprodutivas: item.horasImprodutivas,
    saldoHoras: item.horasSaldo,
    variacao: (item.horasProgramadas / item.horasExecutadas) * 100,
  }));

  const globalData = [{
    name: 'Total',
    horasVendidas: metrics.horasVendidas,
    horasPlanejadas: metrics.horasPlanejadas,
    horasConsumidas: metrics.horasConsumidas,
  }];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        filters={availableFilters}
        selectedFilters={filters}
        onFilterChange={handleFilterChange}
        periodoInicio={filters.periodoInicio}
        periodoFim={filters.periodoFim}
        onPeriodoChange={handlePeriodoChange}
      />
      <main className="flex-1 p-6">
        <MetricsDisplay metrics={metrics} />
        <Charts atividadeData={atividadeData} globalData={globalData} />
      </main>
    </div>
  );
}

export default App;