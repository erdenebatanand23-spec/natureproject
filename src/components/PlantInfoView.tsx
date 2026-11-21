import React, { useEffect, useMemo, useState } from 'react';
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FilterX,
  MapPin,
  Search,
  Sprout,
  X,
  ZoomIn,
} from 'lucide-react';
import {
  PlantLanguage,
  PowoCatalogFilterState,
  PowoPlant,
} from '../types/botany';
import {
  DEFAULT_POWO_CATALOG_FILTERS,
  filterPowoPlants,
  getLocalizedPlantFields,
  getPaginationRange,
  getUniqueFamilies,
  getUniqueLifeforms,
  paginatePlants,
  PLANT_UI_COPY,
  translateFamilyToMn,
  translateLifeformToMn,
} from '../utils/powoCatalog';
import { PlantSpecimenArt } from './PlantSpecimenArt';

interface PlantInfoViewProps {
  plants: PowoPlant[];
  filters: PowoCatalogFilterState;
  onFiltersChange: (next: PowoCatalogFilterState) => void;
  language: PlantLanguage;
  onLanguageChange: (lang: PlantLanguage) => void;
  savedPlantIds: Set<string>;
  onToggleSave: (plantId: string) => void;
  onSelectPlant: (plant: PowoPlant) => void;
}

const PAGE_SIZE = 9;

