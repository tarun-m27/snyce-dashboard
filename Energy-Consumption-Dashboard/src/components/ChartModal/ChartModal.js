import React, { useEffect } from 'react';
import useEChart from '../../charts/useEChart';
import './ChartModal.css';

export default function ChartModal({ isOpen, onClose, chartConfig, title, subtitle }) {
  // Early return to avoid calling hooks when chartConfig is null
  if (!isOpen || !chartConfig) return null;
  
  return <ChartModalContent onClose={onClose} chartConfig={chartConfig} title={title} subtitle={subtitle} />;
}

function ChartModalContent({ onClose, chartConfig, title, subtitle }) {
  const ref = useEChart(chartConfig.options, chartConfig.deps);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div className="chart-modal-overlay" onClick={onClose}>
      <div className="chart-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="chart-modal-header">
          <div>
            <h2 className="chart-modal-title">{title}</h2>
            {subtitle && <p className="chart-modal-subtitle">{subtitle}</p>}
          </div>
          <button className="chart-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="chart-modal-body">
          <div ref={ref} className="chart-modal-chart" />
        </div>
      </div>
    </div>
  );
}