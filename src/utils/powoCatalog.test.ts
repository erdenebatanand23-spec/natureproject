import test from 'node:test';
import assert from 'node:assert/strict';
import { PLANTS_DATA } from '../data/plants';
import { PRODUCTS_DATA } from '../data/products';
import {
  DEFAULT_POWO_CATALOG_FILTERS,
  filterPowoPlants,
  getLocalizedPlantFields,
  getPaginationRange,
  normalizeAndFilterRawPowo,
  paginatePlants,
  PLANT_UI_COPY,
  translateDistributionToMn,
  translateFamilyToMn,
  translateLifeformToMn,
} from './powoCatalog';
import {
  addToCart,
  formatMntPrice,
  getCartSubtotal,
  getCartTotalCount,
  updateCartQuantity,
} from './cart';

test('PLANTS_DATA contains at least 300 verified plant entries with unique IDs and required fields', () => {
  assert.ok(
    PLANTS_DATA.length >= 300,
    `Expected at least 300 plants, found ${PLANTS_DATA.length}`
  );
  const uniqueIds = new Set(PLANTS_DATA.map((p) => p.id));
  assert.equal(uniqueIds.size, PLANTS_DATA.length);
  for (const plant of PLANTS_DATA) {
    assert.ok(plant.id.startsWith('urn:lsid:ipni.org:names:'));
    assert.ok(plant.scientific_name.length > 0);
    assert.ok(plant.author.length > 0);
    assert.ok(plant.family.length > 0);
    assert.ok(plant.distribution.length > 0);
    assert.ok(plant.lifeform.length > 0);
    assert.ok(plant.images.length > 0 && plant.images[0].url.length > 0);
    assert.ok(plant.powo_url.startsWith('https://powo.science.kew.org/'));
  }
});

test('filterPowoPlants searches by Latin name, family, and common name', () => {
  const byFamily = filterPowoPlants(PLANTS_DATA, {
    ...DEFAULT_POWO_CATALOG_FILTERS,
    searchQuery: 'Araceae',
  });
  assert.ok(byFamily.length >= 3);
  assert.ok(byFamily.every((p) => p.family === 'Araceae'));

  const bySpecies = filterPowoPlants(PLANTS_DATA, {
    ...DEFAULT_POWO_CATALOG_FILTERS,
    searchQuery: 'Pinus sibirica',
  });
  assert.equal(bySpecies.length, 1);
  assert.equal(bySpecies[0].family, 'Pinaceae');
});

test('paginatePlants slices results and getPaginationRange stays compact for 30+ pages', () => {
  const page1 = paginatePlants(PLANTS_DATA, 1, 9);
  assert.equal(page1.items.length, 9);
  assert.equal(page1.currentPage, 1);
  assert.equal(page1.startIndex, 1);
  assert.equal(page1.endIndex, 9);
  assert.equal(page1.totalPages, Math.ceil(PLANTS_DATA.length / 9));

  const lastPage = paginatePlants(PLANTS_DATA, page1.totalPages, 9);
  assert.ok(lastPage.items.length > 0);
  assert.equal(lastPage.endIndex, PLANTS_DATA.length);

  const range = getPaginationRange(18, 37);
  assert.deepEqual(range, [1, 'ellipsis', 17, 18, 19, 'ellipsis', 37]);
});

test('normalizeAndFilterRawPowo skips entries missing images', () => {
  const cleaned = normalizeAndFilterRawPowo([
    { id: '1', scientific_name: 'Valid plant', images: [{ url: '/img.jpg' }] },
    { id: '2', scientific_name: 'No image', images: [] },
    { id: '3', scientific_name: 'Empty url', images: [{ url: '' }] },
  ]);
  assert.equal(cleaned.length, 1);
  assert.equal(cleaned[0].id, '1');
});

test('Mongolian botanical translators convert family, lifeform, and distribution', () => {
  assert.equal(translateFamilyToMn('Pinaceae'), 'Нарсны овог');
  assert.equal(translateLifeformToMn('Shrub'), 'Сөөг');
  assert.ok(
    translateDistributionToMn('Native to Mongolia, Siberia').includes('Монгол')
  );
});

test('cart calculations work accurately alongside POWO catalog', () => {
  let cart = addToCart([], 'soil-sense-pro');
  cart = addToCart(cart, 'myco-bio-substrate');
  assert.equal(getCartTotalCount(cart), 2);
  assert.equal(getCartSubtotal(cart, PRODUCTS_DATA), 148000 + 42000);
  cart = updateCartQuantity(cart, 'soil-sense-pro', 0);
  assert.equal(getCartTotalCount(cart), 1);
  assert.equal(formatMntPrice(42000), '42,000 ₮');
});

test('getLocalizedPlantFields supports MN/EN switching and falls back cleanly when MN is missing', () => {
  const sample = PLANTS_DATA[1]; // Pinus sibirica
  const mn = getLocalizedPlantFields(sample, 'mn');
  const en = getLocalizedPlantFields(sample, 'en');

  assert.equal(mn.family, 'Нарсны овог');
  assert.equal(en.family, 'Pinaceae');
  assert.equal(en.commonName, 'Siberian Pine');
  assert.ok(en.description.includes('Pinus sibirica'));
  assert.ok(en.care.length > 10);

  const partial = {
    ...sample,
    family_mn: '',
    common_name_mn: '',
    lifeform_mn: '',
    distribution_mn: '',
    description_mn: '',
  };
  const fallbackMn = getLocalizedPlantFields(partial, 'mn');
  assert.equal(fallbackMn.family, sample.family);
  assert.equal(fallbackMn.commonName, sample.common_name);
  assert.equal(fallbackMn.lifeform, sample.lifeform);
  assert.equal(fallbackMn.distribution, sample.distribution);
  assert.ok(fallbackMn.description.includes('Pinus sibirica'));

  assert.equal(PLANT_UI_COPY.mn.detailsBtn, 'Дэлгэрэнгүй →');
  assert.equal(PLANT_UI_COPY.en.detailsBtn, 'Details →');
});
