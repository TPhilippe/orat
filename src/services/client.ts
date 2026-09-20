const API_BASE = import.meta.env.PUBLIC_API_URL as string | undefined;

export type Paginated<T> = {
	count: number;
	next: string | null;
	previous: string | null;
	results: T[];
};

export class ApiError extends Error {
	status: number;
	path: string;
	body: unknown;

	constructor(status: number, path: string, body: unknown) {
		super(`API ${status} — ${path}`);
		this.name = 'ApiError';
		this.status = status;
		this.path = path;
		this.body = body;
	}
}

export function isApiEnabled(): boolean {
	return Boolean(API_BASE);
}

function resolveUrl(path: string): string {
	if (!API_BASE) {
		throw new Error('PUBLIC_API_URL n’est pas défini.');
	}

	if (/^https?:\/\//.test(path)) {
		return path;
	}

	const base = API_BASE.replace(/\/$/, '');
	return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

async function parseBody(response: Response): Promise<unknown> {
	const text = await response.text();
	if (!text) return null;
	try {
		return JSON.parse(text);
	} catch {
		return text;
	}
}

export async function apiGet<T>(path: string): Promise<T> {
	const url = resolveUrl(path);
	const response = await fetch(url, {
		headers: { Accept: 'application/json' },
	});

	if (!response.ok) {
		throw new ApiError(response.status, path, await parseBody(response));
	}

	return (await parseBody(response)) as T;
}

export async function apiGetAll<T>(path: string): Promise<T[]> {
	const items: T[] = [];
	const separator = path.includes('?') ? '&' : '?';
	let next: string | null = `${path}${separator}page_size=100`;

	while (next) {
		const page = await apiGet<Paginated<T> | T[]>(next);
		if (Array.isArray(page)) {
			return page;
		}

		items.push(...page.results);
		next = page.next;
	}

	return items;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
	const url = resolveUrl(path);
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	const parsed = await parseBody(response);
	if (!response.ok) {
		throw new ApiError(response.status, path, parsed);
	}

	return parsed as T;
}

export function formatApiErrors(body: unknown): string {
	if (!body || typeof body !== 'object') {
		return 'La commande n’a pas pu être transmise.';
	}

	const record = body as Record<string, unknown>;
	const parts: string[] = [];

	for (const [key, value] of Object.entries(record)) {
		const label = key === 'non_field_errors' || key === 'detail' ? '' : `${key} : `;
		if (typeof value === 'string') {
			parts.push(`${label}${value}`);
		} else if (Array.isArray(value)) {
			parts.push(`${label}${value.map(String).join(' ')}`);
		}
	}

	return parts.join(' ') || 'La commande n’a pas pu être transmise.';
}
