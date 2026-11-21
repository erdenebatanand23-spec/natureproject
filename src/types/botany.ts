export enum ActiveSection {
  Home = 'home',
  Plants = 'plants',
  Products = 'products',
}

export interface PowoPlantImage {
  url: string;
  copyright: string;
}

export type PlantLanguage = 'mn' | 'en';

export interface PowoPlant {
  id: string;
  scientific_name: string;
  author: string;
  family: string;
  family_mn: string;
  common_name: string;
  common_name_mn: string;
  distribution: string;
  distribution_mn: string;
  lifeform: string;
  lifeform_mn: string;
  description_mn: string;
  description_en?: string;
  care_mn?: string;
  care_en?: string;
  images: PowoPlantImage[];
  powo_url: string;
  illustrationVariant:
    | 'conifer'
    | 'broadleaf'
    | 'fern'
    | 'succulent'
    | 'aquatic'
    | 'vine'
    | 'shrub';
  featured?: boolean;
}

export interface PowoCatalogFilterState {
  searchQuery: string;
  family: string;
  lifeform: string;
  onlySaved: boolean;
}

export enum ProductCategory {
  All = 'all',
  Sensors = 'sensors',
  Irrigation = 'irrigation',
  Lighting = 'lighting',
  Substrates = 'substrates',
  Hydroponics = 'hydroponics',
}

export interface ProductItem {
  id: string;
  nameMn: string;
  subtitleMn: string;
  category: Exclude<ProductCategory, ProductCategory.All>;
  priceMnt: number;
  inStock: boolean;
  stockLabelMn: string;
  imageUrl: string;
  shortDescriptionMn: string;
  specs: Array<{ label: string; value: string }>;
  benefitsMn: string[];
  featured?: boolean;
}

export interface CartItem {
  productId: string;
  quantity: number;
}
