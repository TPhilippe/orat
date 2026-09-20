import type { Book, OrderConfirmation } from '../types';
import { ApiError, apiPost, formatApiErrors, isApiEnabled } from './client';

export type OrderBook = Pick<Book, 'slug' | 'title' | 'status' | 'inStock' | 'productId' | 'price' | 'currency'>;

export type OrderCustomer = {
	email: string;
	first_name: string;
	last_name: string;
	company?: string;
	phone?: string;
	street: string;
	number?: string;
	zipcode: string;
	city: string;
	country: string;
};

export type OrderLine = {
	book: OrderBook;
	quantity: number;
};

export type PlaceOrderInput = {
	customer: OrderCustomer;
	items: OrderLine[];
	notes: string;
	houseEmail: string;
};

export type PlaceOrderResult = {
	source: 'api' | 'mailto';
	id: string;
	status?: string;
	date?: string;
};

export function localOrderId(): string {
	return `ORAT-${Date.now().toString(36).toUpperCase()}`;
}

export function orderLinesSummary(items: OrderLine[]): string {
	return items
		.map((item) => {
			const mode = item.book.status === 'published' && item.book.inStock ? 'achat' : 'précommande';
			return `${item.quantity} × ${item.book.title} (${mode})`;
		})
		.join('\n');
}

function toCaveItems(items: OrderLine[]) {
	return items
		.filter((item) => item.book.productId != null)
		.map((item) => ({
			item_type: 'product' as const,
			item_id: item.book.productId as number,
			quantity: String(item.quantity),
		}));
}

function mailtoHref(input: PlaceOrderInput, reference: string): string {
	const { customer, items, notes, houseEmail } = input;
	const subject = encodeURIComponent(`Commande ${reference} — ${items.map((item) => item.book.title).join(', ')}`);
	const address = [customer.street, customer.number, `${customer.zipcode} ${customer.city}`, customer.country]
		.filter((part) => part.trim())
		.join(', ');
	const body = encodeURIComponent(
		[
			`Référence : ${reference}`,
			'',
			orderLinesSummary(items),
			'',
			`${customer.first_name} ${customer.last_name}`.trim(),
			customer.company,
			customer.email,
			customer.phone,
			address,
			'',
			notes,
		]
			.filter((line) => line != null && String(line).trim())
			.join('\n'),
	);

	return `mailto:${houseEmail}?subject=${subject}&body=${body}`;
}

export async function placeOrder(input: PlaceOrderInput): Promise<PlaceOrderResult> {
	if (!input.items.length) {
		throw new Error('La commande est vide.');
	}

	const caveItems = toCaveItems(input.items);
	const notes = [input.notes, orderLinesSummary(input.items)].filter(Boolean).join('\n\n');

	if (isApiEnabled() && caveItems.length > 0) {
		try {
			const confirmation = await apiPost<OrderConfirmation>('/orders/', {
				...input.customer,
				notes,
				items: caveItems,
			});
			return {
				source: 'api',
				id: String(confirmation.id),
				status: confirmation.status,
				date: confirmation.date,
			};
		} catch (error) {
			if (error instanceof ApiError) {
				throw new Error(formatApiErrors(error.body));
			}
			throw error;
		}
	}

	const id = localOrderId();
	window.location.href = mailtoHref(input, id);
	return { source: 'mailto', id };
}
