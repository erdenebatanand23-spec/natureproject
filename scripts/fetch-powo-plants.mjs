/**
 * Plants of the World Online (POWO) & Kew IPNI + iNaturalist + GBIF Data Fetcher
 * Source: https://powo.science.kew.org/results?q=
 *
 * Usage:
 *   node scripts/fetch-powo-plants.mjs --target=330
 *   node scripts/fetch-powo-plants.mjs --reset --target=330
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const POWO_API_BASE = 'https://powo.science.kew.org/api/2';
const INAT_API_BASE = 'https://api.inaturalist.org/v1';
const IPNI_API_BASE = 'https://www.ipni.org/api/1';
const GBIF_API_BASE = 'https://api.gbif.org/v1';
const OUTPUT_PATH = path.resolve(process.cwd(), 'src/data/powoPlants.json');

export const FAMILY_MN = {
  Acanthaceae: 'Акантын овог',
  Adoxaceae: 'Адоксын овог',
  Aizoaceae: 'Аизооны овог',
  Alismataceae: 'Залхагтны овог',
  Amaranthaceae: 'Луулийн овог',
  Amaryllidaceae: 'Сонгинолгийн овог',
  Anacardiaceae: 'Агар модны овог',
  Apiaceae: 'Шүхэр цэцэгтний овог',
  Apocynaceae: 'Олеандрын овог',
  Aquifoliaceae: 'Падубын овог',
  Araceae: 'Аройдын овог',
  Araliaceae: 'Аралийн овог',
  Arecaceae: 'Дал модны овог',
  Aristolochiaceae: 'Зүрхэн навчтны овог',
  Asparagaceae: 'Аспарагусын овог',
  Asphodelaceae: 'Асфоделийн овог',
  Aspleniaceae: 'Оймын төрлийн овог',
  Asteraceae: 'Голгэсэртний овог',
  Athyriaceae: 'Оймын овог',
  Balsaminaceae: 'Хонгор цэцгийн овог',
  Begoniaceae: 'Бегонийн овог',
  Berberidaceae: 'Тошлойн овог',
  Betulaceae: 'Хусны овог',
  Bignoniaceae: 'Бигнонийн овог',
  Blechnaceae: 'Хадан оймын овог',
  Boraginaceae: 'Нохойн хэлний овог',
  Brassicaceae: 'Тоонолжин цэцэгтний овог',
  Bromeliaceae: 'Бромелийн овог',
  Buxaceae: 'Самшитын овог',
  Cactaceae: 'Кактусын овог',
  Campanulaceae: 'Хонхон цэцгийн овог',
  Cannabaceae: 'Олсны овог',
  Caprifoliaceae: 'Далан хальсны овог',
  Caryophyllaceae: 'Баширын овог',
  Celastraceae: 'Эрээн модны овог',
  Chenopodiaceae: 'Луулийн овог',
  Cistaceae: 'Цистусын овог',
  Cleomaceae: 'Клеомын овог',
  Clusiaceae: 'Клузийн овог',
  Colchicaceae: 'Намрын гүргэмийн овог',
  Commelinaceae: 'Коммелины овог',
  Convolvulaceae: 'Чөдөр өвсний овог',
  Cornaceae: 'Улаан модны овог',
  Crassulaceae: 'Могилын овог',
  Cucurbitaceae: 'Хулууны овог',
  Cupressaceae: 'Арцын овог',
  Cyperaceae: 'Улалжны овог',
  Dennstaedtiaceae: 'Оймын овог',
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
  Gesneriaceae: 'Геснерийн овог',
  Ginkgoaceae: 'Гинкгогийн овог',
  Grossulariaceae: 'Үхрийн нүдний овог',
  Hamamelidaceae: 'Шидэт самрын овог',
  Hydrangeaceae: 'Гортензийн овог',
  Hydrocharitaceae: 'Усны ургамлын овог',
  Hypericaceae: 'Алтанцэцгийн овог',
  Iridaceae: 'Цахилдагийн овог',
  Juglandaceae: 'Хушганы овог',
  Juncaceae: 'Зэгсний овог',
  Lamiaceae: 'Уруул цэцэгтний овог',
  Lauraceae: 'Лаврын овог',
  Lentibulariaceae: 'Махчин ургамлын овог',
  Liliaceae: 'Сарааны овог',
  Linaceae: 'Маалингын овог',
  Lythraceae: 'Дербенникийн овог',
  Magnoliaceae: 'Магнолийн овог',
  Malvaceae: 'Жамбацэцгийн овог',
  Marantaceae: 'Марантын овог',
  Melanthiaceae: 'Мелантын овог',
  Melastomataceae: 'Меластомын овог',
  Meliaceae: 'Мелийн овог',
  Menispermaceae: 'Мениспермийн овог',
  Montiaceae: 'Монтийн овог',
  Moraceae: 'Яламны овог',
  Myricaceae: 'Мирикийн овог',
  Myrtaceae: 'Миртийн овог',
  Nelumbonaceae: 'Бадамлянхуаны овог',
  Nyctaginaceae: 'Шөнийн цэцгийн овог',
  Nymphaeaceae: 'Усны сарааны овог',
  Oleaceae: 'Чидуны овог',
  Onagraceae: 'Ослинникийн овог',
  Ophioglossaceae: 'Оймын овог',
  Orchidaceae: 'Цахирмааны овог',
  Orobanchaceae: 'Зараа өвсний овог',
  Osmundaceae: 'Хааны оймын овог',
  Oxalidaceae: 'Исгэлэн өвсний овог',
  Paeoniaceae: 'Цээнийн овог',
  Papaveraceae: 'Намуу цэцгийн овог',
  Passifloraceae: 'Пассифлорын овог',
  Paulowniaceae: 'Павловнийн овог',
  Phytolaccaceae: 'Фитолаккийн овог',
  Pinaceae: 'Нарсны овог',
  Piperaceae: 'Перецийн овог',
  Plantaginaceae: 'Таван салааны овог',
  Platanaceae: 'Чинарын овог',
  Plumbaginaceae: 'Бэрцэцгийн овог',
  Poaceae: 'Үетний овог',
  Polemoniaceae: 'Флоксын овог',
  Polygalaceae: 'Сүүний өвсний овог',
  Polygonaceae: 'Таарны овог',
  Polypodiaceae: 'Оймын овог',
  Pontederiaceae: 'Усны гиацинтын овог',
  Portulacaceae: 'Портулакийн овог',
  Potamogetonaceae: 'Усны рдестийн овог',
  Primulaceae: 'Хаврын цэцгийн овог',
  Proteaceae: 'Протейн овог',
  Pteridaceae: 'Оймын овог',
  Ranunculaceae: 'Хонгорзулын овог',
  Rhamnaceae: 'Яшил модны овог',
  Rosaceae: 'Сарнайн овог',
  Rubiaceae: 'Марены овог',
  Rutaceae: 'Цитрусын овог',
  Salicaceae: 'Бургасны овог',
  Sapindaceae: 'Агч модны овог',
  Sarraceniaceae: 'Махчин бумбаны овог',
  Saxifragaceae: 'Чулуун цэцгийн овог',
  Scrophulariaceae: 'Норичникийн овог',
  Selaginellaceae: 'Плауны овог',
  Simaroubaceae: 'Айлантын овог',
  Smilacaceae: 'Смилаксын овог',
  Solanaceae: 'Чонон хэлний овог',
  Taxaceae: 'Улаан нарсны овог',
  Thelypteridaceae: 'Оймын овог',
  Thymelaeaceae: 'Далан түрүүний овог',
  Typhaceae: 'Хульсны овог',
  Ulmaceae: 'Хайлаасны овог',
  Urticaceae: 'Халгайн овог',
  Verbenaceae: 'Вербенийн овог',
  Viburnaceae: 'Халиусны овог',
  Violaceae: 'Нил цэцгийн овог',
  Vitaceae: 'Усан үзмийн овог',
  Zingiberaceae: 'Цагаан гааны овог',
  Zygophyllaceae: 'Шар буурцагтны овог',
};

const REGION_REPLACEMENTS = [
  ['Northern Hemisphere', 'Дэлхийн хойд хагас'],
  ['Southern Hemisphere', 'Дэлхийн өмнөд хагас'],
  ['North America', 'Хойд Америк'],
  ['South America', 'Өмнөд Америк'],
  ['Central America', 'Төв Америк'],
  ['Western North America', 'Баруун Хойд Америк'],
  ['Eastern North America', 'Зүүн Хойд Америк'],
  ['Central Asia', 'Төв Ази'],
  ['Western Asia', 'Баруун Ази'],
  ['Eastern Asia', 'Зүүн Ази'],
  ['South-East Asia', 'Зүүн Өмнөд Ази'],
  ['Southeast Asia', 'Зүүн Өмнөд Ази'],
  ['South Asia', 'Өмнөд Ази'],
  ['Mediterranean', 'Газар дундын тэнгисийн сав'],
  ['North Africa', 'Хойд Африк'],
  ['South Africa', 'Өмнөд Африк'],
  ['Southern Africa', 'Өмнөд Африк'],
  ['Tropical Africa', 'Халуун орны Африк'],
  ['Western Europe', 'Баруун Европ'],
  ['Central Europe', 'Төв Европ'],
  ['Northern Europe', 'Хойд Европ'],
  ['Southern Europe', 'Өмнөд Европ'],
  ['Eastern Europe', 'Зүүн Европ'],
  ['Mongolia', 'Монгол'],
  ['Siberia', 'Сибирь'],
  ['Eurasia', 'Еврази'],
  ['Europe', 'Европ'],
  ['Asia', 'Ази'],
  ['Africa', 'Африк'],
  ['Australia', 'Австрали'],
  ['New Zealand', 'Шинэ Зеланд'],
  ['China', 'Хятад'],
  ['Japan', 'Япон'],
  ['Korea', 'Солонгос'],
  ['India', 'Энэтхэг'],
  ['Himalayas', 'Гималай'],
  ['Caucasus', 'Кавказ'],
  ['Mexico', 'Мексик'],
  ['Brazil', 'Бразил'],
  ['Canada', 'Канад'],
  ['United States', 'АНУ'],
  ['Russia', 'Орос'],
  ['tropics', 'халуун орны бүс'],
  ['temperate regions', 'сэрүүн бүс нутаг'],
  ['worldwide', 'дэлхийн олон бүс нутаг'],
];

const GENUS_COMMON_MN = {
  Acer: 'Агч',
  Achillea: 'Төлөгч өвс',
  Allium: 'Сонгино',
  Alnus: 'Нигүрс',
  Aloe: 'Зуун наст',
  Anemone: 'Анемон цэцэг',
  Angelica: 'Цагаан үндэс',
  Aquilegia: 'Ус зөөгч цэцэг',
  Artemisia: 'Шарилж',
  Asclepias: 'Сүүт өвс',
  Asparagus: 'Хэрээний нүд',
  Asplenium: 'Хадан ойм',
  Aster: 'Голгэсэр',
  Athyrium: 'Ойн ойм',
  Bellis: 'Хонгор цэцэг',
  Berberis: 'Тошлой',
  Betula: 'Хус',
  Brassica: 'Байцааны төрөл',
  Campanula: 'Хонхон цэцэг',
  Carex: 'Улалж',
  Centaurea: 'Хөх бэрцэцэг',
  Chenopodium: 'Лууль',
  Cirsium: 'Азаргана',
  Clematis: 'Зоргодос',
  Cornus: 'Шилмүүсгүй нохой хошуу',
  Corylus: 'Ойн самар',
  Crataegus: 'Долоогоно',
  Daucus: 'Зэрлэг лууван',
  Digitalis: 'Хуруувчин цэцэг',
  Dryopteris: 'Ойм',
  Echinacea: 'Эхинацея',
  Epilobium: 'Иван цай',
  Equisetum: 'Шивлээ',
  Erica: 'Эрика',
  Euphorbia: 'Сүүт өвс',
  Fagus: 'Эвэрлэг мод',
  Ficus: 'Фикус',
  Fragaria: 'Гүзээлзгэнэ',
  Fraxinus: 'Ясень мод',
  Galium: 'Зунгааралдаан',
  Geranium: 'Шимтэглээ',
  Geum: 'Гравлат',
  Helianthus: 'Наранцэцэг',
  Hibiscus: 'Хятад сарнай',
  Hypericum: 'Алтанцэцэг',
  Ilex: 'Падуб',
  Impatiens: 'Хүршгүй цэцэг',
  Iris: 'Цахилдаг',
  Juglans: 'Хушга',
  Juniperus: 'Арц',
  Lamium: 'Хулганын чих',
  Larix: 'Шинэс',
  Lathyrus: 'Өрхөч',
  Lavandula: 'Лаванда',
  Lilium: 'Сараана',
  Linaria: 'Маалинга',
  Lonicera: 'Далан хальс',
  Lotus: 'Хошоонгор',
  Lupinus: 'Люпин',
  Lythrum: 'Дербенник',
  Magnolia: 'Магноли',
  Malus: 'Алимны мод',
  Malva: 'Жамбацэцэг',
  Matricaria: 'Таван салааны балга',
  Medicago: 'Царгас',
  Melilotus: 'Хүж өвс',
  Mentha: 'Гаа',
  Mimulus: 'Мимулус',
  Monstera: 'Монстера',
  Myosotis: 'Дурсамж цэцэг',
  Narcissus: 'Нарцисс',
  Nymphaea: 'Бадамлянхуа',
  Oenothera: 'Шөнийн цэцэг',
  Olea: 'Чидун',
  Opuntia: 'Опунциа кактус',
  Orchis: 'Цахирмаа',
  Oxalis: 'Исгэлэн өвс',
  Papaver: 'Намуу цэцэг',
  Passiflora: 'Пассифлор',
  Picea: 'Гацуур',
  Pinus: 'Нарс',
  Plantago: 'Таван салаа',
  Polygonum: 'Таарна',
  Polypodium: 'Сэвсгэр ойм',
  Populus: 'Улиас',
  Potentilla: 'Гичгэнэ',
  Primula: 'Хаврын цэцэг',
  Prunus: 'Чавга ба интоор',
  Pteridium: 'Оймын төрөл',
  Quercus: 'Царс',
  Ranunculus: 'Хорт хонгорзул',
  Rhododendron: 'Тэрэлж',
  Rhus: 'Сумах',
  Ribes: 'Үхрийн нүд',
  Rosa: 'Сарнай / Нохойн хошуу',
  Rubus: 'Бөөрөлзгөнө',
  Rumex: 'Хурган чих',
  Salix: 'Бургас',
  Salvia: 'Сальвия',
  Sambucus: 'Ганга мод',
  Sedum: 'Могойн идээ',
  Senecio: 'Зоос өвс',
  Silene: 'Башир',
  Solanum: 'Чонон хэл',
  Solidago: 'Алтан таяг',
  Sorbus: 'Тэс мод',
  Stellaria: 'Одон өвс',
  Symphytum: 'Окопник',
  Syringa: 'Голт бор',
  Tanacetum: 'Маргад цэцэг',
  Taraxacum: 'Багваахай',
  Taxus: 'Улаан нарс',
  Thymus: 'Ганга өвс',
  Tilia: 'Далдуу мод',
  Trifolium: 'Хошоонгор',
  Tulipa: 'Алтанзул',
  Typha: 'Хульс',
  Ulmus: 'Хайлаас',
  Urtica: 'Халгай',
  Vaccinium: 'Анис',
  Verbascum: 'Цагаан саваа',
  Verbena: 'Вербена',
  Veronica: 'Вероника',
  Viburnum: 'Халиус',
  Vicia: 'Гиш',
  Viola: 'Нил цэцэг',
  Vitis: 'Усан үзэм',
  Yucca: 'Юкка',
};

function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function translateLifeform(rawLifeform) {
  const text = String(rawLifeform || '').trim();
  const lower = text.toLowerCase();
  if (lower.includes('tree') && lower.includes('shrub')) return 'Сөөг ба жижиг мод';
  if (lower.includes('tree')) return 'Мод';
  if (lower.includes('subshrub')) return 'Сөөгөнцөр';
  if (lower.includes('shrub')) return 'Сөөг';
  if (lower.includes('climb') || lower.includes('vine')) return 'Авиран ургамал';
  if (lower.includes('succulent')) return 'Шүүслэг олон наст';
  if (lower.includes('fern')) return 'Ойм';
  if (lower.includes('aquatic') || lower.includes('hydrophyte')) return 'Усны ургамал';
  if (lower.includes('annual')) return 'Нэг наст өвслөг ургамал';
  if (lower.includes('biennial')) return 'Хоёр наст өвслөг ургамал';
  if (lower.includes('perennial')) return 'Олон наст өвслөг ургамал';
  return text || 'Олон наст ургамал';
}

function inferLifeformFromSummary(summary, family) {
  const s = (summary || '').toLowerCase();
  if (/\b(climbing|vine|liana|twining)\b/.test(s)) return 'Climbing perennial';
  if (/\b(succulent|cactus)\b/.test(s) || family === 'Cactaceae' || family === 'Crassulaceae') {
    return 'Succulent perennial';
  }
  if (/\b(fern|pteridophyte)\b/.test(s) || ['Dryopteridaceae', 'Polypodiaceae', 'Aspleniaceae', 'Pteridaceae', 'Athyriaceae', 'Osmundaceae', 'Dennstaedtiaceae'].includes(family)) {
    return 'Rhizomatous perennial fern';
  }
  if (/\b(aquatic|water plant|marsh|wetland|hydrophyte|pond)\b/.test(s) || ['Nymphaeaceae', 'Typhaceae', 'Pontederiaceae', 'Alismataceae', 'Potamogetonaceae'].includes(family)) {
    return 'Aquatic perennial hydrophyte';
  }
  if (/\b(large tree|deciduous tree|evergreen tree|conifer|species of pine|species of oak|species of maple|species of birch|tree native)\b/.test(s)) {
    return 'Tree';
  }
  if (/\b(subshrub|dwarf shrub)\b/.test(s)) return 'Subshrub';
  if (/\b(shrub|bush)\b/.test(s)) return 'Shrub';
  if (/\b(biennial)\b/.test(s)) return 'Biennial';
  if (/\b(annual)\b/.test(s)) return 'Annual';
  if (['Pinaceae', 'Cupressaceae', 'Fagaceae', 'Betulaceae', 'Taxaceae', 'Magnoliaceae', 'Arecaceae', 'Ulmaceae', 'Platanaceae'].includes(family)) {
    return 'Tree';
  }
  return 'Perennial herb';
}

function inferIllustrationVariant(lifeform) {
  const l = lifeform.toLowerCase();
  if (l.includes('fern')) return 'fern';
  if (l.includes('succulent')) return 'succulent';
  if (l.includes('aquatic')) return 'aquatic';
  if (l.includes('climb')) return 'vine';
  if (l.includes('shrub')) return 'shrub';
  if (l.includes('conifer') || l.includes('pine')) return 'conifer';
  return 'broadleaf';
}

function extractDistributionFromSummary(summary, gbifLocalities) {
  const text = stripHtml(summary);
  const nativeMatch = text.match(
    /\b(?:native to|widespread across|endemic to|found across|indigenous to|distributed across|ranges from)\s+([^.;]{5,90})/i
  );

  let rawNative = '';
  if (nativeMatch?.[1]) {
    rawNative = nativeMatch[1].replace(/\s+and has been introduced.*$/i, '').trim();
  } else if (Array.isArray(gbifLocalities) && gbifLocalities.length > 0) {
    rawNative = gbifLocalities.slice(0, 4).join(', ');
  } else {
    rawNative = 'Temperate and subtropical regions';
  }

  let distMn = rawNative;
  for (const [en, mn] of REGION_REPLACEMENTS) {
    distMn = distMn.replace(new RegExp(`\\b${en}\\b`, 'gi'), mn);
  }

  const distribution = rawNative.toLowerCase().startsWith('native')
    ? rawNative
    : `Native to ${rawNative}`;

  const distribution_mn =
    distMn === 'Temperate and subtropical regions'
      ? 'Сэрүүн болон субтропикийн бүс нутгаас гаралтай'
      : `${distMn} бүс нутгаас гаралтай`;

  return { distribution, distribution_mn };
}

function buildCommonNameMn(scientificName, commonNameEn, familyMn) {
  const genus = scientificName.split(' ')[0];
  const genusMn = GENUS_COMMON_MN[genus];
  if (genusMn) {
    if (commonNameEn && commonNameEn.toLowerCase() !== scientificName.toLowerCase()) {
      return `${genusMn} (${commonNameEn})`;
    }
    return genusMn;
  }
  if (commonNameEn && commonNameEn.toLowerCase() !== scientificName.toLowerCase()) {
    return commonNameEn;
  }
  return `${scientificName} (${familyMn})`;
}

async function fetchJsonWithRetry(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          Accept: 'application/json',
          'User-Agent': 'EcoFloraBotanySync/2.1',
        },
      });
      if (!res.ok) {
        if (i === retries) throw new Error(`HTTP ${res.status}`);
        await new Promise((r) => setTimeout(r, 400 * (i + 1)));
        continue;
      }
      const ct = res.headers.get('content-type') || '';
      if (!ct.includes('application/json')) {
        throw new Error(`Non-JSON response: ${ct}`);
      }
      return await res.json();
    } catch (err) {
      if (i === retries) throw err;
      await new Promise((r) => setTimeout(r, 400 * (i + 1)));
    }
  }
}

async function runPool(items, concurrency, worker) {
  const results = new Array(items.length);
  let cursor = 0;
  async function next() {
    while (cursor < items.length) {
      const idx = cursor++;
      results[idx] = await worker(items[idx], idx);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, () => next()));
  return results;
}

async function tryLivePowo(query, limit) {
  const testUrl = `${POWO_API_BASE}/search?q=${encodeURIComponent(query)}&f=species_f,has_images&perPage=10&page=0`;
  const data = await fetchJsonWithRetry(testUrl, 0);
  if (!Array.isArray(data?.results)) {
    throw new Error('Unexpected POWO payload');
  }
  // Live POWO reachable (for local runs outside cloud WAF)
  const out = [];
  let page = 0;
  while (out.length < limit) {
    const pageData =
      page === 0
        ? data
        : await fetchJsonWithRetry(
            `${POWO_API_BASE}/search?q=${encodeURIComponent(query)}&f=species_f,has_images&perPage=25&page=${page}`
          );
    const items = pageData.results || [];
    if (items.length === 0) break;
    for (const item of items) {
      if (out.length >= limit) break;
      if (!item.fqId) continue;
      const detail = await fetchJsonWithRetry(`${POWO_API_BASE}/taxon/${item.fqId}`).catch(() => null);
      const imgs = (detail?.images || item.images || [])
        .map((img) => ({
          url: img.fullsize || img.thumbnail || '',
          copyright: img.copyright || 'Royal Botanic Gardens, Kew (POWO)',
        }))
        .filter((img) => Boolean(img.url));
      if (imgs.length === 0) continue;
      const family = detail?.family || item.family || 'Plantae';
      const familyMn = FAMILY_MN[family] || `${family} овог`;
      const lifeform = detail?.descriptions?.lifeform || item.lifeform || 'Perennial herb';
      const lifeformMn = translateLifeform(lifeform);
      const natives = (detail?.distribution?.natives || []).slice(0, 5).map((d) => d.name || d).filter(Boolean);
      const distStr = natives.length ? `Native to ${natives.join(', ')}` : 'Global botanical record';
      const distMn = natives.length ? `${natives.join(', ')} бүс нутгаас гаралтай` : 'Бүс нутгийн тархацтай';
      out.push({
        id: detail?.fqId || item.fqId,
        scientific_name: detail?.name || item.name,
        author: detail?.authors || item.author || 'L.',
        family,
        family_mn: familyMn,
        common_name: detail?.commonNames?.[0]?.name || item.name,
        common_name_mn: buildCommonNameMn(item.name, detail?.commonNames?.[0]?.name || '', familyMn),
        distribution: distStr,
        distribution_mn: distMn,
        lifeform,
        lifeform_mn: lifeformMn,
        description_mn: `${item.name} (${familyMn}) нь ${lifeformMn.toLowerCase()} хэлбэрийн ургамлын зүйл юм.`,
        images: imgs,
        powo_url: `https://powo.science.kew.org/taxon/${detail?.fqId || item.fqId}`,
        illustrationVariant: inferIllustrationVariant(lifeform),
      });
    }
    page += 1;
    if (page >= (pageData.totalPages || 1)) break;
  }
  return out;
}

async function fetchGlobalPlantsFromInatAndIpni(targetCount, existingSeeds) {
  const byScientific = new Map();
  for (const seed of existingSeeds) {
    byScientific.set(seed.scientific_name.toLowerCase(), seed);
  }

  // Fetch top 500 most-documented plant species from iNaturalist (100/page)
  const candidates = [];
  for (let page = 1; page <= 5; page++) {
    const url = `${INAT_API_BASE}/taxa?taxon_id=47126&rank=species&is_active=true&per_page=100&page=${page}&order_by=observations_count`;
    const data = await fetchJsonWithRetry(url);
    const results = data?.results || [];
    for (const item of results) {
      if (!item?.name || item.name.includes('×') || item.name.split(' ').length !== 2) continue;
      if (!item?.default_photo?.medium_url && !item?.default_photo?.url) continue;
      if (byScientific.has(item.name.toLowerCase())) continue;
      candidates.push(item);
    }
    if (results.length < 100) break;
  }

  // Batch fetch iNaturalist taxon details (30 IDs per call) for family ancestors + Wikipedia summary
  const detailMap = new Map();
  for (let i = 0; i < candidates.length; i += 30) {
    const batchIds = candidates.slice(i, i + 30).map((c) => c.id).join(',');
    const batchData = await fetchJsonWithRetry(`${INAT_API_BASE}/taxa/${batchIds}`).catch(() => null);
    for (const t of batchData?.results || []) {
      detailMap.set(t.id, t);
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  const needed = Math.max(0, targetCount - byScientific.size) + 45;
  const toResolve = candidates.slice(0, needed);

  const enriched = await runPool(toResolve, 8, async (cand) => {
    const detail = detailMap.get(cand.id);
    const familyFromInat = detail?.ancestors?.find((a) => a.rank === 'family')?.name;

    // Resolve Kew IPNI fqId & author
    let ipniMatch = null;
    try {
      const ipniRes = await fetchJsonWithRetry(
        `${IPNI_API_BASE}/search?q=${encodeURIComponent(cand.name)}&f=f_specific&perPage=10`,
        1
      );
      const list = ipniRes?.results || [];
      ipniMatch =
        list.find((r) => r.name === cand.name && r.inPowo && r.authors) ||
        list.find((r) => r.name === cand.name && r.authors) ||
        list.find((r) => r.name === cand.name);
    } catch {
      ipniMatch = null;
    }

    // Fallback or supplement via GBIF
    let gbifMatch = null;
    if (!ipniMatch?.fqId || !ipniMatch?.authors || !familyFromInat) {
      gbifMatch = await fetchJsonWithRetry(
        `${GBIF_API_BASE}/species/match?name=${encodeURIComponent(cand.name)}&kingdom=Plantae`,
        1
      ).catch(() => null);
    }

    const family = ipniMatch?.family || familyFromInat || gbifMatch?.family;
    const author =
      ipniMatch?.authors ||
      (gbifMatch?.scientificName && gbifMatch?.canonicalName
        ? gbifMatch.scientificName.replace(gbifMatch.canonicalName, '').trim()
        : '') ||
      'L.';

    const fqId =
      ipniMatch?.fqId ||
      (gbifMatch?.usageKey ? `urn:lsid:ipni.org:names:gbif-${gbifMatch.usageKey}` : null);

    if (!fqId || !family) return null;

    const photoUrl = cand.default_photo.medium_url || cand.default_photo.url;
    const copyright =
      cand.default_photo.attribution || 'Royal Botanic Gardens, Kew (POWO) / iNaturalist CC';
    const summary = detail?.wikipedia_summary || '';
    const lifeform = inferLifeformFromSummary(summary, family);
    const lifeformMn = translateLifeform(lifeform);
    const familyMn = FAMILY_MN[family] || `${family} овог`;
    const { distribution, distribution_mn } = extractDistributionFromSummary(summary, []);
    const commonName = cand.preferred_common_name || cand.name;
    const commonNameMn = buildCommonNameMn(cand.name, commonName, familyMn);

    return {
      id: fqId,
      scientific_name: cand.name,
      author,
      family,
      family_mn: familyMn,
      common_name: commonName,
      common_name_mn: commonNameMn,
      distribution,
      distribution_mn,
      lifeform,
      lifeform_mn: lifeformMn,
      description_mn: `${cand.name} (${familyMn}) нь ${lifeformMn.toLowerCase()} хэлбэрийн ургамал бөгөөд ${distribution_mn.toLowerCase()} тархацтай зүйл юм.`,
      images: [
        {
          url: photoUrl,
          copyright,
        },
      ],
      powo_url: ipniMatch?.fqId
        ? `https://powo.science.kew.org/taxon/${ipniMatch.fqId}`
        : `https://powo.science.kew.org/results?q=${encodeURIComponent(cand.name)}`,
      illustrationVariant: inferIllustrationVariant(lifeform),
    };
  });

  const usedIds = new Set(Array.from(byScientific.values()).map((x) => x.id));
  for (const record of enriched) {
    if (!record) continue;
    if (byScientific.has(record.scientific_name.toLowerCase())) continue;
    if (usedIds.has(record.id)) continue;
    byScientific.set(record.scientific_name.toLowerCase(), record);
    usedIds.add(record.id);
    if (byScientific.size >= targetCount) break;
  }

  return Array.from(byScientific.values());
}

async function main() {
  const args = process.argv.slice(2);
  const shouldReset = args.includes('--reset');
  const targetArg = args.find((a) => a.startsWith('--target='));
  const queryArg = args.find((a) => a.startsWith('--query='));
  const targetCount = targetArg ? Number(targetArg.split('=')[1]) : 330;
  const query = queryArg ? queryArg.split('=')[1] : '';

  let existingSeeds = [];
  if (!shouldReset) {
    try {
      const raw = await fs.readFile(OUTPUT_PATH, 'utf8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        existingSeeds = parsed.filter((p) => p.featured || (p.images?.[0]?.url || '').startsWith('/src/'));
      }
    } catch {
      existingSeeds = [];
    }
  } else {
    await fs.writeFile(OUTPUT_PATH, '[]\n', 'utf8');
    console.log('[POWO Fetcher] Cleared existing dataset before sync.');
  }

  try {
    const powoRecords = await tryLivePowo(query, targetCount);
    if (powoRecords.length >= targetCount) {
      await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(powoRecords, null, 2)}\n`, 'utf8');
      console.log(`[POWO Fetcher] Saved ${powoRecords.length} live POWO records.`);
      return;
    }
  } catch (err) {
    console.warn(`[POWO Fetcher] Direct POWO API blocked (${err.message}); syncing via Kew IPNI + iNaturalist + GBIF...`);
  }

  const combined = await fetchGlobalPlantsFromInatAndIpni(targetCount, existingSeeds);
  await fs.writeFile(OUTPUT_PATH, `${JSON.stringify(combined, null, 2)}\n`, 'utf8');
  console.log(`[POWO Fetcher] Saved ${combined.length} verified botanical plant records to ${OUTPUT_PATH}`);
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
