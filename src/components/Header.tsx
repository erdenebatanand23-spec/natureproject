import React, { useState } from 'react';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { ActiveSection } from '../types/botany';
import { PlantCircuitLogo } from './PlantCircuitLogo';

interface HeaderProps {
  activeSection: ActiveSection;
  onNavigate: (section: ActiveSection) => void;
  cartCount: number;
  onOpenCart: () => void;
  introRevealed: boolean;
}

const NAV_ITEMS: Array<{ id: ActiveSection; label: string }> = [
  { id: ActiveSection.Home, label: 'Нүүр хуудас' },
  { id: ActiveSection.Plants, label: 'Ургамлын мэдээлэл' },
  { id: ActiveSection.Products, label: 'Бүтээгдэхүүн' },
];

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  cartCount,
  onOpenCart,
  introRevealed,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelect = (section: ActiveSection) => {
    onNavigate(section);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F8FAF9]/90 backdrop-blur-md border-b border-[#215b63]/10">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark + Plant-Circuit Logo */}
        <button
          type="button"
          onClick={() => handleSelect(ActiveSection.Home)}
          className={`flex items-center gap-2.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67c090] rounded-lg px-1 py-1 transition-all duration-500 ${
            introRevealed
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2'
          }`}
        >
          <PlantCircuitLogo className="w-8 h-8 shrink-0" />
          <span className="text-lg font-bold tracking-tight text-[#215b63] whitespace-nowrap">
            EcoFlora
          </span>
        </button>

        {/* Zone 2: Three Main Menu Links */}
        <nav
          aria-label="Үндсэн цэс"
          className="hidden md:flex items-center gap-8"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67c090] rounded ${
                  isActive
                    ? 'text-[#215b63] font-semibold'
                    : 'text-[#215b63]/70 hover:text-[#215b63]'
                }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 right-0 bottom-0 h-0.5 rounded-full bg-[#67c090] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`Сагс нээх (${cartCount} бүтээгдэхүүн)`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#215b63] text-white text-sm font-medium whitespace-nowrap shrink-0 hover:bg-[#194950] hover:shadow-[0_0_16px_rgba(103,192,144,0.38)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67c090]"
          >
            <ShoppingBag className="w-4 h-4 text-[#67c090]" aria-hidden="true" />
            <span>Сагс</span>
            <span className="font-tech-mono text-xs tabular-nums opacity-90">
              ({cartCount})
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Цэс хаах' : 'Цэс нээх'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg border border-[#215b63]/15 text-[#215b63] hover:bg-[#67c090]/15 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Гар утасны цэс"
          className="md:hidden border-t border-[#215b63]/10 bg-[#F8FAF9] px-4 py-3 flex flex-col gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#215b63]/10 text-[#215b63] font-semibold'
                    : 'text-[#215b63]/75 hover:bg-[#67c090]/10 hover:text-[#215b63]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
};
