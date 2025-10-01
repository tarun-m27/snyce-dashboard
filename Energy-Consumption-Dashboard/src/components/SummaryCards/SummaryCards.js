import React from 'react';
import './SummaryCards.css';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function SummaryCards({ data }) {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight size={18} color="#22c55e" />; 
      case 'down':
        return <ArrowDownRight size={18} color="#ef4444" />; 
      case 'trending-up':
        return <TrendingUp size={18} color="#facc15" />;
      case 'trending-down':
        return <TrendingDown size={18} color="#f97316" />; 
      default:
        return null;
    }
  };

  const getNoteIcon = (trend) => {
    switch (trend) {
      case 'up':
        return <TrendingUp size={16} color="#22c55e" />;
      case 'down':
        return <TrendingDown size={16} color="#ef4444" />;
      case 'trending-up':
        return <TrendingUp size={16} color="#facc15" />;
      case 'trending-down':
        return <TrendingDown size={16} color="#f97316" />;
      default:
        return null;
    }
  };

  return (
    <div className="summary">
      {data.map((card, idx) => (
        <div
          className={`item trend-${card.trend}-card`}
          key={idx}
        >
          <div className="card-header">
            <div className="caption">{card.caption}</div>
            <div className={`trend-icon trend-${card.trend}`}>
              {getTrendIcon(card.trend)}
            </div>
          </div>
          <div className="value">{card.value}</div>
          <div className={`note trend-${card.trend}`}>
            <span className="trend-indicator">{getNoteIcon(card.trend)}</span>
            {card.note}
          </div>
        </div>
      ))}
    </div>
  );
}
