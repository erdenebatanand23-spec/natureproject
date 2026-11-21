import React, { useEffect, useState } from 'react';
import { PlantCircuitLogo } from './PlantCircuitLogo';

interface PreloaderIntroProps {
  onComplete: () => void;
  skipImmediate?: boolean;
}

export const PreloaderIntro: React.FC<PreloaderIntroProps> = ({
  onComplete,
  skipImmediate = false,
}) => {
  const [phase, setPhase] = useState<'loading' | 'gliding' | 'done'>(
    skipImmediate ? 'done' : 'loading'
  );
  const [progress, setProgress] = useState(skipImmediate ? 100 : 12);

  useEffect(() => {
    if (skipImmediate) {
      onComplete();
      return;
    }

    let loadReady = document.readyState === 'complete';
    const onLoad = () => {
      loadReady = true;
    };
    window.addEventListener('load', onLoad, { once: true });

    const startTime = performance.now();
    const minDuration = 1550;

    const progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - startTime;
      const target = loadReady
        ? Math.min(100, Math.round((elapsed / minDuration) * 100))
        : Math.min(88, Math.round((elapsed / minDuration) * 85));
      setProgress((prev) => Math.max(prev, target));

      if (loadReady && elapsed >= minDuration) {
        window.clearInterval(progressTimer);
        setProgress(100);
        setPhase('gliding');
      }
    }, 45);

    const safetyTimeout = window.setTimeout(() => {
      window.clearInterval(progressTimer);
      setProgress(100);
      setPhase('gliding');
    }, 2200);

    return () => {
      window.removeEventListener('load', onLoad);
      window.clearInterval(progressTimer);
      window.clearTimeout(safetyTimeout);
    };
  }, [skipImmediate, onComplete]);

  useEffect(() => {
    if (phase !== 'gliding') return;
    const finishTimer = window.setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 580);
    return () => window.clearTimeout(finishTimer);
  }, [phase, onComplete]);

  if (phase === 'done') {
    return null;
  }

  const isGliding = phase === 'gliding';

  return (
    <div
      data-testid="preloader-overlay"
      role="status"
      aria-live="polite"
      aria-label="Loading eco-systems"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F8FAF9] transition-opacity duration-500 ease-out ${
        isGliding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated ambient circuit grid */}
      <svg
        viewBox="0 0 800 500"
        fill="none"
        className="absolute inset-0 w-full h-full object-cover opacity-45 pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M140 250H310L345 215M660 250H490L455 285M400 70V165M400 430V335"
          stroke="#67c090"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="animate-circuit-dash"
        />
        <path
          d="M220 140H320L355 175M580 360H480L445 325"
          stroke="#215b63"
          strokeOpacity="0.25"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="140" cy="250" r="4" fill="#67c090" />
        <circle cx="660" cy="250" r="4" fill="#67c090" />
        <circle cx="400" cy="70" r="4" fill="#215b63" fillOpacity="0.4" />
        <circle cx="400" cy="430" r="4" fill="#215b63" fillOpacity="0.4" />
      </svg>

      {/* Soft mint glow behind centered logo */}
      <div
        className={`relative flex flex-col items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isGliding
            ? '-translate-x-[36vw] -translate-y-[42vh] scale-50 opacity-0'
            : 'translate-x-0 translate-y-0 scale-100 opacity-100'
        }`}
      >
        <div className="relative flex items-center justify-center">
          <div
            className="absolute w-32 h-32 rounded-full bg-[#67c090]/20 blur-2xl animate-preloader-glow"
            aria-hidden="true"
          />
          <div className="relative p-4 rounded-2xl bg-white/80 border border-[#67c090]/35 shadow-sm">
            <PlantCircuitLogo className="w-16 h-16" animateCircuits />
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-lg font-semibold tracking-tight text-[#215b63]">
            EcoFlora
          </p>
          <p className="mt-1 text-xs font-tech-mono text-[#215b63]/75 tracking-wide">
            Loading eco-systems...
          </p>
        </div>

        {/* Sleek minimal progress indicator */}
        <div className="mt-5 w-48 h-1 rounded-full bg-[#215b63]/12 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#215b63] to-[#67c090] transition-all duration-150 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
