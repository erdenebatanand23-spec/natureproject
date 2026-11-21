import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  ExternalLink,
  Globe,
  Leaf,
  MapPin,
  Sprout,
  UserCheck,
  X,
  ZoomIn,
} from 'lucide-react';
import { PlantLanguage, PowoPlant } from '../types/botany';
import { getLocalizedPlantFields, PLANT_UI_COPY } from '../utils/powoCatalog';
import { PlantSpecimenArt } from './PlantSpecimenArt';

interface PlantDetailModalProps {
  plant: PowoPlant | null;
  language: PlantLanguage;
  onLanguageChange: (lang: PlantLanguage) => void;
  isSaved: boolean;
  onToggleSave: (plantId: string) => void;
  onClose: () => void;
}

export const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
  plant,
  language,
  onLanguageChange,
  isSaved,
  onToggleSave,
  onClose,
}) => {
  const [imageZoomed, setImageZoomed] = useState(false);

  useEffect(() => {
    setImageZoomed(false);
  }, [plant?.id]);

  useEffect(() => {
    if (!plant) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (imageZoomed) {
          setImageZoomed(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [plant, imageZoomed, onClose]);

  if (!plant) return null;

  const t = PLANT_UI_COPY[language];
  const localized = getLocalizedPlantFields(plant, language);
  const primaryImage = plant.images[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="plant-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#133a40]/45 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#215b63]/15 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top-Right Language Switcher + Close Button */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center rounded-full border border-[#215b63]/15 bg-white/95 p-0.5 text-xs font-semibold shadow-sm"
          >
            <button
              type="button"
              onClick={() => onLanguageChange('mn')}
              aria-pressed={language === 'mn'}
              className={`px-2.5 py-1 rounded-full transition-colors ${
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
              className={`px-2.5 py-1 rounded-full transition-colors ${
                language === 'en'
                  ? 'bg-[#215b63] text-white'
                  : 'text-[#215b63]/75 hover:text-[#215b63]'
              }`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={t.modalCloseAria}
            className="w-9 h-9 rounded-full bg-white/95 border border-[#215b63]/15 flex items-center justify-center text-[#215b63] hover:bg-[#F8FAF9] transition-colors"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Compact Side Thumbnail + POWO Metadata Column */}
          <div className="lg:col-span-4 bg-[#F2F7F4] p-5 flex flex-col justify-between gap-5 border-b lg:border-b-0 lg:border-r border-[#215b63]/10">
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => setImageZoomed(true)}
                aria-label={t.modalZoomImage}
                className="group relative block w-full overflow-hidden rounded-2xl border border-[#215b63]/12 bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#67c090]"
              >
                <PlantSpecimenArt
                  plant={plant}
                  className="w-full aspect-[4/3]"
                />
                <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 rounded-full bg-[#133a40]/75 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3 h-3 text-[#67c090]" aria-hidden="true" />
                  <span>{t.modalZoomImage}</span>
                </span>
              </button>
            </div>

            <div className="space-y-3 border-t border-[#215b63]/10 pt-4">
              <p className="text-xs font-semibold text-[#215b63]">
                {t.modalRecordTitle}
              </p>
              <dl className="space-y-2 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-[#215b63]/65">ID (fqId):</dt>
                  <dd className="text-right font-tech-mono text-[11px] text-[#142B2E] break-all">
                    {plant.id}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#215b63]/65">{t.modalFamily}:</dt>
                  <dd className="text-right font-medium text-[#142B2E]">
                    {localized.family}
                    {localized.familySecondary &&
                    localized.familySecondary !== localized.family
                      ? ` (${localized.familySecondary})`
                      : ''}
                  </dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-[#215b63]/65">{t.modalCredit}:</dt>
                  <dd className="text-right text-[#142B2E]/80">
                    {primaryImage?.copyright || 'Royal Botanic Gardens, Kew (POWO)'}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Primary Textual Botanical Details Column */}
          <div className="lg:col-span-8 p-6 sm:p-8 space-y-5">
            <div className="pr-28">
              <p className="text-xs font-medium text-[#215b63]/70">
                {localized.family}
                {localized.familySecondary &&
                localized.familySecondary !== localized.family
                  ? ` · ${localized.familySecondary}`
                  : ''}
              </p>
              <h2
                id="plant-modal-title"
                className="text-2xl sm:text-3xl font-bold text-[#215b63] mt-1"
              >
                <span className="font-botanical-serif italic">
                  {plant.scientific_name}
                </span>{' '}
                <span className="text-base font-normal text-[#215b63]/70">
                  {plant.author}
                </span>
              </h2>
              <p className="text-base font-medium text-[#142B2E]/85 mt-1">
                {localized.commonName}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#215b63]/10 space-y-1">
                <span className="inline-flex items-center gap-1.5 text-[#215b63]/70">
                  <UserCheck className="w-3.5 h-3.5 text-[#67c090]" aria-hidden="true" />
                  {t.modalAuthor}
                </span>
                <p className="font-semibold text-[#142B2E]">{plant.author}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F8FAF9] border border-[#215b63]/10 space-y-1">
                <span className="inline-flex items-center gap-1.5 text-[#215b63]/70">
                  <Leaf className="w-3.5 h-3.5 text-[#67c090]" aria-hidden="true" />
                  {t.modalLifeform}
                </span>
                <p className="font-semibold text-[#142B2E]">
                  {localized.lifeform}
                  {localized.lifeformSecondary &&
                  localized.lifeformSecondary !== localized.lifeform
                    ? ` (${localized.lifeformSecondary})`
                    : ''}
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-sm font-semibold text-[#215b63]">
                {t.modalDescription}
              </h3>
              <p className="text-sm text-[#142B2E]/85 leading-relaxed">
                {localized.description}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8FAF9] border border-[#215b63]/12 p-4 space-y-1.5">
              <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-[#215b63]">
                <Sprout className="w-4 h-4 text-[#67c090]" aria-hidden="true" />
                {t.modalCare}
              </h3>
              <p className="text-sm text-[#142B2E]/80 leading-relaxed">
                {localized.care}
              </p>
            </div>

            <div className="rounded-2xl bg-[#F8FAF9] border border-[#67c090]/35 p-4 space-y-1.5">
              <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-[#215b63]">
                <MapPin className="w-4 h-4 text-[#67c090]" aria-hidden="true" />
                {t.modalDistribution}
              </h3>
              <p className="text-sm text-[#142B2E]/90 font-medium">
                {localized.distribution}
              </p>
              {localized.distributionSecondary &&
                localized.distributionSecondary !== localized.distribution && (
                  <p className="inline-flex items-center gap-1.5 text-xs text-[#215b63]/70">
                    <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{localized.distributionSecondary}</span>
                  </p>
                )}
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-[#215b63]/10">
              <a
                href={plant.powo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#215b63]/20 text-xs font-semibold text-[#215b63] hover:border-[#67c090] hover:bg-[#F8FAF9] transition-colors"
              >
                <span>{t.modalViewOnPowo}</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#67c090]" aria-hidden="true" />
              </a>

              <button
                type="button"
                onClick={() => onToggleSave(plant.id)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  isSaved
                    ? 'bg-[#67c090]/20 text-[#215b63] border border-[#67c090]'
                    : 'bg-[#215b63] text-white hover:bg-[#194950]'
                }`}
              >
                <Bookmark
                  className="w-4 h-4"
                  fill={isSaved ? 'currentColor' : 'none'}
                  aria-hidden="true"
                />
                <span>{isSaved ? t.modalSaved : t.modalSave}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Optional Separate Image Preview Lightbox when user clicks thumbnail */}
      {imageZoomed && primaryImage?.url && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/80"
          onClick={(e) => {
            e.stopPropagation();
            setImageZoomed(false);
          }}
        >
          <div
            className="relative max-w-3xl w-full rounded-2xl overflow-hidden bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setImageZoomed(false)}
              aria-label={t.modalClosePreview}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/95 text-[#215b63] flex items-center justify-center shadow"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
            <img
              src={primaryImage.url}
              alt={`${plant.scientific_name} (${localized.commonName})`}
              referrerPolicy="no-referrer"
              className="w-full max-h-[75vh] object-contain bg-[#142B2E]"
            />
            <div className="px-4 py-3 text-xs text-[#215b63] flex items-center justify-between gap-4 bg-white">
              <span className="font-botanical-serif italic font-semibold">
                {plant.scientific_name} {plant.author}
              </span>
              <span className="text-[#215b63]/70">{primaryImage.copyright}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
