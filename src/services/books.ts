import { books as mockBooks } from '../data/books';
import type { Book, Collection } from '../types';
import { apiGet, isApiEnabled } from './client';

export function formatPrice(amount: number, currency: Book['currency']): string {
	return new Intl.NumberFormat('fr-CH', {
		style: 'currency',
		currency,
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
}

export function formatAuthors(book: Book): string {
	return book.authors.map((author) => author.name).join(', ');
}

export function excerpt(text: string, sentences = 2): string {
	const parts = text.match(/[^.!?]+[.!?]+/g);
	if (!parts) return text;
	return parts.slice(0, sentences).join(' ').trim();
}

export async function getBooks(): Promise<Book[]> {
	if (isApiEnabled()) {
		return apiGet<Book[]>('/books/');
	}

	return mockBooks;
}

export async function getPublishedBooks(): Promise<Book[]> {
	const books = await getBooks();
	return books.filter((book) => book.status === 'published');
}

export async function getFeaturedBooks(): Promise<Book[]> {
	const books = await getBooks();
	return books.filter((book) => book.featured);
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
	if (isApiEnabled()) {
		try {
			return await apiGet<Book>(`/books/${slug}/`);
		} catch {
			return undefined;
		}
	}

	return mockBooks.find((book) => book.slug === slug);
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
