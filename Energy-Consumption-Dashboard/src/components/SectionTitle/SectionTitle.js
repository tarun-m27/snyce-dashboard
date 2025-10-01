// src/components/SectionTitle/SectionTitle.js
import React from 'react';
import './SectionTitle.css';

export default function SectionTitle({ text, unit }) {
  return (
    <div className="section-title">
      <div className="left">{text}</div>
      <div className="right">
        <button className="chip">{unit}</button>
        <button className="chip">MWh/SFT</button>
      </div>
    </div>
  );
}
