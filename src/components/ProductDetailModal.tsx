import React, { useEffect } from 'react';
import { CheckCircle2, ShoppingBag, X } from 'lucide-react';
import { PRODUCT_CATEGORY_LABELS } from '../data/classifications';
import { ProductItem } from '../types/botany';
import { formatMntPrice } from '../utils/cart';

interface ProductDetailModalProps {
  product: ProductItem | null;
  onAddToCart: (productId: string) => void;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onAddToCart,
  onClose,
}) => {
  useEffect(() => {
    if (!product) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#133a40]/45 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-[#215b63]/15 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Бүтээгдэхүүний цонх хаах"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/95 border border-[#215b63]/15 flex items-center justify-center text-[#215b63] hover:bg-[#F8FAF9]"
        >
          <X className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5 bg-[#F1F5F3]">
            <img
              src={product.imageUrl}
              alt={product.nameMn}
              referrerPolicy="no-referrer"
              className="w-full h-64 md:h-full object-cover"
            />
          </div>

          <div className="md:col-span-7 p-6 sm:p-8 space-y-5">
            <div className="pr-10">
              <p className="text-xs text-[#215b63]/70">
                {PRODUCT_CATEGORY_LABELS[product.category]} ·{' '}
                {product.stockLabelMn}
              </p>
              <h2
                id="product-modal-title"
                className="text-2xl font-bold text-[#215b63] mt-1"
              >
                {product.nameMn}
              </h2>
              <p className="text-sm text-[#215b63]/75 mt-1">
                {product.subtitleMn}
              </p>
            </div>

            <p className="text-sm text-[#142B2E]/80 leading-relaxed">
              {product.shortDescriptionMn}
            </p>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-[#215b63]">
                Техникийн үзүүлэлт
              </h3>
              <dl className="grid grid-cols-2 gap-2">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="rounded-xl bg-[#F8FAF9] border border-[#215b63]/10 p-2.5"
                  >
                    <dt className="text-[11px] text-[#215b63]/65">
                      {spec.label}
                    </dt>
                    <dd className="text-xs font-semibold text-[#142B2E]">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-[#215b63]">
                Гол давуу талууд
              </h3>
              <ul className="space-y-1.5">
                {product.benefitsMn.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-2 text-xs text-[#142B2E]/80"
                  >
                    <CheckCircle2
                      className="w-4 h-4 text-[#67c090] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#215b63]/10 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#215b63]/65">Үнэ</p>
                <p className="text-2xl font-bold text-[#215b63] tabular-nums">
                  {formatMntPrice(product.priceMnt)}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product.id);
                  onClose();
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#215b63] text-white text-sm font-semibold hover:bg-[#194950] hover:shadow-[0_0_18px_rgba(103,192,144,0.45)] transition-all"
              >
                <ShoppingBag className="w-4 h-4 text-[#67c090]" aria-hidden="true" />
                <span>Сагсанд нэмэх</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
