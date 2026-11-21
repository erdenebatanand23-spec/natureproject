import { PowoCatalogFilterState, PowoPlant } from '../types/botany';

export const DEFAULT_POWO_CATALOG_FILTERS: PowoCatalogFilterState = {
  searchQuery: '',
  family: 'all',
  lifeform: 'all',
  onlySaved: false,
};

const FAMILY_TRANSLATIONS: Record<string, string> = {
  Acanthaceae: 'Акантын овог',
  Aceraceae: 'Агч модны овог',
  Adoxaceae: 'Адоксын овог',
  Aizoaceae: 'Аизооны овог',
  Alismataceae: 'Залхагтны овог',
  Amaranthaceae: 'Луулийн овог',
  Amaryllidaceae: 'Сонгинолгийн овог',
  Anacardiaceae: 'Агар модны овог',
  Annonaceae: 'Анноны овог',
  Apiaceae: 'Шүхэр цэцэгтний овог',
  Apocynaceae: 'Олеандрын овог',
  Aquifoliaceae: 'Падубын овог',
  Araceae: 'Аройдын овог',
  Araliaceae: 'Аралийн овог',
  Arecaceae: 'Дал модны овог',
  Asclepiadaceae: 'Сүүт өвсний овог',
  Asparagaceae: 'Аспарагусын овог',
  Asphodelaceae: 'Асфоделийн овог',
  Aspleniaceae: 'Хадан оймын овог',
  Asteraceae: 'Голгэсэртний овог',
  Athyriaceae: 'Ойн оймын овог',
  Balsaminaceae: 'Хонгор цэцгийн овог',
  Begoniaceae: 'Бегонийн овог',
  Berberidaceae: 'Тошлойн овог',
  Betulaceae: 'Хусны овог',
  Bignoniaceae: 'Бигнонийн овог',
  Boraginaceae: 'Нохойн хэлний овог',
  Brassicaceae: 'Тоонолжин цэцэгтний овог',
  Bromeliaceae: 'Бромелийн овог',
  Buddlejaceae: 'Буддлейн овог',
  Buxaceae: 'Самшитын овог',
  Cactaceae: 'Кактусын овог',
  Caesalpiniaceae: 'Буурцагтны овог',
  Campanulaceae: 'Хонхон цэцгийн овог',
  Cannabaceae: 'Олсны овог',
  Caprifoliaceae: 'Далан хальсны овог',
  Caryophyllaceae: 'Баширын овог',
  Celastraceae: 'Эрээн модны овог',
  Chenopodiaceae: 'Луулийн овог',
  Cistaceae: 'Цистусын овог',
  Clusiaceae: 'Клузийн овог',
  Commelinaceae: 'Коммелины овог',
  Compositae: 'Голгэсэртний овог',
  Convallariaceae: 'Майн цэцгийн овог',
  Convolvulaceae: 'Чөдөр өвсний овог',
  Cornaceae: 'Улаан модны овог',
  Crassulaceae: 'Могилын овог',
  Cruciferae: 'Тоонолжин цэцэгтний овог',
  Cucurbitaceae: 'Хулууны овог',
  Cupressaceae: 'Арцын овог',
  Cyperaceae: 'Улалжны овог',
  Dennstaedtiaceae: 'Оймын овог',
  Dipsacaceae: 'Ворсянкийн овог',
  Droseraceae: 'Шүүдэр цэцгийн овог',
  Dryopteridaceae: 'Оймын овог',
  Ebenaceae: 'Хар модны овог',
  Elaeagnaceae: 'Жигдийн овог',
  Equisetaceae: 'Шивлээний овог',
  Ericaceae: 'Анисны овог',
  Euphorbiaceae: 'Сүүт өвсний овог',
  Fabaceae: 'Буурцагтны овог',
  Fagaceae: 'Эвэрлэг модны овог',
  Gentianaceae: 'Дэгдийн овог',
  Geraniaceae: 'Шимтэглээний овог',
  Ginkgoaceae: 'Гинкгогийн овог',
  Gramineae: 'Үетний овог',
  Grossulariaceae: 'Үхрийн нүдний овог',
  Hamamelidaceae: 'Шидэт самрын овог',
  Hippocastanaceae: 'Туулайн бөөрний овог',
  Hyacinthaceae: 'Гиацинтын овог',
  Hydrangeaceae: 'Гортензийн овог',
  Hydrocharitaceae: 'Усны ургамлын овог',
  Hypericaceae: 'Алтанцэцгийн овог',
  Iridaceae: 'Цахилдагийн овог',
  Juglandaceae: 'Хушганы овог',
  Juncaceae: 'Зэгсний овог',
  Labiatae: 'Уруул цэцэгтний овог',
  Lamiaceae: 'Уруул цэцэгтний овог',
  Lauraceae: 'Лаврын овог',
  Leguminosae: 'Буурцагтны овог',
  Liliaceae: 'Сарааны овог',
  Linaceae: 'Маалингын овог',
  Lythraceae: 'Дербенникийн овог',
  Magnoliaceae: 'Магнолийн овог',
  Malvaceae: 'Жамбацэцгийн овог',
  Marantaceae: 'Марантын овог',
  Melanthiaceae: 'Мелантын овог',
  Meliaceae: 'Мелийн овог',
  Moraceae: 'Яламны овог',
  Myrtaceae: 'Миртийн овог',
  Nelumbonaceae: 'Бадамлянхуаны овог',
  Nyctaginaceae: 'Шөнийн цэцгийн овог',
  Nymphaeaceae: 'Усны сарааны овог',
  Oleaceae: 'Чидуны овог',
  Onagraceae: 'Ослинникийн овог',
  Orchidaceae: 'Цахирмааны овог',
  Orobanchaceae: 'Зараа өвсний овог',
  Osmundaceae: 'Хааны оймын овог',
  Oxalidaceae: 'Исгэлэн өвсний овог',
  Paeoniaceae: 'Цээнийн овог',
  Papaveraceae: 'Намуу цэцгийн овог',
  Passifloraceae: 'Пассифлорын овог',
  Phytolaccaceae: 'Фитолаккийн овог',
  Pinaceae: 'Нарсны овог',
  Plantaginaceae: 'Таван салааны овог',
  Platanaceae: 'Чинарын овог',
  Plumbaginaceae: 'Бэрцэцгийн овог',
  Poaceae: 'Үетний овог',
  Polemoniaceae: 'Флоксын овог',
  Polygonaceae: 'Таарны овог',
  Polypodiaceae: 'Сэвсгэр оймын овог',
  Pontederiaceae: 'Усны гиацинтын овог',
  Portulacaceae: 'Портулакийн овог',
  Primulaceae: 'Хаврын цэцгийн овог',
  Pteridaceae: 'Оймын овог',
  Ranunculaceae: 'Хонгорзулын овог',
  Rhamnaceae: 'Яшил модны овог',
  Rosaceae: 'Сарнайн овог',
  Rubiaceae: 'Марены овог',
  Rutaceae: 'Цитрусын овог',
  Salicaceae: 'Бургасны овог',
  Sapindaceae: 'Агч модны овог',
  Saxifragaceae: 'Чулуун цэцгийн овог',
  Scrophulariaceae: 'Норичникийн овог',
  Simaroubaceae: 'Айлантын овог',
  Solanaceae: 'Чонон хэлний овог',
  Taxaceae: 'Улаан нарсны овог',
  Taxodiaceae: 'Секвойягийн овог',
  Thymelaeaceae: 'Далан түрүүний овог',
  Tiliaceae: 'Далдуу модны овог',
  Trilliaceae: 'Триллиумын овог',
  Typhaceae: 'Хульсны овог',
  Ulmaceae: 'Хайлаасны овог',
  Umbelliferae: 'Шүхэр цэцэгтний овог',
  Urticaceae: 'Халгайн овог',
  Verbenaceae: 'Вербенийн овог',
  Viburnaceae: 'Халиусны овог',
  Violaceae: 'Нил цэцгийн овог',
  Vitaceae: 'Усан үзмийн овог',
  Woodsiaceae: 'Хадан оймын овог',
  Zingiberaceae: 'Цагаан гааны овог',
  Zygophyllaceae: 'Шар буурцагтны овог',
};

