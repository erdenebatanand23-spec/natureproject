import React, { useState } from 'react';
import { PowoPlant } from '../types/botany';

interface PlantSpecimenArtProps {
  plant: PowoPlant;
  className?: string;
}

const SpecimenSvg: React.FC<{
  variant: PowoPlant['illustrationVariant'];
}> = ({ variant }) => {
  switch (variant) {
    case 'conifer':
      return (
        <svg viewBox="0 0 240 180" fill="none" className="w-full h-full">
          <path d="M120 155V35" stroke="#215b63" strokeWidth="3" strokeLinecap="round" />
          <path d="M120 42L88 80H152L120 42Z" fill="#215b63" fillOpacity="0.2" stroke="#215b63" strokeWidth="1.8" />
          <path d="M120 68L74 114H166L120 68Z" fill="#67c090" fillOpacity="0.28" stroke="#215b63" strokeWidth="1.8" />
          <path d="M120 98L62 146H178L120 98Z" fill="#215b63" fillOpacity="0.14" stroke="#215b63" strokeWidth="1.8" />
          <circle cx="120" cy="34" r="4" fill="#67c090" />
        </svg>
      );
    case 'fern':
      return (
        <svg viewBox="0 0 240 180" fill="none" className="w-full h-full">
          <path d="M120 155C120 115 128 70 154 32" stroke="#215b63" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M120 155C116 112 96 76 74 44" stroke="#67c090" strokeWidth="2" strokeLinecap="round" />
          <path d="M124 126C106 122 92 114 82 104M127 104C108 98 95 88 86 76M132 82C116 74 106 64 100 54" stroke="#215b63" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M128 118C148 114 166 106 178 96M133 94C152 88 168 78 178 66M140 70C156 64 168 54 174 42" stroke="#67c090" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case 'succulent':
      return (
        <svg viewBox="0 0 240 180" fill="none" className="w-full h-full">
          <path d="M120 144C120 144 92 92 98 52C114 72 120 104 120 144Z" fill="#67c090" fillOpacity="0.35" stroke="#215b63" strokeWidth="1.8" />
          <path d="M120 144C120 144 148 92 142 52C126 72 120 104 120 144Z" fill="#67c090" fillOpacity="0.35" stroke="#215b63" strokeWidth="1.8" />
          <path d="M120 144C120 144 106 82 120 34C134 82 120 144 120 144Z" fill="#215b63" fillOpacity="0.18" stroke="#215b63" strokeWidth="2" />
        </svg>
      );
    case 'aquatic':
      return (
        <svg viewBox="0 0 240 180" fill="none" className="w-full h-full">
          <path d="M40 126C70 120 100 132 130 126C160 120 185 130 205 124" stroke="#215b63" strokeOpacity="0.35" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M120 122C94 122 76 114 76 106C76 98 96 92 120 92C144 92 164 98 164 106C164 114 146 122 120 122Z" fill="#67c090" fillOpacity="0.3" stroke="#215b63" strokeWidth="1.6" />
          <path d="M120 96C106 80 106 58 120 44C134 58 134 80 120 96Z" fill="#FFFFFF" stroke="#215b63" strokeWidth="1.8" />
        </svg>
      );
    case 'shrub':
      return (
        <svg viewBox="0 0 240 180" fill="none" className="w-full h-full">
          <path d="M120 152V98M120 126L88 94M120 116L154 88" stroke="#215b63" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="84" cy="90" r="18" fill="#67c090" fillOpacity="0.28" stroke="#215b63" strokeWidth="1.5" />
          <circle cx="156" cy="86" r="18" fill="#67c090" fillOpacity="0.28" stroke="#215b63" strokeWidth="1.5" />
          <circle cx="120" cy="70" r="22" fill="#FFFFFF" fillOpacity="0.6" stroke="#215b63" strokeWidth="1.5" />
        </svg>
      );
    case 'vine':
    case 'broadleaf':
    default:
      return (
        <svg viewBox="0 0 240 180" fill="none" className="w-full h-full">
          <path d="M120 154V48" stroke="#215b63" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M120 108C120 72 148 44 176 44C176 76 150 102 120 108Z" fill="#67c090" fillOpacity="0.3" stroke="#215b63" strokeWidth="1.8" />
          <path d="M120 118C120 84 94 58 66 58C66 88 90 112 120 118Z" fill="#215b63" fillOpacity="0.14" stroke="#215b63" strokeWidth="1.8" />
        </svg>
      );
  }
};

export const PlantSpecimenArt: React.FC<PlantSpecimenArtProps> = ({
  plant,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const primaryImage = plant.images[0];

  if (primaryImage?.url && !imgError) {
    return (
      <div className={`relative overflow-hidden bg-[#EAF1ED] ${className}`}>
        <img
          src={primaryImage.url}
          alt={`${plant.scientific_name} (${plant.common_name_mn})`}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#F2F7F4] via-[#FFFFFF] to-[#E6F2EC] flex flex-col items-center justify-center p-4 ${className}`}
    >
      <div className="w-full h-full max-w-[220px] max-h-[160px]">
        <SpecimenSvg variant={plant.illustrationVariant} />
      </div>
      <span className="absolute bottom-2.5 right-3 text-[11px] font-botanical-serif italic text-[#215b63]/65">
        {plant.scientific_name}
      </span>
    </div>
  );
};
