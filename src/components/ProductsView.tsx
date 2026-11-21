import React, { useMemo, useState } from 'react';
import { Check, Search, ShoppingBag } from 'lucide-react';
import { PRODUCT_CATEGORY_LABELS } from '../data/classifications';
import { ProductCategory, ProductItem } from '../types/botany';
import { formatMntPrice } from '../utils/cart';

interface ProductsViewProps {
  products: ProductItem[];
  onAddToCart: (productId: string) => void;
  onSelectProduct: (product: ProductItem) => void;
}

const CATEGORIES = Object.values(ProductCategory);

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  onAddToCart,
  onSelectProduct,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(
    ProductCategory.All
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = products.filter((item) => {
      if (selectedCategory !== ProductCategory.All && item.category !== selectedCategory) {
        return false;
      }
      if (q) {
        const text = `${item.nameMn} ${item.subtitleMn} ${item.shortDescriptionMn}`.toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });

    if (sortOrder === 'price-asc') {
      return [...list].sort((a, b) => a.priceMnt - b.priceMnt);
    }
    if (sortOrder === 'price-desc') {
      return [...list].sort((a, b) => b.priceMnt - a.priceMnt);
    }
    return list;
  }, [products, selectedCategory, searchQuery, sortOrder]);

  const handleAdd = (productId: string) => {
    onAddToCart(productId);
    setRecentlyAddedId(productId);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === productId ? null : prev));
    }, 1200);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#215b63]/12 pb-6">
        <div className="space-y-2 max-w-3xl">
          <p className="text-xs font-medium text-[#215b63]/70">
            Ургамал ба ухаалаг технологийн шийдэл
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#215b63]">
            Бүтээгдэхүүний каталог
          </h1>
          <p className="text-sm sm:text-base text-[#142B2E]/75 leading-relaxed">
            Ургамлын чийгшил, гэрэлтүүлэг, хөрсний шим тэжээл болон бичил уур
            амьсгалыг нарийвчлалтай удирдах эко-технологийн төхөөрөмжүүд.
          </p>
        </div>

        <p className="text-xs font-medium text-[#215b63]/75 tabular-nums shrink-0">
          Нийт {filteredProducts.length} бүтээгдэхүүн
        </p>
      </div>

      {/* Category Filter Tabs + Search + Sort */}
      <div className="rounded-2xl bg-white border border-[#215b63]/12 p-4 sm:p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div
          role="group"
          aria-label="Бүтээгдэхүүний ангилал"
          className="flex flex-wrap items-center gap-1.5"
        >
          {CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-[#215b63] text-white'
                    : 'bg-[#F8FAF9] text-[#215b63]/75 hover:text-[#215b63]'
                }`}
              >
                {PRODUCT_CATEGORY_LABELS[category]}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="relative">
            <Search
              className="w-4 h-4 text-[#215b63]/50 absolute left-3 top-1/2 -translate-y-1/2"
              aria-hidden="true"
            />
            <input
              type="text"
              aria-label="Бүтээгдэхүүн хайх"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Бүтээгдэхүүн хайх..."
              className="w-full sm:w-56 pl-9 pr-3 py-2 rounded-xl bg-[#F8FAF9] border border-[#215b63]/15 text-sm text-[#142B2E] placeholder:text-[#142B2E]/45 focus:outline-none focus:border-[#67c090]"
            />
          </div>

          <select
            aria-label="Эрэмбэлэх"
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value as 'featured' | 'price-asc' | 'price-desc'
              )
            }
            className="px-3 py-2 rounded-xl bg-[#F8FAF9] border border-[#215b63]/15 text-sm text-[#142B2E] focus:outline-none focus:border-[#67c090]"
          >
            <option value="featured">Онцлох эрэмбээр</option>
            <option value="price-asc">Үнэ: Багаас их рүү</option>
            <option value="price-desc">Үнэ: Ихээс бага руу</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="rounded-2xl bg-white border border-[#215b63]/12 p-12 text-center space-y-3">
          <ShoppingBag
            className="w-9 h-9 text-[#67c090] mx-auto"
            aria-hidden="true"
          />
          <p className="text-base font-semibold text-[#215b63]">
            Тохирох бүтээгдэхүүн олдсонгүй
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory(ProductCategory.All);
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-lg bg-[#215b63] text-white text-xs font-semibold"
          >
            Бүх бүтээгдэхүүн харах
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const added = recentlyAddedId === product.id;
            return (
              <article
                key={product.id}
                className="group rounded-2xl bg-white border border-[#215b63]/12 overflow-hidden flex flex-col justify-between hover:border-[#67c090] transition-colors"
              >
                <div>
                  <button
                    type="button"
                    onClick={() => onSelectProduct(product)}
                    className="block w-full text-left focus-visible:outline-none"
                    aria-label={`${product.nameMn} дэлгэрэнгүй үзэх`}
                  >
                    <div className="aspect-[4/3] bg-[#F1F5F3] overflow-hidden">
                      <img
                        src={product.imageUrl}
                        alt={product.nameMn}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </button>

                  <div className="p-6 space-y-4">
                    <div>
                      <p className="text-xs text-[#215b63]/70">
                        {PRODUCT_CATEGORY_LABELS[product.category]} ·{' '}
                        {product.stockLabelMn}
                      </p>
                      <h2 className="text-lg font-bold text-[#142B2E] mt-1">
                        {product.nameMn}
                      </h2>
                      <p className="text-xs text-[#215b63]/75 mt-0.5">
                        {product.subtitleMn}
                      </p>
                    </div>

                    <p className="text-sm text-[#142B2E]/75 leading-relaxed line-clamp-2">
                      {product.shortDescriptionMn}
                    </p>

                    <dl className="grid grid-cols-2 gap-2 pt-3 border-t border-[#215b63]/8">
                      {product.specs.slice(0, 4).map((spec) => (
                        <div key={spec.label} className="bg-[#F8FAF9] rounded-lg px-2.5 py-2">
                          <dt className="text-[11px] text-[#215b63]/65">
                            {spec.label}
                          </dt>
                          <dd className="text-xs font-medium text-[#142B2E] truncate">
                            {spec.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-[#215b63]/8 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] text-[#215b63]/65">Нэгж үнэ</p>
                    <p className="text-lg font-bold text-[#215b63] tabular-nums">
                      {formatMntPrice(product.priceMnt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectProduct(product)}
                      className="px-3.5 py-2 rounded-lg border border-[#215b63]/20 text-xs font-semibold text-[#215b63] hover:bg-[#F8FAF9] whitespace-nowrap transition-colors"
                    >
                      Дэлгэрэнгүй
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAdd(product.id)}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        added
                          ? 'bg-[#67c090] text-[#133a40]'
                          : 'bg-[#215b63] text-white hover:bg-[#194950] hover:shadow-[0_0_16px_rgba(103,192,144,0.4)]'
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="w-3.5 h-3.5" aria-hidden="true" />
                          <span>Нэмэгдлээ</span>
                        </>
                      ) : (
                        <span>Сагсанд нэмэх</span>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
