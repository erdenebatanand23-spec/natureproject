import { CartItem, ProductItem } from '../types/botany';

export function addToCart(items: CartItem[], productId: string): CartItem[] {
  const existing = items.find((item) => item.productId === productId);
  if (existing) {
    return items.map((item) =>
      item.productId === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }
  return [...items, { productId, quantity: 1 }];
}

export function updateCartQuantity(
  items: CartItem[],
  productId: string,
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return items.filter((item) => item.productId !== productId);
  }
  return items.map((item) =>
    item.productId === productId ? { ...item, quantity } : item
  );
}

export function getCartTotalCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function getCartSubtotal(
  items: CartItem[],
  products: ProductItem[]
): number {
  const priceMap = new Map(products.map((p) => [p.id, p.priceMnt]));
  return items.reduce((sum, item) => {
    const unitPrice = priceMap.get(item.productId) ?? 0;
    return sum + unitPrice * item.quantity;
  }, 0);
}

export function formatMntPrice(amount: number): string {
  return `${new Intl.NumberFormat('en-US').format(amount)} ₮`;
}
