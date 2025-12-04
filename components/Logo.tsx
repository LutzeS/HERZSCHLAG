import React, { useState, useEffect } from 'react';

interface LogoProps {
  className?: string;
  variant?: 'navbar' | 'hero'; // Neue Prop zur Unterscheidung
}

const Logo: React.FC<LogoProps> = ({ className = "", variant = 'hero' }) => {
  // Bestimme den Dateinamen basierend auf der Variante
  // Hero (Mitte) = Herzblatt-Logo_1.png
  // Navbar (Oben Links) = Herzblatt-Logo_2.png
  const filename = variant === 'navbar' ? 'Herzblatt-Logo_2.png' : 'Herzblatt-Logo_1.png';

  // Liste der möglichen Pfade, wo das Bild liegen könnte
  const paths = [
    `/assets/${filename}`, 
    `/${filename}`,        
    `assets/${filename}`,  
    `${filename}`          
  ];

  const [pathIndex, setPathIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  // Reset state when variant changes
  useEffect(() => {
    setPathIndex(0);
    setHasError(false);
  }, [variant]);

  const handleError = () => {
    // Wenn der aktuelle Pfad nicht geht, probiere den nächsten
    if (pathIndex < paths.length - 1) {
      setPathIndex(pathIndex + 1);
    } else {
      // Wenn alle Pfade fehlschlagen
      setHasError(true);
      console.error(`Logo '${filename}' konnte nicht geladen werden.`);
    }
  };

  if (hasError) {
    // Fallback Text
    return (
      <div className={`flex items-center justify-center border-2 border-herz-gold/50 bg-herz-black/80 p-2 ${className}`} style={{ minHeight: variant === 'navbar' ? '40px' : '80px' }}>
        <span className={`font-serif font-bold text-herz-gold tracking-widest text-center ${variant === 'navbar' ? 'text-sm' : 'text-2xl'}`}>
          HERZSCHLAG<br/>
          <span className="text-[0.6em] text-gray-400 font-sans tracking-normal opacity-70">
            {filename} not found
          </span>
        </span>
      </div>
    );
  }

  return (
    <img 
      src={paths[pathIndex]} 
      alt={`HERZSCHLAG Logo ${variant}`} 
      className={`object-contain ${className}`}
      onError={handleError}
    />
  );
};

export default Logo;