export const PlantInfoView: React.FC<PlantInfoViewProps> = ({
  plants,
  filters,
  onFiltersChange,
  language,
  onLanguageChange,
  savedPlantIds,
  onToggleSave,
  onSelectPlant,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [previewPlant, setPreviewPlant] = useState<PowoPlant | null>(null);

  const t = PLANT_UI_COPY[language];

  const families = useMemo(() => getUniqueFamilies(plants), [plants]);
  const lifeforms = useMemo(() => getUniqueLifeforms(plants), [plants]);

  const filteredPlants = useMemo(
    () => filterPowoPlants(plants, filters, savedPlantIds),
    [plants, filters, savedPlantIds]
  );

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    if (!previewPlant) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewPlant(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [previewPlant]);

  const paginated = useMemo(
    () => paginatePlants(filteredPlants, currentPage, PAGE_SIZE),
    [filteredPlants, currentPage]
  );

  const hasActiveFilters =
    filters.searchQuery.trim().length > 0 ||
    filters.family !== 'all' ||
    filters.lifeform !== 'all' ||
    filters.onlySaved;

  const resetFilters = () => {
    onFiltersChange(DEFAULT_POWO_CATALOG_FILTERS);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Page Header with POWO Attribution & [ MN | EN ] Language Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#215b63]/12 pb-6">
        <div className="space-y-2 max-w-3xl">
          <p className="text-xs font-medium text-[#215b63]/70">{t.eyebrow}</p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#215b63]">
            {t.title}
          </h1>
          <p className="text-sm sm:text-base text-[#142B2E]/75 leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* [ MN | EN ] Language Switcher */}
          <div
            role="group"
            aria-label="Хэл сонгох / Language switcher"
            data-testid="plant-language-toggle"
            className="inline-flex items-center rounded-xl border border-[#215b63]/15 bg-white p-1 text-xs font-semibold"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('mn')}
              aria-pressed={language === 'mn'}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                language === 'mn'
                  ? 'bg-[#215b63] text-white'
                  : 'text-[#215b63]/75 hover:text-[#215b63]'
              }`}
            >
              MN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              aria-pressed={language === 'en'}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                language === 'en'
                  ? 'bg-[#215b63] text-white'
                  : 'text-[#215b63]/75 hover:text-[#215b63]'
              }`}
            >
              EN
            </button>
          </div>

          <a
            href="https://powo.science.kew.org/results?q="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#215b63]/15 bg-white text-xs font-semibold text-[#215b63] hover:border-[#67c090] whitespace-nowrap transition-colors"
          >
            <span>{t.powoSource}</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#67c090]" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() =>
              onFiltersChange({ ...filters, onlySaved: !filters.onlySaved })
            }
            aria-pressed={filters.onlySaved}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-colors ${
              filters.onlySaved
                ? 'bg-[#215b63] text-white border-[#215b63]'
                : 'bg-white text-[#215b63] border-[#215b63]/15 hover:border-[#67c090]'
            }`}
          >
            <Bookmark className="w-4 h-4" aria-hidden="true" />
            <span>{t.savedBtn(savedPlantIds.size)}</span>
          </button>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#215b63]/15 bg-white text-xs font-semibold text-[#215b63] hover:bg-[#F8FAF9] whitespace-nowrap transition-colors"
            >
              <FilterX className="w-4 h-4 text-[#215b63]/70" aria-hidden="true" />
              <span>{t.clearFilters}</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Search Bar + Family & Lifeform Filters */}
      <section
        aria-label={t.searchSectionLabel}
        className="rounded-2xl bg-white border border-[#215b63]/12 p-5 sm:p-6 space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-6">
            <label
              htmlFor="powo-plant-search"
              className="block text-xs font-semibold text-[#215b63] mb-1.5"
            >
              {t.searchLabel}
            </label>
            <div className="relative">
              <Search
                className="w-4 h-4 text-[#215b63]/50 absolute left-3.5 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="powo-plant-search"
                type="text"
                value={filters.searchQuery}
                onChange={(e) =>
                  onFiltersChange({ ...filters, searchQuery: e.target.value })
                }
                placeholder={t.searchPlaceholder}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#215b63]/15 text-sm text-[#142B2E] placeholder:text-[#142B2E]/45 focus:outline-none focus:border-[#67c090] focus:ring-2 focus:ring-[#67c090]/25"
              />
            </div>
          </div>

          <div className="md:col-span-3">
            <label
              htmlFor="powo-family-select"
              className="block text-xs font-semibold text-[#215b63] mb-1.5"
            >
              {t.familyLabel}
            </label>
            <select
              id="powo-family-select"
              value={filters.family}
              onChange={(e) =>
                onFiltersChange({ ...filters, family: e.target.value })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#215b63]/15 text-sm text-[#142B2E] focus:outline-none focus:border-[#67c090]"
            >
              <option value="all">{t.allFamilies}</option>
              {families.map((fam) => (
                <option key={fam} value={fam}>
                  {language === 'en'
                    ? fam
                    : `${translateFamilyToMn(fam)} (${fam})`}
                </option>
              ))}
            </select>
          </div>

          <div className="md:col-span-3">
            <label
              htmlFor="powo-lifeform-select"
              className="block text-xs font-semibold text-[#215b63] mb-1.5"
            >
              {t.lifeformLabel}
            </label>
            <select
              id="powo-lifeform-select"
              value={filters.lifeform}
              onChange={(e) =>
                onFiltersChange({ ...filters, lifeform: e.target.value })
              }
              className="w-full px-3 py-2.5 rounded-xl bg-[#F8FAF9] border border-[#215b63]/15 text-sm text-[#142B2E] focus:outline-none focus:border-[#67c090]"
            >
              <option value="all">{t.allLifeforms}</option>
              {lifeforms.map((lf) => (
                <option key={lf} value={lf}>
                  {language === 'en' ? lf : translateLifeformToMn(lf)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-3 border-t border-[#215b63]/8 flex flex-wrap items-center justify-between gap-3 text-xs text-[#215b63]/75">
          <p data-testid="plant-result-count" className="tabular-nums font-medium">
            {paginated.totalItems === 0
              ? t.zeroResults
              : t.showingRange(
                  paginated.startIndex,
                  paginated.endIndex,
                  paginated.totalItems
                )}
          </p>
          <p className="font-tech-mono tabular-nums">
            {t.pageIndicator(paginated.currentPage, paginated.totalPages)}
          </p>
        </div>
      </section>

      {/* Cards Grid or Empty State */}
      {paginated.items.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#215b63]/12 p-12 text-center space-y-4">
          <Sprout className="w-10 h-10 text-[#67c090] mx-auto" aria-hidden="true" />
          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-[#215b63]">
              {t.emptyTitle}
            </h2>
            <p className="text-sm text-[#142B2E]/70 max-w-md mx-auto">
              {t.emptyDesc}
            </p>
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="px-5 py-2.5 rounded-xl bg-[#215b63] text-white text-sm font-semibold hover:bg-[#194950] transition-colors"
          >
            {t.emptyBtn}
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {paginated.items.map((plant) => {
              const isSaved = savedPlantIds.has(plant.id);
              const localized = getLocalizedPlantFields(plant, language);
              return (
                <article
                  key={plant.id}
                  className="group rounded-2xl bg-white border border-[#215b63]/12 overflow-hidden flex flex-col justify-between hover:border-[#67c090] transition-colors"
                >
                  <div>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setPreviewPlant(plant)}
                        className="relative block w-full text-left focus-visible:outline-none"
                        aria-label={t.viewImageAria(plant.scientific_name)}
                      >
                        <PlantSpecimenArt
                          plant={plant}
                          className="w-full aspect-[4/3]"
                        />
                        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-[#133a40]/70 px-2.5 py-1 text-[11px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                          <ZoomIn className="w-3 h-3 text-[#67c090]" aria-hidden="true" />
                          <span>{t.modalZoomImage}</span>
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleSave(plant.id)}
                        aria-label={
                          isSaved
                            ? `${plant.scientific_name} ${t.modalSaved}`
                            : `${plant.scientific_name} ${t.modalSave}`
                        }
                        aria-pressed={isSaved}
                        className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md border transition-colors ${
                          isSaved
                            ? 'bg-[#215b63] text-white border-[#215b63]'
                            : 'bg-white/90 text-[#215b63] border-[#215b63]/15 hover:border-[#67c090]'
                        }`}
                      >
                        <Bookmark
                          className="w-4 h-4"
                          fill={isSaved ? 'currentColor' : 'none'}
                          aria-hidden="true"
                        />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectPlant(plant)}
                      aria-label={t.viewDetailsAria(plant.scientific_name)}
                      className="block w-full text-left p-6 space-y-3.5 focus-visible:outline-none"
                    >
                      <div>
                        <p className="text-xs text-[#215b63]/70 truncate">
                          {localized.family}
                          {localized.familySecondary &&
                          localized.familySecondary !== localized.family
                            ? ` (${localized.familySecondary})`
                            : ''}{' '}
                          · {localized.lifeform}
                        </p>
                        <h2 className="text-xl font-bold text-[#142B2E] mt-1 group-hover:text-[#215b63] transition-colors">
                          <span className="font-botanical-serif italic text-[22px] text-[#215b63]">
                            {plant.scientific_name}
                          </span>{' '}
                          <span className="text-sm font-normal text-[#215b63]/70">
                            {plant.author}
                          </span>
                        </h2>
                        <p className="text-sm font-medium text-[#142B2E]/85 mt-0.5">
                          {localized.commonName}
                        </p>
                      </div>

                      <p className="text-sm text-[#142B2E]/75 leading-relaxed line-clamp-2">
                        {localized.description}
                      </p>

                      <div className="pt-3 border-t border-[#215b63]/8 flex items-start gap-2 text-xs text-[#215b63]/80">
                        <MapPin
                          className="w-3.5 h-3.5 text-[#67c090] shrink-0 mt-0.5"
                          aria-hidden="true"
                        />
                        <span className="line-clamp-2">{localized.distribution}</span>
                      </div>
                    </button>
                  </div>

                  <div className="px-6 pb-5 pt-3 border-t border-[#215b63]/8 flex items-center justify-between gap-3">
                    <a
                      href={plant.powo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-[#215b63]/70 hover:text-[#215b63] whitespace-nowrap"
                    >
                      <span>POWO</span>
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                    <button
                      type="button"
                      onClick={() => onSelectPlant(plant)}
                      className="text-xs font-semibold text-[#215b63] hover:text-[#153e44] whitespace-nowrap transition-colors"
                    >
                      {t.detailsBtn}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Pagination Controls */}
          {paginated.totalPages > 1 && (
            <nav
              aria-label="Ургамлын жагсаалтын хуудаслалт"
              className="flex flex-wrap items-center justify-center gap-2 pt-4"
            >
              <button
                type="button"
                disabled={paginated.currentPage <= 1}
                onClick={() => handlePageChange(paginated.currentPage - 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#215b63]/15 bg-white text-xs font-semibold text-[#215b63] hover:border-[#67c090] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <ChevronLeft className="w-4 h-4" aria-hidden="true" />
                <span>{t.prevPage}</span>
              </button>

              {getPaginationRange(paginated.currentPage, paginated.totalPages).map(
                (item, idx) => {
                  if (item === 'ellipsis') {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 text-xs font-tech-mono text-[#215b63]/55 select-none"
                        aria-hidden="true"
                      >
                        …
                      </span>
                    );
                  }
                  const isCurrent = item === paginated.currentPage;
                  return (
                    <button
                      key={item}
                      type="button"
                      aria-current={isCurrent ? 'page' : undefined}
                      onClick={() => handlePageChange(item)}
                      className={`min-w-9 h-9 px-2 rounded-xl text-xs font-tech-mono font-semibold transition-colors ${
                        isCurrent
                          ? 'bg-[#215b63] text-white'
                          : 'bg-white border border-[#215b63]/15 text-[#215b63] hover:border-[#67c090]'
                      }`}
                    >
                      {item}
                    </button>
                  );
                }
              )}

              <button
                type="button"
                disabled={paginated.currentPage >= paginated.totalPages}
                onClick={() => handlePageChange(paginated.currentPage + 1)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#215b63]/15 bg-white text-xs font-semibold text-[#215b63] hover:border-[#67c090] disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <span>{t.nextPage}</span>
                <ChevronRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </nav>
          )}
        </>
      )}

      {/* Image-only Lightbox Preview (only opened when user clicks card image) */}
      {previewPlant && previewPlant.images[0]?.url && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={previewPlant.scientific_name}
          className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80"
          onClick={() => setPreviewPlant(null)}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewPlant(null)}
              aria-label={t.modalClosePreview}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/95 text-[#215b63] flex items-center justify-center shadow"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
            <img
              src={previewPlant.images[0].url}
              alt={previewPlant.scientific_name}
              referrerPolicy="no-referrer"
              className="w-full max-h-[75vh] object-contain bg-[#142B2E]"
            />
            <div className="px-5 py-3.5 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="font-botanical-serif italic font-semibold text-sm text-[#215b63]">
                  {previewPlant.scientific_name} {previewPlant.author}
                </span>
                <span className="ml-2 text-[#215b63]/65">
                  {previewPlant.images[0].copyright}
                </span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const p = previewPlant;
                  setPreviewPlant(null);
                  onSelectPlant(p);
                }}
                className="px-3.5 py-1.5 rounded-lg bg-[#215b63] text-white font-semibold hover:bg-[#194950] transition-colors"
              >
                {t.detailsBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
