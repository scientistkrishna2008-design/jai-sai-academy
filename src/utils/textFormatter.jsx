import React from 'react';

export const formatBrandText = (text) => {
  if (typeof text !== 'string') return text;
  
  // Split on variations of the brand name
  const regex = /(Jai Sai Academy|JSA Academy|JSA)/gi;
  const parts = text.split(regex);
  
  if (parts.length === 1) return text;

  return parts.map((part, i) => {
    const p = part.toLowerCase();
    if (p === 'jai sai academy' || p === 'jsa academy' || p === 'jsa') {
      return (
        <span key={i} className="brand-highlight">
          {part}
        </span>
      );
    }
    return part;
  });
};
