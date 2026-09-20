import type { Book, CatalogProduct } from '../types';
import { apiGetAll, isApiEnabled } from './client';

export async function getCatalogProducts(): Promise<CatalogProduct[]> {
	if (!isApiEnabled()) return [];

	try {
		return await apiGetAll<CatalogProduct>('/catalog/products/');
	} catch {
		return [];
	}
}

function normalizeIsbn(value: string): string {
	return value.replace(/[-\s]/g, '');
}

export function matchCatalogProduct(book: Book, products: CatalogProduct[]): CatalogProduct | undefined {
	if (book.productId != null) {
		const byId = products.find((product) => product.id === book.productId);
		if (byId) return byId;
	}

	if (book.isbn) {
		const isbn = normalizeIsbn(book.isbn);
		return products.find((product) =>
			product.attributes.some((entry) => normalizeIsbn(entry.value) === isbn),
		);
	}

	return undefined;
}

export function enrichBook(book: Book, products: CatalogProduct[]): Book {
	const product = matchCatalogProduct(book, products);
	if (!product) {
		return {
			...book,
			inStock: book.inStock ?? book.status === 'published',
		};
	}

	return {
		...book,
		productId: product.id,
		price: product.price ?? book.price,
		inStock: product.in_stock,
	};
}
