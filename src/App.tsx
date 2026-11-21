/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import { BotanicalFrame } from './components/BotanicalFrame';
import { CartDrawer } from './components/CartDrawer';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { PlantDetailModal } from './components/PlantDetailModal';
import { PlantInfoView } from './components/PlantInfoView';
import { PreloaderIntro } from './components/PreloaderIntro';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ProductsView } from './components/ProductsView';
import { PLANTS_DATA } from './data/plants';
import { PRODUCTS_DATA } from './data/products';
import {
  ActiveSection,
  CartItem,
  PlantLanguage,
  PowoCatalogFilterState,
  PowoPlant,
  ProductItem,
} from './types/botany';
import {
  addToCart,
  getCartTotalCount,
  updateCartQuantity,
} from './utils/cart';
import {
  DEFAULT_POWO_CATALOG_FILTERS,
  readStoredPlantLanguage,
  savePlantLanguage,
} from './utils/powoCatalog';

const SAVED_STORAGE_KEY = 'ecoflora_saved_powo_plants_v2';
const CART_STORAGE_KEY = 'ecoflora_cart_v1';

function readAutostartParam(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('autostart') === '1';
}

export default function App() {
  const [skipIntro] = useState<boolean>(() => readAutostartParam());
  const [introRevealed, setIntroRevealed] = useState<boolean>(() =>
    readAutostartParam()
  );
  const [activeSection, setActiveSection] = useState<ActiveSection>(
    ActiveSection.Home
  );
  const [plantFilters, setPlantFilters] = useState<PowoCatalogFilterState>(
    DEFAULT_POWO_CATALOG_FILTERS
  );
  const [plantLanguage, setPlantLanguage] = useState<PlantLanguage>(() =>
    readStoredPlantLanguage()
  );
  const [selectedPlant, setSelectedPlant] = useState<PowoPlant | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(
    null
  );
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    savePlantLanguage(plantLanguage);
  }, [plantLanguage]);

  const [savedPlantIds, setSavedPlantIds] = useState<Set<string>>(() => {
    try {
      const raw = window.localStorage.getItem(SAVED_STORAGE_KEY);
      if (raw) {
        return new Set(JSON.parse(raw) as string[]);
      }
    } catch {
      // Ignore storage read errors
    }
    return new Set();
  });

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        return JSON.parse(raw) as CartItem[];
      }
    } catch {
      // Ignore storage read errors
    }
    return [];
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(
        SAVED_STORAGE_KEY,
        JSON.stringify(Array.from(savedPlantIds))
      );
    } catch {
      // Ignore storage write errors
    }
  }, [savedPlantIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage write errors
    }
  }, [cartItems]);

  const handleIntroComplete = useCallback(() => {
    setIntroRevealed(true);
  }, []);

  const handleNavigate = useCallback((section: ActiveSection) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleQuickSearchPlant = useCallback((query: string) => {
    setPlantFilters({
      ...DEFAULT_POWO_CATALOG_FILTERS,
      searchQuery: query,
    });
    setActiveSection(ActiveSection.Plants);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleToggleSavePlant = useCallback((plantId: string) => {
    setSavedPlantIds((prev) => {
      const next = new Set(prev);
      if (next.has(plantId)) {
        next.delete(plantId);
      } else {
        next.add(plantId);
      }
      return next;
    });
  }, []);

  const handleAddToCart = useCallback((productId: string) => {
    setCartItems((prev) => addToCart(prev, productId));
  }, []);

  const handleUpdateCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      setCartItems((prev) => updateCartQuantity(prev, productId, quantity));
    },
    []
  );

  const handleClearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartCount = getCartTotalCount(cartItems);

  return (
    <div
      data-intro-state={introRevealed ? 'ready' : 'loading'}
      className="relative min-h-screen flex flex-col bg-[#F8FAF9] text-[#142B2E]"
    >
      {/* Automatic Minimalist Eco-Tech Preloader */}
      <PreloaderIntro
        onComplete={handleIntroComplete}
        skipImmediate={skipIntro}
      />

      {/* Surrounding Nature Botanical Frame Effect */}
      <BotanicalFrame />

      {/* Top Navigation Bar */}
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        introRevealed={introRevealed}
      />

      {/* Main 16:9 Widescreen Content Stage */}
      <main className="relative z-10 flex-1 w-full max-w-[1360px] mx-auto px-4 sm:px-8 pt-6 sm:pt-10">
        {activeSection === ActiveSection.Home && (
          <HomeView
            plants={PLANTS_DATA}
            products={PRODUCTS_DATA}
            onNavigate={handleNavigate}
            onQuickSearchPlant={handleQuickSearchPlant}
            onSelectPlant={setSelectedPlant}
            onSelectProduct={setSelectedProduct}
            onAddToCart={handleAddToCart}
            introRevealed={introRevealed}
          />
        )}

        {activeSection === ActiveSection.Plants && (
          <PlantInfoView
            plants={PLANTS_DATA}
            filters={plantFilters}
            onFiltersChange={setPlantFilters}
            language={plantLanguage}
            onLanguageChange={setPlantLanguage}
            savedPlantIds={savedPlantIds}
            onToggleSave={handleToggleSavePlant}
            onSelectPlant={setSelectedPlant}
          />
        )}

        {activeSection === ActiveSection.Products && (
          <ProductsView
            products={PRODUCTS_DATA}
            onAddToCart={handleAddToCart}
            onSelectProduct={setSelectedProduct}
          />
        )}
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="relative z-10 border-t border-[#215b63]/10 bg-white/70 backdrop-blur-sm">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#215b63]/70">
          <p className="font-medium text-[#215b63]">
            EcoFlora — Plants of the World Online (POWO) ба эко-технологи
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => handleNavigate(ActiveSection.Home)}
              className="hover:text-[#215b63] transition-colors"
            >
              Нүүр хуудас
            </button>
            <button
              type="button"
              onClick={() => handleNavigate(ActiveSection.Plants)}
              className="hover:text-[#215b63] transition-colors"
            >
              Ургамлын мэдээлэл
            </button>
            <button
              type="button"
              onClick={() => handleNavigate(ActiveSection.Products)}
              className="hover:text-[#215b63] transition-colors"
            >
              Бүтээгдэхүүн
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals & Cart Drawer */}
      <PlantDetailModal
        plant={selectedPlant}
        language={plantLanguage}
        onLanguageChange={setPlantLanguage}
        isSaved={selectedPlant ? savedPlantIds.has(selectedPlant.id) : false}
        onToggleSave={handleToggleSavePlant}
        onClose={() => setSelectedPlant(null)}
      />

      <ProductDetailModal
        product={selectedProduct}
        onAddToCart={handleAddToCart}
        onClose={() => setSelectedProduct(null)}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        products={PRODUCTS_DATA}
        onUpdateQuantity={handleUpdateCartQuantity}
        onClearCart={handleClearCart}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
}
