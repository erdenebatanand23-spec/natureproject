import React, { useEffect, useState } from 'react';
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { CartItem, ProductItem } from '../types/botany';
import { formatMntPrice, getCartSubtotal } from '../utils/cart';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  products: ProductItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onClearCart: () => void;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  open,
  items,
  products,
  onUpdateQuantity,
  onClearCart,
  onClose,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const productMap = new Map(products.map((p) => [p.id, p]));
  const subtotal = getCartSubtotal(items, products);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      setErrorMsg('Нэр, утасны дугаар болон хүргэлтийн хаягаа бүрэн оруулна уу.');
      return;
    }
    if (!/^[0-9+\-\s]{7,15}$/.test(customerPhone.trim())) {
      setErrorMsg('Утасны дугаараа зөв форматтай оруулна уу (ж.нь: 99112233).');
      return;
    }
    setErrorMsg('');
    setOrderSubmitted(true);
    onClearCart();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
      className="fixed inset-0 z-50 flex justify-end bg-[#133a40]/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md h-full bg-white border-l border-[#215b63]/15 shadow-2xl flex flex-col justify-between overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-[#215b63]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-[#215b63]" aria-hidden="true" />
            <h2
              id="cart-drawer-title"
              className="text-lg font-bold text-[#215b63]"
            >
              Миний сагс
            </h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setOrderSubmitted(false);
              onClose();
            }}
            aria-label="Сагс хаах"
            className="w-9 h-9 rounded-full border border-[#215b63]/15 flex items-center justify-center text-[#215b63] hover:bg-[#F8FAF9]"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
          {orderSubmitted ? (
            <div className="rounded-2xl bg-[#F8FAF9] border border-[#67c090] p-6 text-center space-y-3">
              <CheckCircle2
                className="w-10 h-10 text-[#67c090] mx-auto"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-[#215b63]">
                Захиалга амжилттай бүртгэгдлээ
              </h3>
              <p className="text-sm text-[#142B2E]/75">
                {customerName} таны захиалгыг хүлээн авлаа. Эко-зөвлөх маань{' '}
                <span className="font-tech-mono font-medium">{customerPhone}</span>{' '}
                дугаараар холбогдон хүргэлтийг баталгаажуулна.
              </p>
              <button
                type="button"
                onClick={() => {
                  setOrderSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#215b63] text-white text-xs font-semibold"
              >
                Болсон
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ShoppingBag
                className="w-10 h-10 text-[#215b63]/30 mx-auto"
                aria-hidden="true"
              />
              <p className="text-sm font-medium text-[#215b63]">
                Таны сагс хоосон байна
              </p>
              <p className="text-xs text-[#142B2E]/65">
                Бүтээгдэхүүн хэсгээс ухаалаг мэдрэгч болон арчилгааны хэрэгсэл
                сонгоно уу.
              </p>
            </div>
          ) : (
            <>
              <ul className="space-y-4">
                {items.map((item) => {
                  const product = productMap.get(item.productId);
                  if (!product) return null;
                  return (
                    <li
                      key={item.productId}
                      className="flex gap-3.5 pb-4 border-b border-[#215b63]/10"
                    >
                      <img
                        src={product.imageUrl}
                        alt={product.nameMn}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover bg-[#F1F5F3] shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[#142B2E] truncate">
                          {product.nameMn}
                        </h3>
                        <p className="text-xs font-medium text-[#215b63] tabular-nums mt-0.5">
                          {formatMntPrice(product.priceMnt)}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.productId, item.quantity - 1)
                            }
                            aria-label={`${product.nameMn} тоо хасах`}
                            className="w-7 h-7 rounded-lg border border-[#215b63]/20 flex items-center justify-center text-[#215b63] hover:bg-[#F8FAF9]"
                          >
                            <Minus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <span className="w-6 text-center text-xs font-tech-mono font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.productId, item.quantity + 1)
                            }
                            aria-label={`${product.nameMn} тоо нэмэх`}
                            className="w-7 h-7 rounded-lg border border-[#215b63]/20 flex items-center justify-center text-[#215b63] hover:bg-[#F8FAF9]"
                          >
                            <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.productId, 0)}
                            aria-label={`${product.nameMn} устгах`}
                            className="ml-auto text-[#215b63]/55 hover:text-red-600 p-1"
                          >
                            <Trash2 className="w-4 h-4" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {/* Validated Order Form */}
              <form
                id="cart-checkout-form"
                onSubmit={handleCheckoutSubmit}
                className="space-y-3 pt-2"
              >
                <p className="text-xs font-semibold text-[#215b63]">
                  Захиалга ба хүргэлтийн мэдээлэл
                </p>
                <div>
                  <label
                    htmlFor="checkout-name"
                    className="block text-xs text-[#215b63]/75 mb-1"
                  >
                    Хүлээн авагчийн нэр
                  </label>
                  <input
                    id="checkout-name"
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Таны нэр"
                    className="w-full px-3 py-2 rounded-xl bg-[#F8FAF9] border border-[#215b63]/15 text-sm focus:outline-none focus:border-[#67c090]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="checkout-phone"
                    className="block text-xs text-[#215b63]/75 mb-1"
                  >
                    Холбогдох утас
                  </label>
                  <input
                    id="checkout-phone"
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="99112233"
                    className="w-full px-3 py-2 rounded-xl bg-[#F8FAF9] border border-[#215b63]/15 text-sm font-tech-mono focus:outline-none focus:border-[#67c090]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="checkout-address"
                    className="block text-xs text-[#215b63]/75 mb-1"
                  >
                    Хүргэлтийн хаяг
                  </label>
                  <input
                    id="checkout-address"
                    type="text"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="Дүүрэг, хороо, байр/тоот"
                    className="w-full px-3 py-2 rounded-xl bg-[#F8FAF9] border border-[#215b63]/15 text-sm focus:outline-none focus:border-[#67c090]"
                  />
                </div>
                {errorMsg && (
                  <p role="alert" className="text-xs text-red-600 font-medium">
                    {errorMsg}
                  </p>
                )}
              </form>
            </>
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && !orderSubmitted && (
          <div className="p-6 border-t border-[#215b63]/10 bg-[#F8FAF9] space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-[#215b63]/80">Нийт дүн</span>
              <span className="text-xl font-bold text-[#215b63] tabular-nums">
                {formatMntPrice(subtotal)}
              </span>
            </div>
            <button
              type="submit"
              form="cart-checkout-form"
              className="w-full py-3 rounded-xl bg-[#215b63] text-white text-sm font-semibold hover:bg-[#194950] hover:shadow-[0_0_18px_rgba(103,192,144,0.45)] transition-all"
            >
              Захиалга илгээх
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
