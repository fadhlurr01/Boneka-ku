import React from 'react';

export default function Marquee() {
  const items = [
    'Boneka Souvenir',
    'Bantal Custom',
    'Boneka Custom',
    'Maskot & Badut',
    'Tas Souvenir',
    'Bean Bag',
    'Boneka Promosi',
    'Wedding Souvenir',
    'Graduation Series'
  ];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.concat(items).map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
    </div>
  );
}
