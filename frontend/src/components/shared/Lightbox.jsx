import React, { useEffect } from 'react';

export default function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!src) return null;

  return (
    <div className="lightbox active" id="lightbox" onClick={onClose}>
      <button
        className="lightbox-close"
        id="lightboxClose"
        aria-label="Tutup"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ×
      </button>
      <img
        decoding="async"
        src={src}
        alt={alt || 'Pratinjau produk'}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}
