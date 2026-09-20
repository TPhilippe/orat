export type CartItem = {
	slug: string;
	quantity: number;
};

const STORAGE_KEY = 'orat-panier';

function isCartItem(value: unknown): value is CartItem {
	if (!value || typeof value !== 'object') return false;
	const item = value as CartItem;
	return typeof item.slug === 'string' && Number.isInteger(item.quantity) && item.quantity > 0;
}

export function readCart(): CartItem[] {
	if (typeof window === 'undefined') return [];

	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(isCartItem);
	} catch {
		return [];
	}
}

export function writeCart(items: CartItem[]): void {
	if (typeof window === 'undefined') return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
	window.dispatchEvent(new CustomEvent('orat-cart'));
}

export function addToCart(slug: string, quantity = 1): CartItem[] {
	const items = readCart();
	const existing = items.find((item) => item.slug === slug);
	if (existing) {
		existing.quantity += quantity;
	} else {
		items.push({ slug, quantity });
	}
	writeCart(items);
	return items;
}

export function setQuantity(slug: string, quantity: number): CartItem[] {
	const next =
		quantity < 1
			? readCart().filter((item) => item.slug !== slug)
			: readCart().map((item) => (item.slug === slug ? { ...item, quantity } : item));
	writeCart(next);
	return next;
}

export function removeFromCart(slug: string): CartItem[] {
	const next = readCart().filter((item) => item.slug !== slug);
	writeCart(next);
	return next;
}

export function clearCart(): void {
	writeCart([]);
}

export function cartCount(items = readCart()): number {
	return items.reduce((sum, item) => sum + item.quantity, 0);
}
