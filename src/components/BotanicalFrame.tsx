import React from 'react';

/**
 * Architectural botanical nature frame:
 * Renders delicate layered leaves, fern fronds, and side-margin vines around
 * the outer viewport perimeter so the interface feels surrounded by living
 * nature while remaining completely non-blocking (pointer-events-none).
 */
export const BotanicalFrame: React.FC = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Subtle conservatory glass frame border */}
      <div className="absolute inset-1.5 sm:inset-3 rounded-2xl border border-[#215b63]/14 shadow-[inset_0_0_48px_rgba(103,192,144,0.08)]" />

      {/* Top-left overhanging botanical branch & fern leaves */}
      <svg
        viewBox="0 0 360 300"
        fill="none"
        className="absolute -top-6 -left-6 w-48 sm:w-64 lg:w-76 opacity-90 animate-leaf-sway"
      >
        <path
          d="M-10 20C55 48 118 90 182 162"
          stroke="#215b63"
          strokeOpacity="0.34"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M42 44C30 78 48 108 74 118C82 88 70 58 42 44Z"
          fill="#67c090"
          fillOpacity="0.36"
          stroke="#215b63"
          strokeOpacity="0.28"
          strokeWidth="1.2"
        />
        <path
          d="M78 65C114 50 146 62 156 88C126 96 94 88 78 65Z"
          fill="#215b63"
          fillOpacity="0.2"
          stroke="#215b63"
          strokeOpacity="0.24"
          strokeWidth="1.2"
        />
        <path
          d="M112 94C94 126 106 156 128 168C142 140 136 112 112 94Z"
          fill="#67c090"
          fillOpacity="0.3"
        />
        <path
          d="M146 126C176 116 206 128 216 148C188 158 160 148 146 126Z"
          fill="#67c090"
          fillOpacity="0.26"
        />
        <path
          d="M20 82C6 112 18 148 42 162C52 132 42 100 20 82Z"
          fill="#215b63"
          fillOpacity="0.18"
        />
        {/* Delicate hanging vine tendril */}
        <path
          d="M95 76C88 142 62 192 72 246"
          stroke="#67c090"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ellipse
          cx="68"
          cy="198"
          rx="10"
          ry="5.5"
          transform="rotate(-25 68 198)"
          fill="#67c090"
          fillOpacity="0.34"
        />
        <ellipse
          cx="73"
          cy="236"
          rx="8"
          ry="4.5"
          transform="rotate(18 73 236)"
          fill="#215b63"
          fillOpacity="0.24"
        />
      </svg>

      {/* Top-right eucalyptus / olive foliage */}
      <svg
        viewBox="0 0 340 280"
        fill="none"
        className="absolute -top-4 -right-6 w-44 sm:w-64 lg:w-72 opacity-85 animate-leaf-sway-reverse"
      >
        <path
          d="M350 22C280 46 218 88 162 140"
          stroke="#215b63"
          strokeOpacity="0.32"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M292 44C306 76 290 106 264 116C258 88 268 58 292 44Z"
          fill="#67c090"
          fillOpacity="0.34"
          stroke="#215b63"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />
        <path
          d="M250 64C216 50 186 62 176 86C204 96 234 86 250 64Z"
          fill="#215b63"
          fillOpacity="0.18"
        />
        <path
          d="M210 92C226 122 214 152 190 164C180 138 188 110 210 92Z"
          fill="#67c090"
          fillOpacity="0.28"
        />
        <path
          d="M312 94C326 120 316 148 294 158C286 134 292 108 312 94Z"
          fill="#215b63"
          fillOpacity="0.16"
        />
      </svg>

      {/* Left & Right Mid-Viewport Subtle Botanical Margin Sprigs (Desktop widescreen) */}
      <svg
        viewBox="0 0 90 320"
        fill="none"
        className="hidden 2xl:block fixed left-0 top-1/2 -translate-y-1/2 w-14 opacity-75 animate-leaf-sway"
      >
        <path
          d="M-4 30C22 105 26 205 -2 295"
          stroke="#215b63"
          strokeOpacity="0.24"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M14 95C38 88 54 102 52 120C34 124 18 114 14 95Z"
          fill="#67c090"
          fillOpacity="0.32"
        />
        <path
          d="M18 168C42 158 58 172 56 190C38 194 22 184 18 168Z"
          fill="#215b63"
          fillOpacity="0.16"
        />
        <path
          d="M12 238C34 230 48 244 46 260C28 264 14 254 12 238Z"
          fill="#67c090"
          fillOpacity="0.28"
        />
      </svg>

      <svg
        viewBox="0 0 90 320"
        fill="none"
        className="hidden 2xl:block fixed right-0 top-1/2 -translate-y-1/2 w-14 opacity-75 animate-leaf-sway-reverse"
      >
        <path
          d="M94 30C68 105 64 205 92 295"
          stroke="#215b63"
          strokeOpacity="0.24"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M76 95C52 88 36 102 38 120C56 124 72 114 76 95Z"
          fill="#67c090"
          fillOpacity="0.32"
        />
        <path
          d="M72 168C48 158 32 172 34 190C52 194 68 184 72 168Z"
          fill="#215b63"
          fillOpacity="0.16"
        />
        <path
          d="M78 238C56 230 42 244 44 260C62 264 76 254 78 238Z"
          fill="#67c090"
          fillOpacity="0.28"
        />
      </svg>

      {/* Bottom-left fern cluster */}
      <svg
        viewBox="0 0 340 280"
        fill="none"
        className="hidden sm:block absolute -bottom-6 -left-6 w-52 lg:w-72 opacity-85 animate-leaf-sway-reverse"
      >
        <path
          d="M-5 268C56 226 116 178 176 124"
          stroke="#215b63"
          strokeOpacity="0.32"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M38 234C24 198 40 166 68 156C78 188 64 218 38 234Z"
          fill="#67c090"
          fillOpacity="0.34"
          stroke="#215b63"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />
        <path
          d="M76 206C114 220 144 208 156 182C126 170 94 180 76 206Z"
          fill="#215b63"
          fillOpacity="0.18"
        />
        <path
          d="M114 172C100 138 114 108 138 98C150 126 138 156 114 172Z"
          fill="#67c090"
          fillOpacity="0.28"
        />
        <path
          d="M146 144C178 156 206 146 216 124C190 114 162 122 146 144Z"
          fill="#215b63"
          fillOpacity="0.16"
        />
      </svg>

      {/* Bottom-right botanical leaf cluster */}
      <svg
        viewBox="0 0 340 280"
        fill="none"
        className="hidden sm:block absolute -bottom-6 -right-6 w-52 lg:w-72 opacity-85 animate-leaf-sway"
      >
        <path
          d="M350 264C282 222 222 174 164 120"
          stroke="#215b63"
          strokeOpacity="0.32"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <path
          d="M294 230C308 194 292 162 264 152C254 184 268 214 294 230Z"
          fill="#67c090"
          fillOpacity="0.32"
          stroke="#215b63"
          strokeOpacity="0.22"
          strokeWidth="1.2"
        />
        <path
          d="M252 202C214 216 184 204 174 178C204 166 234 176 252 202Z"
          fill="#215b63"
          fillOpacity="0.18"
        />
        <path
          d="M214 168C228 134 214 104 190 94C178 122 190 152 214 168Z"
          fill="#67c090"
          fillOpacity="0.28"
        />
      </svg>
    </div>
  );
};
