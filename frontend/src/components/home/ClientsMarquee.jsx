import React from 'react';
import { useLang } from '../../context/LangContext';

export default function ClientsMarquee() {
  const { t } = useLang();

  const clientLogos = [
    { name: 'Telkomsel', src: 'https://bonekaku.co.id/wp-content/uploads/2019/09/Telkomsel.png' },
    { name: 'Bank Mandiri', src: 'https://bonekaku.co.id/wp-content/uploads/2019/09/Mandiri.png' },
    { name: 'Dipostar', src: 'https://bonekaku.co.id/wp-content/uploads/2019/09/Dipostar.png' },
    { name: 'Toyota', src: 'https://bonekaku.co.id/wp-content/uploads/2019/09/Toyota.png' },
    { name: 'Indofood', src: 'https://bonekaku.co.id/wp-content/uploads/2019/10/Indofood.png' },
    { name: 'Astra Daihatsu', src: 'https://bonekaku.co.id/wp-content/uploads/2019/10/Astra-Daihatsu.png' },
    { name: 'Ibis Hotel', src: 'https://bonekaku.co.id/wp-content/uploads/2019/10/Ibis-Hotel.png' },
    { name: 'Rumah Sakit Siloam', src: 'https://bonekaku.co.id/wp-content/uploads/2019/10/Rumah-Sakit-Siloam.png' },
    { name: 'Rumah Sakit Haji', src: 'https://bonekaku.co.id/wp-content/uploads/2019/10/Rumah-Sakit-Haji.png' },
    { name: 'BNI', src: 'https://bonekaku.co.id/wp-content/uploads/2019/09/BNI.png' }
  ];

  return (
    <section className="section section-alt clients" id="klien">
      <div className="container">
        <div className="section-head reveal" style={{ marginBottom: '34px' }}>
          <span className="eyebrow">{t('Dipercaya Oleh')}</span>
          <h2 className="h-display">
            Customer <em>{t('Kami')}</em>
          </h2>
        </div>
      </div>

      <div className="clients-marquee">
        <div className="client-row">
          <div className="client-track">
            <div className="client-group">
              {clientLogos.map((client, idx) => (
                <img
                  decoding="async"
                  src={client.src}
                  alt={client.name}
                  key={idx}
                  loading="lazy"
                />
              ))}
            </div>
            <div className="client-group" aria-hidden="true">
              {clientLogos.map((client, idx) => (
                <img
                  decoding="async"
                  src={client.src}
                  alt={client.name}
                  key={`clone-${idx}`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