const LIFEFORM_TRANSLATIONS: Record<string, string> = {
  Tree: 'Мод',
  Shrub: 'Сөөг',
  Subshrub: 'Сөөгөнцөр',
  'Shrub or small tree': 'Сөөг ба жижиг мод',
  'Perennial herb': 'Олон наст өвслөг ургамал',
  'Climbing perennial': 'Авиран олон наст',
  'Climbing hemiepiphyte': 'Авиран хагас эпифит',
  'Succulent perennial': 'Шүүслэг олон наст',
  'Rhizomatous perennial': 'Үндэслэг иштэй олон наст',
  'Tuberous perennial': 'Булцуут олон наст',
  'Rhizomatous perennial fern': 'Олон наст ойм',
  'Aquatic perennial hydrophyte': 'Усны олон наст',
  Annual: 'Нэг наст',
  Biennial: 'Хоёр наст',
};

export function translateFamilyToMn(family: string): string {
  const clean = family.trim();
  return FAMILY_TRANSLATIONS[clean] ?? `${clean} овог`;
}

export function translateLifeformToMn(lifeform: string): string {
  const clean = lifeform.trim();
  if (LIFEFORM_TRANSLATIONS[clean]) return LIFEFORM_TRANSLATIONS[clean];
  const lower = clean.toLowerCase();
  if (lower.includes('tree')) return 'Мод';
  if (lower.includes('shrub')) return 'Сөөг';
  if (lower.includes('climb')) return 'Авиран ургамал';
  if (lower.includes('succulent')) return 'Шүүслэг ургамал';
  if (lower.includes('fern')) return 'Ойм хэлбэртэн';
  if (lower.includes('aquatic')) return 'Усны ургамал';
  if (lower.includes('annual')) return 'Нэг наст өвслөг ургамал';
  if (lower.includes('biennial')) return 'Хоёр наст өвслөг ургамал';
  if (lower.includes('perennial')) return 'Олон наст ургамал';
  return clean;
}

