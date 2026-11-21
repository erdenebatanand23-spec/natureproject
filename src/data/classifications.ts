import { ProductCategory } from '../types/botany';

export const PRODUCT_CATEGORY_LABELS: Record<ProductCategory, string> = {
  [ProductCategory.All]: 'Бүх бүтээгдэхүүн',
  [ProductCategory.Sensors]: 'Мэдрэгч ба IoT',
  [ProductCategory.Irrigation]: 'Автомат усалгаа',
  [ProductCategory.Lighting]: 'Гэрэлтүүлэг',
  [ProductCategory.Substrates]: 'Био-бордоо ба хөрс',
  [ProductCategory.Hydroponics]: 'Гидропоник систем',
};
