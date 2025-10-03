import React, {useState} from 'react';
import Header from './components/Header/Header';
import SummaryCards from './components/SummaryCards/SummaryCards';
import SectionTitle from './components/SectionTitle/SectionTitle';
import DonutCard from './components/DonutCard/DonutCard';
import HorizontalBarCard from './components/HorizontalBarCard/HorizontalBarCard';
import StackedColumnCard from './components/StackedColumnCard/StackedColumnCard';
import LineCard from './components/LineCard/LineCard';
import Tabs from './components/Tabs/Tabs';
import ChartModal from './components/ChartModal/ChartModal';
import CurrentNews from './components/CurrentNews/CurrentNews';

import { ChartModalProvider, useChartModal } from './context/ChartModalContext';
import totalDonut from './data/donut-total.json';
import block1Donut from './data/donut-block1.json';
import totalDist from './data/distribution-total.json';
import block1Dist from './data/distribution-block1.json';
import stacked from './data/stacked-blocks.json';
import lineTotal from './data/line-total.json';
import lineSolar from './data/line-solar.json';
import summary from './data/summary.json';
import blocksData from './data/block.json';

import './App.css';

function AppContent() {
  const [activeBlock, setActiveBlock] = useState(0);
  const { isOpen, chartConfig, title, subtitle, closeModal } = useChartModal();
  const blockInfo = blocksData[activeBlock];

  return (
    <div className="app">
      <Header period="Consumption Summary (01/09/2025 - 30/09/2025)" />
      <SummaryCards data={summary} />
      <CurrentNews></CurrentNews>
      <div className="grid grid-3">
        <DonutCard title="Energy Consumption" subtitle="Total: 6407 MWh" data={totalDonut} />
        <HorizontalBarCard title="Energy Distribution" subtitle="Total: 71139 MWh" loss="99.10%" data={totalDist} />
        <StackedColumnCard title="Energy Consumption by Blocks" page="1 / 2" data={stacked} />
      </div>

      <SectionTitle text="Total Energy Consumption" unit="MWh" />
      <LineCard data={lineTotal} color="#7bbf5e" title="Total Energy Consumption" />

      <SectionTitle text="Solar Energy Consumption" unit="MWh" />
      <LineCard data={lineSolar} color="#8d7cf3" soft title="Solar Energy Consumption" />

      
      <Tabs 
        tabs={blocksData.map(b => b.name)} 
        active={activeBlock}
        onTabChange={setActiveBlock}
      />

      <div className="grid grid-2">
        <DonutCard
          title="Energy Consumption"
          subtitle={`Total: ${blockInfo.dist.total} MWh`}
          data={blockInfo.donut}
        />
        <HorizontalBarCard
          title="Energy Distribution"
          subtitle={`Total: ${blockInfo.dist.total} MWh`}
          loss={blockInfo.dist.loss}
          data={blockInfo.dist}
        />
      </div>

        <SectionTitle text="Total Energy Consumption" unit="MWh" />
      <LineCard data={blockInfo.lineTotal} color="#7bbf5e" title="Total Energy Consumption" />

      <SectionTitle text="Solar Energy Consumption" unit="MWh" />
      <LineCard data={blockInfo.lineSolar} color="#8d7cf3" soft title="Solar Energy Consumption" />
      <ChartModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        chartConfig={chartConfig} 
        title={title} 
        subtitle={subtitle} 
      />
    </div>
  );
}

export default function App() {
  return (
    <ChartModalProvider>
      <AppContent />
    </ChartModalProvider>
  );
}