export function translateDistributionToMn(distribution: string): string {
  const clean = distribution.trim();
  if (!clean) return 'Тодорхойгүй';
  return clean
    .replace(/^Native to\s+/i, 'Гарал үүсэл: ')
    .replace(/\bMongolia\b/g, 'Монгол')
    .replace(/\bSiberia\b/g, 'Сибирь')
    .replace(/\bChina\b/g, 'Хятад')
    .replace(/\bEurope\b/g, 'Европ')
    .replace(/\bCentral Asia\b/g, 'Төв Ази')
    .replace(/\bWestern Asia\b/g, 'Баруун Ази')
    .replace(/\bMexico\b/g, 'Мексик')
    .replace(/\bBrazil\b/g, 'Бразил');
}

export function getUniqueFamilies(plants: PowoPlant[]): string[] {
  return Array.from(new Set(plants.map((p) => p.family))).sort();
}

export function getUniqueLifeforms(plants: PowoPlant[]): string[] {
  return Array.from(new Set(plants.map((p) => p.lifeform))).sort();
}

export function filterPowoPlants(
  plants: PowoPlant[],
  filters: PowoCatalogFilterState,
  savedIds: Set<string> = new Set()
): PowoPlant[] {
  const q = filters.searchQuery.trim().toLowerCase();

  return plants.filter((plant) => {
    if (filters.onlySaved && !savedIds.has(plant.id)) {
      return false;
    }

    if (filters.family !== 'all' && plant.family !== filters.family) {
      return false;
    }

    if (filters.lifeform !== 'all' && plant.lifeform !== filters.lifeform) {
      return false;
    }

    if (q.length > 0) {
      const searchable = [
        plant.scientific_name,
        plant.author,
        plant.family,
        plant.family_mn,
        plant.common_name,
        plant.common_name_mn,
        plant.distribution,
        plant.distribution_mn,
        plant.lifeform,
        plant.lifeform_mn,
      ]
        .join(' ')
        .toLowerCase();

      if (!searchable.includes(q)) {
        return false;
      }
    }

    return true;
  });
}

export interface PaginatedResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
}

