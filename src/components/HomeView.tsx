import React, { useMemo, useState } from 'react';
import { ArrowRight, Globe, MapPin, Search, ShoppingBag, Sparkles } from 'lucide-react';
import { ActiveSection, PowoPlant, ProductItem } from '../types/botany';
import { formatMntPrice } from '../utils/cart';
import { PlantSpecimenArt } from './PlantSpecimenArt';

interface HomeViewProps {
  plants: PowoPlant[];
  products: ProductItem[];
  onNavigate: (section: ActiveSection) => void;
  onQuickSearchPlant: (query: string) => void;
  onSelectPlant: (plant: PowoPlant) => void;
  onSelectProduct: (product: ProductItem) => void;
  onAddToCart: (productId: string) => void;
  introRevealed: boolean;
}

export const HomeView: React.FC<HomeViewProps> = ({
  plants,
  products,
  onNavigate,
  onQuickSearchPlant,
  onSelectPlant,
  onSelectProduct,
  onAddToCart,
  introRevealed,
}) => {
  const [heroQuery, setHeroQuery] = useState('');

  const featuredPlants = useMemo(
    () => plants.filter((p) => p.featured).slice(0, 4),
    [plants]
  );

  const featuredProducts = useMemo(
    () => products.filter((p) => p.featured).slice(0, 3),
    [products]
  );

  const liveSuggestions = useMemo(() => {
    const q = heroQuery.trim().toLowerCase();
    if (!q) return [];
    return plants
      .filter(
        (p) =>
          p.common_name_mn.toLowerCase().includes(q) ||
          p.scientific_name.toLowerCase().includes(q) ||
          p.family.toLowerCase().includes(q)
      )
      .slice(0, 4);
  }, [heroQuery, plants]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onQuickSearchPlant(heroQuery.trim());
  };

  return (
    <div className="space-y-16 sm:space-y-20 pb-20">
      {/* 16:9 Widescreen Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-white border border-[#215b63]/12 shadow-sm">
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1200 675"
            fill="none"
            className="w-full h-full object-cover opacity-55"
          >
            <path
              d="M0 160H190L240 210H430M1200 520H980L920 460H740"
              stroke="#215b63"
              strokeOpacity="0.14"
              strokeWidth="1.2"
            />
            <path
              d="M80 560H260L315 505M1100 120H880L830 170"
              stroke="#67c090"
              strokeOpacity="0.28"
              strokeWidth="1.4"
              className="animate-circuit-dash"
            />
            <circle cx="240" cy="210" r="3.5" fill="#67c090" fillOpacity="0.6" />
            <circle cx="920" cy="460" r="3.5" fill="#215b63" fillOpacity="0.3" />
          </svg>

          <svg
            viewBox="0 0 80 80"
            fill="none"
            className="absolute top-10 left-[44%] w-12 h-12 animate-float-organic"
          >
            <path
              d="M14 64C14 34 36 14 66 14C66 44 46 64 14 64Z"
              fill="#67c090"
              fillOpacity="0.24"
            />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-stretch min-h-[520px] xl:min-h-[590px]">
          <div
            className={`lg:col-span-6 p-7 sm:p-11 lg:p-14 flex flex-col justify-between gap-8 ${
              introRevealed ? 'animate-hero-enter' : 'opacity-0'
            }`}
          >
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#215b63]/75">
                <span>POWO Ботаникийн сан</span>
                <span aria-hidden="true">·</span>
                <span>Эко-технологи</span>
                <span aria-hidden="true">·</span>
                <span>Тогтвортой арчилгаа</span>
              </div>

              <h1
                className="text-3xl sm:text-4xl xl:text-[2.85rem] font-bold tracking-tight text-[#215b63] leading-[1.12]"
                style={{ textWrap: 'balance' }}
              >
                Байгалийн амьд ухааныг технологитой холбоно
              </h1>

              <p className="text-base sm:text-[17px] text-[#142B2E]/75 leading-relaxed max-w-xl">
                Plants of the World Online (Kew) бодит ботаникийн мэдээллийн
                сан, шинжлэх ухааны ангилал болон хөрс-бичил уур амьсгал хянах
                ухаалаг эко-бүтээгдэхүүний нэгдсэн платформ.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate(ActiveSection.Plants)}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#215b63] text-white text-sm font-semibold whitespace-nowrap hover:bg-[#194950] hover:shadow-[0_0_24px_rgba(103,192,144,0.55)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67c090]"
                >
                  <span>Мэдээлэл харах</span>
                  <ArrowRight className="w-4 h-4 text-[#67c090]" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate(ActiveSection.Products)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#215b63]/20 bg-[#F8FAF9] text-[#215b63] text-sm font-semibold whitespace-nowrap hover:border-[#67c090] hover:bg-[#67c090]/10 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67c090]"
                >
                  <ShoppingBag className="w-4 h-4 text-[#215b63]" aria-hidden="true" />
                  <span>Бүтээгдэхүүн үзэх</span>
                </button>
              </div>
            </div>

            {/* Quick Search Bar */}
            <div className="relative max-w-xl">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-[#F8FAF9] border border-[#215b63]/15 focus-within:border-[#67c090] focus-within:ring-2 focus-within:ring-[#67c090]/25 transition-all"
              >
                <label htmlFor="home-plant-search" className="sr-only">
                  Ургамал эсвэл овог хайх
                </label>
                <Search
                  className="w-4 h-4 text-[#215b63]/55 ml-3 shrink-0"
                  aria-hidden="true"
                />
                <input
                  id="home-plant-search"
                  type="text"
                  value={heroQuery}
                  onChange={(e) => setHeroQuery(e.target.value)}
                  placeholder="Ургамал, овог хайх (ж.нь: Araceae, Pinus, Ginkgo)..."
                  className="w-full bg-transparent py-2 px-1 text-sm text-[#142B2E] placeholder:text-[#142B2E]/45 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#215b63] text-white text-xs font-semibold whitespace-nowrap shrink-0 hover:bg-[#194950] transition-colors"
                >
                  Хайх
                </button>
              </form>

              {liveSuggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1.5 rounded-xl bg-white border border-[#215b63]/15 shadow-lg py-1.5 z-20">
                  {liveSuggestions.map((plant) => (
                    <button
                      key={plant.id}
                      type="button"
                      onClick={() => onSelectPlant(plant)}
                      className="w-full px-4 py-2 text-left flex items-center justify-between hover:bg-[#F8FAF9] transition-colors"
                    >
                      <span className="text-sm font-medium text-[#215b63]">
                        {plant.common_name_mn}
                      </span>
                      <span className="text-xs font-botanical-serif italic text-[#215b63]/65">
                        {plant.scientific_name} · {plant.family}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right 16:9 Architectural Conservatory Column */}
          <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-full overflow-hidden bg-[#E5EFEA]">
            <img
              src="/src/assets/images/hero_eco_botanical_1795239287965.jpg"
              alt="EcoFlora шилэн цэцэрлэгийн байгаль ба технологийн орчин"
              referrerPolicy="no-referrer"
              className="w-full h-full lg:absolute lg:inset-0 object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#133a40]/65 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white/30 lg:via-transparent lg:to-transparent"
              aria-hidden="true"
            />
            <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-end justify-between gap-4 text-white">
              <div className="bg-[#133a40]/80 backdrop-blur-md rounded-xl px-4 py-3 border border-white/15">
                <p className="text-xs font-tech-mono text-[#67c090] inline-flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                  Plants of the World Online (POWO)
                </p>
                <p className="text-sm font-medium mt-0.5 tabular-nums">
                  {plants.length} баталгаажсан зүйл · {products.length} ухаалаг төхөөрөмж
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured POWO Plants */}
      <section aria-labelledby="featured-plants-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#215b63]/10 pb-4">
          <div>
            <p className="text-xs font-medium text-[#215b63]/65">
              POWO бодит өгөгдлийн сан
            </p>
            <h2
              id="featured-plants-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[#215b63] mt-1"
            >
              Дэлхийн ба Монголын ургамлын сан
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate(ActiveSection.Plants)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#215b63] hover:text-[#153e44] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Бүх ургамал үзэх ({plants.length})</span>
            <ArrowRight className="w-4 h-4 text-[#67c090]" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPlants.map((plant) => (
            <button
              key={plant.id}
              type="button"
              onClick={() => onSelectPlant(plant)}
              className="group text-left rounded-2xl bg-white border border-[#215b63]/10 overflow-hidden hover:border-[#67c090] hover:-translate-y-0.5 transition-all duration-200 flex flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67c090]"
            >
              <PlantSpecimenArt plant={plant} className="w-full aspect-[4/3]" />
              <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <div className="text-xs text-[#215b63]/65 truncate">
                    {plant.family_mn} · {plant.lifeform_mn}
                  </div>
                  <h3 className="text-base font-semibold text-[#142B2E] mt-1.5 group-hover:text-[#215b63] transition-colors">
                    {plant.common_name_mn}
                  </h3>
                  <p className="text-sm font-botanical-serif italic text-[#215b63]/75">
                    {plant.scientific_name}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#215b63]/8 flex items-center justify-between text-xs text-[#215b63]/80 gap-2">
                  <span className="inline-flex items-center gap-1 truncate">
                    <MapPin className="w-3.5 h-3.5 text-[#67c090] shrink-0" aria-hidden="true" />
                    <span className="truncate">{plant.distribution_mn}</span>
                  </span>
                  <span className="font-semibold text-[#215b63] whitespace-nowrap">
                    Дэлгэрэнгүй →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Eco-Tech Products Preview */}
      <section aria-labelledby="featured-products-heading" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#215b63]/10 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-[#215b63]/65">
              <Sparkles className="w-3.5 h-3.5 text-[#67c090]" aria-hidden="true" />
              <span>Байгаль + Инженерчлэл</span>
            </div>
            <h2
              id="featured-products-heading"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[#215b63] mt-1"
            >
              Ухаалаг арчилгааны бүтээгдэхүүн
            </h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate(ActiveSection.Products)}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#215b63] hover:text-[#153e44] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Бүх бүтээгдэхүүн харах</span>
            <ArrowRight className="w-4 h-4 text-[#67c090]" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group rounded-2xl bg-white border border-[#215b63]/10 overflow-hidden flex flex-col justify-between hover:border-[#67c090] transition-colors"
            >
              <button
                type="button"
                onClick={() => onSelectProduct(product)}
                className="text-left focus-visible:outline-none"
              >
                <div className="aspect-[4/3] bg-[#F1F5F3] overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.nameMn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <p className="text-xs text-[#215b63]/65">
                    {product.stockLabelMn} · {product.specs[0]?.value}
                  </p>
                  <h3 className="text-base font-semibold text-[#142B2E] group-hover:text-[#215b63] transition-colors">
                    {product.nameMn}
                  </h3>
                  <p className="text-sm text-[#142B2E]/70 line-clamp-2">
                    {product.shortDescriptionMn}
                  </p>
                </div>
              </button>

              <div className="px-5 pb-5 pt-3 border-t border-[#215b63]/8 flex items-center justify-between gap-3">
                <span className="text-base font-bold text-[#215b63] tabular-nums">
                  {formatMntPrice(product.priceMnt)}
                </span>
                <button
                  type="button"
                  onClick={() => onAddToCart(product.id)}
                  className="px-4 py-2 rounded-lg bg-[#215b63] text-white text-xs font-semibold whitespace-nowrap hover:bg-[#194950] hover:shadow-[0_0_14px_rgba(103,192,144,0.4)] transition-all"
                >
                  Сагсанд нэмэх
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
