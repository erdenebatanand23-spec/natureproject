import React from 'react';

interface PlantCircuitLogoProps {
  className?: string;
  animateCircuits?: boolean;
}

export const PlantCircuitLogo: React.FC<PlantCircuitLogoProps> = ({
  className = 'w-10 h-10',
  animateCircuits = false,
}) => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer octagonal eco-tech frame */}
      <path
        d="M22 6H42L58 22V42L42 58H22L6 42V22L22 6Z"
        stroke="#215b63"
        strokeWidth="2.2"
        strokeLinejoin="round"
        fill="#FFFFFF"
      />

      {/* Circuit traces extending from stem */}
      <path
        d="M32 52V36M32 44H20L15 39M32 40H44L49 35"
        stroke="#67c090"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animateCircuits ? 'animate-circuit-dash' : undefined}
      />

      {/* Circuit nodes */}
      <circle cx="15" cy="39" r="2.2" fill="#67c090" />
      <circle cx="49" cy="35" r="2.2" fill="#67c090" />
      <circle cx="32" cy="52" r="2.4" fill="#215b63" />

      {/* Central botanical leaves */}
      <path
        d="M32 36C32 23 41 14 50 14C50 24 43 33 32 36Z"
        fill="#67c090"
        fillOpacity="0.28"
        stroke="#215b63"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M32 36C32 25 24 18 15 18C15 27 22 34 32 36Z"
        fill="#215b63"
        fillOpacity="0.14"
        stroke="#215b63"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Leaf central vein + node */}
      <path
        d="M32 36C36 28 41 22 46 18"
        stroke="#67c090"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="32" cy="36" r="2.5" fill="#215b63" />
    </svg>
  );
};