export function paginatePlants<T>(
  items: T[],
  requestedPage: number,
  pageSize: number
): PaginatedResult<T> {
  const safePageSize = Math.max(1, pageSize);
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const start = (currentPage - 1) * safePageSize;
  const end = Math.min(start + safePageSize, totalItems);

  return {
    items: items.slice(start, end),
    currentPage,
    totalPages,
    totalItems,
    startIndex: totalItems === 0 ? 0 : start + 1,
    endIndex: end,
  };
}

export function getPaginationRange(
  currentPage: number,
  totalPages: number
): Array<number | 'ellipsis'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const range: Array<number | 'ellipsis'> = [1];
  const left = Math.max(2, currentPage - 1);
  const right = Math.min(totalPages - 1, currentPage + 1);

  if (left > 2) {
    range.push('ellipsis');
  }

  for (let p = left; p <= right; p += 1) {
    range.push(p);
  }

  if (right < totalPages - 1) {
    range.push('ellipsis');
  }

  range.push(totalPages);
  return range;
}

/**
 * Filters raw POWO search/taxon records: skips records without valid images
 * and prioritizes image-bearing entries.
 */
export function normalizeAndFilterRawPowo<
  T extends { id?: string; scientific_name?: string; images?: Array<{ url?: string }> }
>(records: T[]): T[] {
  return records.filter(
    (rec) =>
      Boolean(rec.id && rec.scientific_name) &&
      Array.isArray(rec.images) &&
      rec.images.some((img) => Boolean(img.url))
  );
}

export const PLANT_LANGUAGE_STORAGE_KEY = 'ecoflora_plant_language_v1';

export function readStoredPlantLanguage(): 'mn' | 'en' {
  if (typeof window === 'undefined') return 'mn';
  try {
    const val = window.localStorage.getItem(PLANT_LANGUAGE_STORAGE_KEY);
    return val === 'en' ? 'en' : 'mn';
  } catch {
    return 'mn';
  }
}

export function savePlantLanguage(lang: 'mn' | 'en'): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PLANT_LANGUAGE_STORAGE_KEY, lang);
  } catch {
    // Ignore storage write errors
  }
}

export function buildEnglishDescription(plant: PowoPlant): string {
  const distClause = plant.distribution
    ? plant.distribution.replace(/^Native to\s+/i, 'native to ')
    : 'distributed across global botanical habitats';
  return `${plant.scientific_name} (${plant.family}) is a ${plant.lifeform.toLowerCase()} species, ${distClause}.`;
}

export function getCareGuidance(lifeform: string, lang: 'mn' | 'en'): string {
  const lower = lifeform.toLowerCase();
  if (lower.includes('succulent')) {
    return lang === 'en'
      ? 'Bright direct or filtered light; well-draining sandy substrate; allow soil to dry thoroughly between waterings.'
      : 'Тод эсвэл шууд бус нарны гэрэл, ус сайн нэвтрүүлдэг элсэрхэг хөрс, усалгааны хооронд хөрсийг бүрэн хатаана.';
  }
  if (lower.includes('fern')) {
    return lang === 'en'
      ? 'Filtered shade, consistently moist organic soil, and moderate-to-high ambient humidity.'
      : 'Сарнисан сүүдэр, ялзмаг ихтэй чийглэг хөрс, дунд болон өндөр агаарын чийгшил шаардлагатай.';
  }
  if (lower.includes('aquatic') || lower.includes('hydrophyte')) {
    return lang === 'en'
      ? 'Freshwater pond or aquatic container with calm water, rich sediment, and full sun exposure.'
      : 'Тогтуун цэнгэг ус, шим тэжээлтэй ёроолын хөрс болон ил нарны гэрэлд ургана.';
  }
  if (lower.includes('climb') || lower.includes('epiphyte')) {
    return lang === 'en'
      ? 'Bright indirect light, airy organic bark/peat mix, and structural support for climbing stems.'
      : 'Шууд бус тод гэрэл, агаар сайн нэвтрүүлдэг хөнгөн хөрс болон авирах тулгуур тохиромжтой.';
  }
  if (lower.includes('tree')) {
    return lang === 'en'
      ? 'Full sun to partial shade, deep fertile soil, and seasonal watering during root establishment.'
      : 'Нартай эсвэл хагас сүүдэрлэг орчин, гүн үржил шимтэй хөрс болон суулгацын үед тогтмол усалгаа шаардлагатай.';
  }
  if (lower.includes('shrub')) {
    return lang === 'en'
      ? 'Full sun to light shade, well-drained loam soil, and light seasonal pruning to maintain structure.'
      : 'Нарлаг эсвэл хагас сүүдэрт, ус тогтдоггүй сийрэг хөрсөнд сайн ургах ба улирлын таналт тохиромжтой.';
  }
  return lang === 'en'
    ? 'Moderate sunlight, balanced moisture retention, and well-aerated humus-rich soil.'
    : 'Дунд зэргийн нарны гэрэл, жигд чийгшил болон агааржилт сайтай ялзмагт хөрсөнд тохиромжтой.';
}

