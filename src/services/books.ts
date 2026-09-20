import { books as mockBooks } from '../data/books';
import type { Book, Collection } from '../types';
import { enrichBook, getCatalogProducts } from './catalog';

export function formatPrice(amount: number, currency: Book['currency']): string {
	return new Intl.NumberFormat('fr-CH', {
		style: 'currency',
		currency,
		minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
		maximumFractionDigits: 2,
	}).format(amount);
}

export function priceLabel(book: Book): string {
	return book.price != null ? formatPrice(book.price, book.currency) : 'Prix communiqué';
}

export function formatAuthors(book: Book): string {
	return book.authors.map((author) => author.name).join(', ');
}

export function excerpt(text: string, sentences = 2): string {
	const parts = text.match(/[^.!?]+[.!?]+/g);
	if (!parts) return text;
	return parts.slice(0, sentences).join(' ').trim();
}

export function isPurchase(book: Book): boolean {
	return book.status === 'published' && Boolean(book.inStock);
}

export function shopLabel(book: Book): string {
	return isPurchase(book) ? 'Acheter' : 'Précommander';
}

export function shopHref(book: Book): string {
	return `/boutique/commande?livre=${book.slug}`;
}

export function availabilityLabel(book: Book): string {
	return isPurchase(book) ? 'En stock' : 'Précommande';
}

export async function getBooks(): Promise<Book[]> {
	const products = await getCatalogProducts();
	return mockBooks.map((book) => enrichBook(book, products));
}

export async function getPublishedBooks(): Promise<Book[]> {
	const books = await getBooks();
	return books.filter((book) => book.status === 'published');
}

export async function getFeaturedBooks(): Promise<Book[]> {
	const books = await getBooks();
	return books.filter((book) => book.featured);
}

export async function getForthcomingBooks(): Promise<Book[]> {
	const books = await getBooks();
	return books.filter((book) => book.status === 'forthcoming');
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
	const books = await getBooks();
	return books.find((book) => book.slug === slug);
}

export async function getRelatedBooks(book: Book, limit = 3): Promise<Book[]> {
	const books = await getBooks();
	return books
		.filter((item) => item.id !== book.id && item.collection.slug === book.collection.slug)
		.slice(0, limit);
}

export async function getCollectionsFromBooks(): Promise<Collection[]> {
	const books = await getBooks();
	const seen = new Map<string, Collection>();

	for (const book of books) {
		seen.set(book.collection.slug, book.collection);
	}

	return [...seen.values()];
}
