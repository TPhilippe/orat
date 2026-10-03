import type { OrderCustomer } from '../services/orders';

const KEY = 'orat-checkout';

export type CheckoutReached = {
	address: boolean;
	checkout: boolean;
};

export type CheckoutDraft = {
	reached: CheckoutReached;
	sameAddress: boolean;
	billing: Partial<OrderCustomer>;
	shipping: Partial<OrderCustomer>;
	delivery: 'ship' | 'pickup';
	payment: 'transfer' | 'cash';
	notes: string;
};

const empty: CheckoutDraft = {
	reached: { address: false, checkout: false },
	sameAddress: true,
	billing: { country: 'Suisse' },
	shipping: { country: 'Suisse' },
	delivery: 'ship',
	payment: 'transfer',
	notes: '',
};

function isRecord(value: unknown): value is Record<string, unknown> {
	return Boolean(value) && typeof value === 'object';
}

export function readCheckout(): CheckoutDraft {
	if (typeof window === 'undefined') return structuredClone(empty);

	try {
		const raw = window.localStorage.getItem(KEY);
		if (!raw) return structuredClone(empty);
		const parsed: unknown = JSON.parse(raw);
		if (!isRecord(parsed)) return structuredClone(empty);

		const reached = isRecord(parsed.reached) ? parsed.reached : {};
		const billing = isRecord(parsed.billing) ? parsed.billing : {};
		const shipping = isRecord(parsed.shipping) ? parsed.shipping : {};

		return {
			reached: {
				address: Boolean(reached.address),
				checkout: Boolean(reached.checkout),
			},
			sameAddress: parsed.sameAddress !== false,
			billing: { ...empty.billing, ...billing },
			shipping: { ...empty.shipping, ...shipping },
			delivery: parsed.delivery === 'pickup' ? 'pickup' : 'ship',
			payment: parsed.payment === 'cash' ? 'cash' : 'transfer',
			notes: typeof parsed.notes === 'string' ? parsed.notes : '',
		};
	} catch {
		return structuredClone(empty);
	}
}

export function writeCheckout(patch: Partial<CheckoutDraft>): CheckoutDraft {
	const current = readCheckout();
	const next: CheckoutDraft = {
		...current,
		...patch,
		reached: { ...current.reached, ...patch.reached },
		billing: { ...current.billing, ...patch.billing },
		shipping: { ...current.shipping, ...patch.shipping },
	};
	window.localStorage.setItem(KEY, JSON.stringify(next));
	return next;
}

export function clearCheckout(): void {
	if (typeof window === 'undefined') return;
	window.localStorage.removeItem(KEY);
}

export function resetReached(): void {
	writeCheckout({ reached: { address: false, checkout: false } });
}

export function unlockAddress(): void {
	writeCheckout({ reached: { address: true } });
}

export function unlockCheckout(): void {
	writeCheckout({ reached: { checkout: true } });
}