export interface LocalizedPlantFields {
  family: string;
  familySecondary: string;
  commonName: string;
  lifeform: string;
  lifeformSecondary: string;
  distribution: string;
  distributionSecondary: string;
  description: string;
  care: string;
}

export function getLocalizedPlantFields(
  plant: PowoPlant,
  lang: 'mn' | 'en'
): LocalizedPlantFields {
  const englishDesc = plant.description_en?.trim() || buildEnglishDescription(plant);

  if (lang === 'en') {
    const family = plant.family?.trim() || plant.family_mn;
    const commonName = plant.common_name?.trim() || plant.scientific_name;
    const lifeform = plant.lifeform?.trim() || plant.lifeform_mn;
    const distribution = plant.distribution?.trim() || plant.distribution_mn;

    return {
      family,
      familySecondary: plant.family_mn?.trim() || '',
      commonName,
      lifeform,
      lifeformSecondary: plant.lifeform_mn?.trim() || '',
      distribution,
      distributionSecondary: plant.distribution_mn?.trim() || '',
      description: englishDesc,
      care: plant.care_en?.trim() || getCareGuidance(lifeform, 'en'),
    };
  }

  const family = plant.family_mn?.trim() || plant.family;
  const commonMnRaw = plant.common_name_mn?.trim();
  const commonEnRaw = plant.common_name?.trim();
  let commonName = commonMnRaw || commonEnRaw || plant.scientific_name;
  if (
    commonMnRaw &&
    commonEnRaw &&
    !commonMnRaw.toLowerCase().includes(commonEnRaw.toLowerCase()) &&
    commonEnRaw.toLowerCase() !== plant.scientific_name.toLowerCase()
  ) {
    commonName = `${commonMnRaw} · ${commonEnRaw}`;
  }

  const lifeform = plant.lifeform_mn?.trim() || plant.lifeform;
  const distribution = plant.distribution_mn?.trim() || plant.distribution;
  const description = plant.description_mn?.trim() || englishDesc;

  return {
    family,
    familySecondary: plant.family?.trim() || '',
    commonName,
    lifeform,
    lifeformSecondary: plant.lifeform?.trim() || '',
    distribution,
    distributionSecondary: plant.distribution?.trim() || '',
    description,
    care: plant.care_mn?.trim() || getCareGuidance(plant.lifeform, 'mn'),
  };
}

export const PLANT_UI_COPY = {
  mn: {
    eyebrow: 'Plants of the World Online (Kew) · Шинэчилсэн өгөгдлийн сан',
    title: 'Ургамлын мэдээлэл ба POWO каталог',
    subtitle:
      'POWO олон улсын ботаникийн сангаас шинжлэх ухааны нэр, овог, гарал үүсэл, амьдралын хэлбэр болон зурагтай бүртгэлүүдийг нэгтгэн толилуулж байна.',
    powoSource: 'POWO Эх сурвалж',
    savedBtn: (n: number) => `Хадгалсан (${n})`,
    clearFilters: 'Цэвэрлэх',
    searchSectionLabel: 'Ургамлын нэр болон овгоор хайх',
    searchLabel: 'Ургамлын нэр эсвэл овгоор хайх',
    searchPlaceholder: 'Латин нэр, Монгол нэр эсвэл Овог (ж.нь: Araceae, Pinus, Хуш)...',
    familyLabel: 'Овог (Family)',
    allFamilies: 'Бүх овог',
    lifeformLabel: 'Амьдралын хэлбэр',
    allLifeforms: 'Бүх хэлбэр',
    zeroResults: 'Илэрц: 0 зүйл',
    showingRange: (s: number, e: number, t: number) =>
      `Харагдаж буй: ${s}–${e} / Нийт ${t} зүйл`,
    pageIndicator: (c: number, t: number) => `Хуудас ${c} / ${t}`,
    emptyTitle: 'Таны хайлтад тохирох ургамал олдсонгүй',
    emptyDesc:
      'Хайлтын үг эсвэл овог, амьдралын хэлбэрийн шүүлтүүрээ өөрчилж дахин оролдоно уу.',
    emptyBtn: 'Шүүлтүүр цэвэрлэх',
    detailsBtn: 'Дэлгэрэнгүй →',
    viewImageAria: (name: string) => `${name} зураг томруулж харах`,
    viewDetailsAria: (name: string) => `${name} дэлгэрэнгүй мэдээлэл харах`,
    prevPage: 'Өмнөх',
    nextPage: 'Дараах',
    modalCloseAria: 'Цонх хаах',
    modalRecordTitle: 'POWO Бүртгэлийн мэдээлэл',
    modalFamily: 'Овог',
    modalCredit: 'Зураг эзэмшигч',
    modalAuthor: 'Нэршил өгсөн судлаач',
    modalLifeform: 'Амьдралын хэлбэр',
    modalDescription: 'Тайлбар ба ерөнхий мэдээлэл',
    modalCare: 'Арчилгаа ба ургалтын нөхцөл',
    modalDistribution: 'Тархац ба гарал үүсэл (Distribution)',
    modalViewOnPowo: 'POWO дээр харах',
    modalSave: 'Жагсаалтад хадгалах',
    modalSaved: 'Хадгалсан',
    modalZoomImage: 'Зураг томруулах',
    modalClosePreview: 'Зургийг хаах',
  },
  en: {
    eyebrow: 'Plants of the World Online (Kew) · Verified Botanical Database',
    title: 'Plant Information & POWO Catalog',
    subtitle:
      'Explore verified botanical records including scientific names, taxonomic families, lifeforms, native distributions, and field photography.',
    powoSource: 'POWO Source',
    savedBtn: (n: number) => `Saved (${n})`,
    clearFilters: 'Reset',
    searchSectionLabel: 'Search plants by name or family',
    searchLabel: 'Search by plant name or family',
    searchPlaceholder: 'Scientific name, common name, or family (e.g., Araceae, Pinus)...',
    familyLabel: 'Family',
    allFamilies: 'All families',
    lifeformLabel: 'Lifeform / Habit',
    allLifeforms: 'All lifeforms',
    zeroResults: 'Results: 0 species',
    showingRange: (s: number, e: number, t: number) =>
      `Showing ${s}–${e} of ${t} species`,
    pageIndicator: (c: number, t: number) => `Page ${c} / ${t}`,
    emptyTitle: 'No matching plants found',
    emptyDesc:
      'Try adjusting your search query, family filter, or lifeform selection.',
    emptyBtn: 'Clear filters',
    detailsBtn: 'Details →',
    viewImageAria: (name: string) => `Preview ${name} image`,
    viewDetailsAria: (name: string) => `View ${name} details`,
    prevPage: 'Previous',
    nextPage: 'Next',
    modalCloseAria: 'Close modal',
    modalRecordTitle: 'POWO Record Metadata',
    modalFamily: 'Family',
    modalCredit: 'Image Credit',
    modalAuthor: 'Taxonomic Author',
    modalLifeform: 'Lifeform / Habit',
    modalDescription: 'Botanical Overview',
    modalCare: 'Care & Growing Conditions',
    modalDistribution: 'Distribution & Native Range',
    modalViewOnPowo: 'View on POWO',
    modalSave: 'Save to list',
    modalSaved: 'Saved',
    modalZoomImage: 'Enlarge image',
    modalClosePreview: 'Close preview',
  },
} as const;
